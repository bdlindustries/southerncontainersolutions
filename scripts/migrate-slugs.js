/**
 * Firestore slug migration for scs_inventory shop listings.
 *
 * Usage (from scs-next/):
 *   node scripts/migrate-slugs.js
 *   node scripts/migrate-slugs.js --dry-run
 *   npm run migrate:slugs
 *   npm run migrate:slugs:dry-run
 *
 * Requires Firestore write access (admin SDK service account or permissive rules).
 * Optional: set FIREBASE_SERVICE_ACCOUNT_PATH to a service account JSON file to use Admin SDK.
 */

const { readFileSync, existsSync } = require("node:fs");
const { resolve } = require("node:path");

const ROOT = resolve(__dirname, "..");
const BASE_URL = "https://www.southerncontainersolutions.com";
const COLLECTION = "scs_inventory";
const DRY_RUN = process.argv.includes("--dry-run");

const firebaseConfig = {
  apiKey: "AIzaSyDBMS_N1VZQfB99YUFSGcLBR-dm7cH5YqE",
  authDomain: "southern-container-solutions.firebaseapp.com",
  projectId: "southern-container-solutions",
  storageBucket: "southern-container-solutions.firebasestorage.app",
  messagingSenderId: "900734181417",
  appId: "1:900734181417:web:dfe31064c86ed33c81bc38",
};

function isInventoryListingDoc(id) {
  return typeof id === "string" && !id.startsWith("_");
}

function slugifyTitle(title) {
  if (!title || typeof title !== "string") return "";

  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[''`´]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueSlug(baseSlug, usedSlugs) {
  if (!usedSlugs.has(baseSlug)) return baseSlug;

  let counter = 2;
  let candidate = `${baseSlug}-${counter}`;
  while (usedSlugs.has(candidate)) {
    counter += 1;
    candidate = `${baseSlug}-${counter}`;
  }
  return candidate;
}

function productUrl(segment) {
  return `${BASE_URL}/shop/${segment}`;
}

async function initFirestore() {
  const serviceAccountPath =
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
    resolve(ROOT, "firebase-service-account.json");

  if (existsSync(serviceAccountPath)) {
    const { initializeApp, cert, getApps } = require("firebase-admin/app");
    const { getFirestore } = require("firebase-admin/firestore");

    if (!getApps().length) {
      const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));
      initializeApp({
        credential: cert(serviceAccount),
        projectId: firebaseConfig.projectId,
      });
    }

    console.log(`Using Firebase Admin SDK (${serviceAccountPath})\n`);
    return getFirestore();
  }

  const { initializeApp, getApps } = require("firebase/app");
  const { getFirestore, collection, getDocs, doc, updateDoc } = require("firebase/firestore");

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  const db = getFirestore(app);

  console.log("Using Firebase client SDK (public config)\n");
  console.warn(
    "Warning: writes may fail if Firestore rules require auth. Set FIREBASE_SERVICE_ACCOUNT_PATH or place firebase-service-account.json in scs-next/.\n"
  );

  return {
    async getListingDocs() {
      const snapshot = await getDocs(collection(db, COLLECTION));
      return snapshot.docs.filter((d) => isInventoryListingDoc(d.id));
    },
    async updateSlug(docId, slug) {
      await updateDoc(doc(db, COLLECTION, docId), { slug });
    },
  };
}

async function runWithAdmin(db) {
  const snapshot = await db.collection(COLLECTION).get();
  return snapshot.docs.filter((d) => isInventoryListingDoc(d.id));
}

async function main() {
  console.log(`Slug migration ${DRY_RUN ? "(DRY RUN)" : ""}\n`);

  const db = await initFirestore();
  const usedSlugs = new Set();
  let updated = 0;
  let skipped = 0;

  let docs;
  let updateSlug;

  if (typeof db.collection === "function") {
    docs = await runWithAdmin(db);
    updateSlug = async (docId, slug) => {
      await db.collection(COLLECTION).doc(docId).update({ slug });
    };
  } else {
    docs = await db.getListingDocs();
    updateSlug = db.updateSlug;
  }

  if (!docs.length) {
    console.log("No shop listings found.");
    return;
  }

  for (const docSnap of docs) {
    const docId = docSnap.id;
    const data = docSnap.data();
    const title = data.title?.trim();

    if (!title) {
      console.log(`[SKIP] ${docId} — missing title`);
      skipped += 1;
      continue;
    }

    const baseSlug = slugifyTitle(title);
    if (!baseSlug) {
      console.log(`[SKIP] ${docId} — could not slugify title: "${title}"`);
      skipped += 1;
      continue;
    }

    const slug = uniqueSlug(baseSlug, usedSlugs);
    usedSlugs.add(slug);

    const beforePath = data.slug?.trim() || docId;
    const beforeUrl = productUrl(beforePath);
    const afterUrl = productUrl(slug);

    console.log("─".repeat(72));
    console.log(`Document:  ${docId}`);
    console.log(`Title:     ${title}`);
    console.log(`Before:    ${beforeUrl}`);
    console.log(`After:     ${afterUrl}`);
    console.log(`Slug:      ${slug}${slug !== baseSlug ? ` (deduped from ${baseSlug})` : ""}`);

    if (data.slug === slug) {
      console.log("Status:    unchanged (slug already matches title)\n");
      skipped += 1;
      continue;
    }

    if (DRY_RUN) {
      console.log("Status:    dry run — no write\n");
      updated += 1;
      continue;
    }

    await updateSlug(docId, slug);
    console.log("Status:    updated\n");
    updated += 1;
  }

  console.log("═".repeat(72));
  console.log(`Done. ${updated} ${DRY_RUN ? "would be updated" : "updated"}, ${skipped} skipped.`);
}

main().catch((err) => {
  console.error("\nMigration failed:", err.message || err);
  process.exit(1);
});

module.exports = { slugifyTitle };
