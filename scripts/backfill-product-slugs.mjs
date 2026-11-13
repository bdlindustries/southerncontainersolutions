/**
 * One-time: write slug fields for legacy Firestore listing doc IDs.
 * Requires authenticated admin (Firebase rules) or run from a trusted environment.
 */
import { doc, setDoc } from "firebase/firestore";
import { db } from "../src/lib/firebase.js";
import { LEGACY_SHOP_SLUG_BY_DOC_ID } from "../src/lib/productSlugFixes.ts";

async function main() {
  if (!db) {
    console.error("Firestore not initialized");
    process.exit(1);
  }
  for (const [id, slug] of Object.entries(LEGACY_SHOP_SLUG_BY_DOC_ID)) {
    await setDoc(doc(db, "scs_inventory", id), { id, slug, updatedAt: Date.now() }, { merge: true });
    console.log(`Set slug ${slug} on ${id}`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
