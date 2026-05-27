import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
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

export async function getLiveInventory() {
  try {
    const snapshot = await getDocs(collection(db, 'scs_inventory'));
    const items = snapshot.docs.map((d) =>
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

export async function getProductById(id) {
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
