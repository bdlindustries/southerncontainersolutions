import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  SEED_INVENTORY,
  enrichInventoryFromSeed,
  normalizeInventoryItemFromFirestore,
} from "@/lib/data";

const firebaseConfig = {
  apiKey: "AIzaSyDBMS_N1VZQfB99YUFSGcLBR-dm7cH5YqE",
  authDomain: "southern-container-solutions.firebaseapp.com",
  projectId: "southern-container-solutions",
  storageBucket: "southern-container-solutions.firebasestorage.app",
  messagingSenderId: "900734181417",
  appId: "1:900734181417:web:dfe31064c86ed33c81bc38"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

let auth = null;
let storage = null;
try {
  if (app) {
    auth = getAuth(app);
    storage = getStorage(app);
  }
} catch (e) {
  console.error("Firebase auth/storage init failed", e);
}

export { auth, storage };

/** Reserved Firestore doc IDs in scs_inventory (not shop listings). */
export const DELIVERY_PAGE_SETTINGS_ID = '_page_delivery';

export function isInventoryListingDoc(id) {
  return typeof id === 'string' && !id.startsWith('_');
}

export async function getDeliveryPageSettings() {
  try {
    const inventoryDocRef = doc(db, 'scs_inventory', DELIVERY_PAGE_SETTINGS_ID);
    const inventorySnap = await getDoc(inventoryDocRef);
    if (inventorySnap.exists()) {
      return inventorySnap.data();
    }

    // Legacy location before rules fix
    const legacyRef = doc(db, 'scs_settings', 'delivery');
    const legacySnap = await getDoc(legacyRef);
    if (legacySnap.exists()) {
      return legacySnap.data();
    }

    return { youtubeUrl: '', youtubeVideoId: '' };
  } catch (e) {
    console.error("Delivery settings fetch failed", e);
    return { youtubeUrl: '', youtubeVideoId: '' };
  }
}

export async function getLiveInventory() {
  try {
    const snapshot = await getDocs(collection(db, 'scs_inventory'));
    const items = snapshot.docs
      .filter((d) => isInventoryListingDoc(d.id))
      .map((d) =>
        enrichInventoryFromSeed(normalizeInventoryItemFromFirestore(d.id, d.data()))
      );
    if (items.length) {
      return items.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    }
    return [...SEED_INVENTORY].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  } catch (e) {
    console.error("Firebase fetch failed", e);
    return [...SEED_INVENTORY].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  }
}

export async function getFeaturedInventory(limit = 2) {
  const inventory = await getLiveInventory();
  const featured = inventory.filter((p) => p.featured);
  const source = featured.length > 0 ? featured : inventory;
  return source.slice(0, limit);
}

export async function getProductById(id) {
  if (!isInventoryListingDoc(id)) return null;
  try {
    const docRef = doc(db, 'scs_inventory', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return enrichInventoryFromSeed(
        normalizeInventoryItemFromFirestore(docSnap.id, docSnap.data())
      );
    }
    const seed = SEED_INVENTORY.find((p) => p.id === id);
    return seed ? enrichInventoryFromSeed(seed) : null;
  } catch (e) {
    console.error("Firebase fetch failed", e);
    const seed = SEED_INVENTORY.find((p) => p.id === id);
    return seed ? enrichInventoryFromSeed(seed) : null;
  }
}

export async function getProductBySlug(slug) {
  if (!slug || typeof slug !== 'string') return null;

  try {
    const slugQuery = query(collection(db, 'scs_inventory'), where('slug', '==', slug));
    const snapshot = await getDocs(slugQuery);
    const match = snapshot.docs.find((d) => isInventoryListingDoc(d.id));
    if (match) {
      return enrichInventoryFromSeed(
        normalizeInventoryItemFromFirestore(match.id, match.data())
      );
    }
  } catch (e) {
    console.error("Firebase slug lookup failed", e);
  }

  const seedBySlug = SEED_INVENTORY.find((p) => p.slug === slug || p.id === slug);
  if (seedBySlug) return enrichInventoryFromSeed(seedBySlug);

  return getProductById(slug);
}
