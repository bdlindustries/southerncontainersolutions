import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, ArrowRight, ShieldCheck, Truck, MapPin,
  Phone, Mail, ChevronRight, PackageOpen, CheckCircle2,
  ShoppingCart, Star, Zap, BookOpen, AlertTriangle,
  Wrench, FileText, HardHat, ArrowLeft,
  Plus, Edit2, Trash2, LogOut, Upload, Lock, Save, Image as ImageIcon, RefreshCw,
  Video, Play, GripVertical,
} from "lucide-react";
import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, addDoc, serverTimestamp,
  getDocs, doc, setDoc, deleteDoc,
} from "firebase/firestore";
import {
  getAuth, signInAnonymously, onAuthStateChanged,
  signInWithEmailAndPassword, signOut,
} from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

/** Public files in `/public` (works with Vite base for GitHub Pages, etc.) */
function publicUrl(filename) {
  const base = import.meta.env.BASE_URL ?? "/";
  const name = filename.replace(/^\//, "");
  return `${base.endsWith("/") ? base : `${base}/`}${name}`;
}

function resolveFirebaseConfig() {
  if (typeof globalThis.__firebase_config === "string") {
    try {
      return JSON.parse(globalThis.__firebase_config);
    } catch {
      return null;
    }
  }
  const {
    VITE_FIREBASE_API_KEY: apiKey,
    VITE_FIREBASE_AUTH_DOMAIN: authDomain,
    VITE_FIREBASE_PROJECT_ID: projectId,
    VITE_FIREBASE_STORAGE_BUCKET: storageBucket,
    VITE_FIREBASE_MESSAGING_SENDER_ID: messagingSenderId,
    VITE_FIREBASE_APP_ID: appId,
  } = import.meta.env;
  if (apiKey && authDomain && projectId && storageBucket && messagingSenderId && appId) {
    return {
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
    };
  }
  return null;
}

const firebaseConfig = resolveFirebaseConfig();
const app = firebaseConfig ? initializeApp(firebaseConfig) : null;
const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;
const storage = app ? getStorage(app) : null;
const appId = globalThis.__app_id ?? "southern-container-solutions";

if (!app && import.meta.env.DEV) {
  console.warn(
    "[Southern Container Solutions] Firebase is not configured. Copy .env.example to .env and add your new project keys from the Firebase console (Project settings > Your apps > Web)."
  );
}

// ==========================================
// SEED INVENTORY  (used to pre-fill Firestore on first run)
// ==========================================
const SEED_INVENTORY = [
  {
    id: "scs-20-office",
    title: "20' Office Container",
    price: 19900,
    priceStr: "$19,900",
    stripeLink: "https://buy.stripe.com/test_placeholder",
    description:
      "Compact, climate-controlled one-trip office container — ideal for jobsites, remote offices, and temporary workspaces when space and budget matter.",
    listingDescription:
      "Our 20-foot office container is a compact, climate-controlled workspace built from a one-trip shipping container. Designed for durability, efficiency, and comfort, it's ideal for jobsites, remote offices, or temporary workspace needs where space and budget matter.\n\nBest for jobsite offices, small business offices, temporary workspaces, and remote locations where space is limited.",
    features: [
      "2\" Closed-Cell Spray Foam Insulation",
      "12,000 BTU LG Mini-Split (AC & Heat)",
      "Moisture-Resistant PVC Wall & Ceiling Panels",
      "LED Interior + Exterior Photocell Lighting",
      "10 Interior Outlets + 1x 20A Exterior Outlet",
      "42\" Sliding Window w/ Security Bars",
      "36\" Man Door + Operational Cargo Doors",
    ],
    listingFeatures: [
      `Insulation\n2" closed-cell spray foam insulation for excellent temperature control and sound reduction.`,
      "Climate Control\n12,000 BTU LG Mini Split Heat Pump (AC & Heat) with dedicated surge protection.",
      "Interior Finish\nSmooth, moisture-resistant PVC wall and ceiling panels — easy to clean, chemical resistant, and durable for long-term use.",
      "Lighting\nTwo interior LED ceiling lights plus one exterior photocell light above the door for automatic operation.",
      "Electrical\nTen interior outlets throughout the space and one 20-amp exterior outlet.",
      'Windows\nOne 42" x 30" sliding window with steel security bars.',
      'Door Access\nOne 36" man door with keyed lock.\nFully operational cargo doors for loading equipment or furniture.',
    ],
    deliveryBlurb:
      "Delivery is arranged through a trusted third-party carrier. Visit the Delivery page for logistics details and to request a shipping quote.",
    customizationBlurb:
      "Interested in bathrooms, additional windows, layout changes, or other upgrades? Visit our Custom Builds page to learn more.",
    availability: "In Stock - Ready to Ship",
    image: "https://images.unsplash.com/photo-1588636181775-654db0733a41?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1588636181775-654db0733a41?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
    ],
    order: 0,
  },
  {
    id: "scs-40-office",
    title: "40' Office Container",
    price: 27900,
    priceStr: "$27,900",
    stripeLink: "https://buy.stripe.com/test_placeholder",
    description:
      "Fully finished, climate-controlled one-trip office container — ideal for job sites, commercial operations, and growing businesses that need a professional workspace fast.",
    listingDescription:
      "Our 40-foot office container is a fully finished, climate-controlled workspace built from a one-trip shipping container. Designed for durability, comfort, and long-term use, it's ideal for job sites, remote offices, commercial operations, or temporary workspace needs.\n\nBest for: Construction sites, industrial yards, temporary offices, remote operations, and growing businesses that need a professional workspace fast.",
    features: [
      "2\" Closed-Cell Spray Foam Insulation",
      "12,000 BTU LG Mini-Split (AC & Heat)",
      "Moisture-Resistant PVC Wall & Ceiling Panels",
      "4 LED Interior + Exterior Photocell Lighting",
      "18 Interior Outlets + 1x 20A Exterior Outlet",
      "2x 42\" Sliding Windows w/ Security Bars",
      "36\" Steel Man Door + Operational Cargo Doors",
    ],
    listingFeatures: [
      `Insulation\n2" closed-cell spray foam insulation for excellent temperature control, moisture resistance, and sound reduction.`,
      "Climate Control\n12,000 BTU LG mini-split heat pump (AC & Heat) with dedicated surge protection.",
      "Interior Finish\nSmooth, moisture-resistant PVC wall and ceiling panels. Durable, easy to clean, and resistant to mold and moisture.",
      "Lighting\nFour interior LED ceiling lights.\nOne exterior photocell light above the entry door for automatic nighttime operation.",
      "Electrical\nEighteen standard interior outlets.\nOne 20-amp exterior outlet.",
      'Windows\nTwo 42" × 30" sliding windows with steel security bars.',
      'Door Access\nOne 36" steel man door with keyed lock.\nFully operational cargo doors for loading larger items, furniture, or equipment.',
    ],
    deliveryBlurb:
      "Delivery is arranged through a trusted third-party carrier. Visit the Delivery page for logistics details and to request a shipping quote.",
    customizationBlurb:
      "Interested in bathrooms, additional windows, layout changes, or other upgrades? Visit our Custom Builds page to learn more.",
    availability: "2 In Stock - Ready to Ship",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1588636181775-654db0733a41?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    ],
    order: 1,
  },
  {
    id: "scs-40-combo",
    title: "40' Office / Storage Combo",
    price: 22000,
    priceStr: "$22,000",
    stripeLink: "https://buy.stripe.com/test_placeholder",
    description:
      "40' one-trip unit with a full 20' office build (same spec as our 20' office) plus a dedicated 20' storage bay — partition wall with interior man door, cargo lockbox, and storage lighting and power.",
    listingDescription:
      "Our 40-foot office / storage combo starts with the same office specification as our 20' office container — insulation, climate control, PVC finish, lighting, and electrical — built into half of a 40' one-trip container. The other half is strictly for storage: secure, unfinished bay space for tools, materials, and equipment. A wood-studded, insulated partition wall separates the two sides, with an interior man door in that wall so you can walk from the office into storage without going outside.\n\nBest for: Job sites, contractors, and operations that need a professional office and lockable dry storage in one delivered unit.",
    features: [
      "Split 20' Office / 20' Storage (40' Shell)",
      "Office Side: Same Build Spec as 20' Office Container",
      "Insulated Wood-Stud Partition + Interior Man Door to Storage",
      "Storage: 2x 4' LED Overheads + 2× 4plex Outlets",
      "2\" Spray Foam, 12k BTU Mini-Split, PVC Office Finish",
      "42\" Office Window, Man Door, Cargo Doors + Lockbox",
    ],
    listingFeatures: [
      `Layout & floorplan\nBuilt from a 40' one-trip shipping container: one half is a fully finished office matching our 20' office container specification; the other half is dedicated strictly to storage — a secure, raw bay for gear and inventory (not a second finished office).`,
      `Partition & interior access\nWood-studded, insulated partition wall between office and storage. An interior man door in the partition lets you access the storage room directly from the climate-controlled office.`,
      `Insulation\n2" closed-cell spray foam insulation for excellent temperature control and sound reduction — same approach as our 20' office build, applied for the office side and shell as specified for this model.`,
      `Climate control\n12,000 BTU LG Mini Split Heat Pump (AC & Heat) with dedicated surge protection, serving the office side.`,
      `Office — interior finish\nSmooth, moisture-resistant PVC wall and ceiling panels — easy to clean, chemical resistant, and durable for long-term use.`,
      `Office — lighting\nTwo interior LED ceiling lights plus one exterior photocell light above the door for automatic operation.`,
      `Office — electrical\nTen interior outlets throughout the office space and one 20-amp exterior outlet.`,
      `Windows (office)\nOne 42" x 30" sliding window with steel security bars.`,
      `Exterior & cargo access\nOne 36" man door with keyed lock. Fully operational cargo doors for loading the storage bay and oversized items. High-security lockbox on the cargo doors.`,
      `Storage bay — lighting & power\nTwo 4' LED overhead lights. Two 4plex outlets for power in the storage room (ideal for tools and equipment).`,
    ],
    deliveryBlurb:
      "Delivery is arranged through a trusted third-party carrier. Visit the Delivery page for logistics details and to request a shipping quote.",
    customizationBlurb:
      "Interested in bathrooms, additional windows, layout changes, or other upgrades? Visit our Custom Builds page to learn more.",
    availability: "Build to Order - 3 Week Lead Time",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1588636181775-654db0733a41?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    ],
    order: 2,
  }
];

/** Seed row by id — used to fill long-form listing fields missing on older Firestore docs */
const SEED_BY_ID = new Map(SEED_INVENTORY.map((row) => [row.id, row]));

function enrichInventoryFromSeed(item) {
  const seed = SEED_BY_ID.get(item.id);
  if (!seed) return item;
  const listingFeatures =
    Array.isArray(item.listingFeatures) && item.listingFeatures.length > 0
      ? item.listingFeatures
      : seed.listingFeatures;
  return {
    ...item,
    listingDescription: item.listingDescription || seed.listingDescription,
    listingFeatures,
    deliveryBlurb: item.deliveryBlurb || seed.deliveryBlurb,
    customizationBlurb: item.customizationBlurb || seed.customizationBlurb,
  };
}

/** Accepts Firestore arrays, a single image field, JSON strings, or legacy object maps of URLs */
function coerceImageList(raw) {
  if (raw == null) return [];
  if (Array.isArray(raw)) {
    return raw
      .map((s) => (s == null ? '' : String(s).trim()))
      .filter((s) => s.length > 0);
  }
  if (typeof raw === 'string') {
    const t = raw.trim();
    if (!t) return [];
    if (t.startsWith('[')) {
      try {
        return coerceImageList(JSON.parse(t));
      } catch {
        return t.length > 0 ? [t] : [];
      }
    }
    if (/\n/.test(t)) {
      return t
        .split(/\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    }
    if (t.includes(',')) {
      const parts = t.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
      if (parts.length > 1) return parts;
    }
    return [t];
  }
  if (typeof raw === 'object') {
    return Object.values(raw)
      .flatMap((v) => coerceImageList(v))
      .filter((u, i, a) => a.indexOf(u) === i);
  }
  return [];
}

function normalizeInventoryItemFromFirestore(id, data) {
  const fromImages = coerceImageList(data?.images);
  const fromImageField = coerceImageList(data?.image);
  const images = fromImages.length ? fromImages : fromImageField;
  const image = images[0] || (typeof data?.image === 'string' ? data.image.trim() : '') || '';
  return { ...data, images, image, id };
}

function listingImageUrls(item) {
  if (!item) return [];
  const fromArr = coerceImageList(item.images);
  if (fromArr.length) return fromArr;
  return coerceImageList(item.image);
}

function extractYouTubeId(url) {
  if (!url) return null;
  const m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s?]+)/);
  return m ? m[1] : null;
}

function extractVimeoId(url) {
  const m = String(url).match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

const ListingVideo = ({ url }) => {
  const u = url?.trim();
  if (!u) return null;
  const yt = extractYouTubeId(u);
  if (yt) {
    return (
      <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 bg-black aspect-video shadow-sm">
        <iframe
          title="Listing video"
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${yt}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  const vm = extractVimeoId(u);
  if (vm) {
    return (
      <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 bg-black aspect-video shadow-sm">
        <iframe
          title="Listing video"
          className="w-full h-full"
          src={`https://player.vimeo.com/video/${vm}`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 bg-slate-950">
      <video src={u} controls className="w-full max-h-[min(480px,50vh)]" playsInline preload="metadata">
        <track kind="captions" />
      </video>
    </div>
  );
};

const ListingGallery = ({ item }) => {
  const urls = listingImageUrls(item);
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const videoUrl = item?.videoUrl?.trim();

  useEffect(() => {
    if (active >= urls.length) setActive(0);
  }, [urls.length, active]);

  useEffect(() => {
    if (!lightboxOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (urls.length <= 1) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((a) => (a - 1 + urls.length) % urls.length);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive((a) => (a + 1) % urls.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, urls.length]);

  useEffect(() => {
    if (lightboxOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const main = urls[active] || urls[0];

  const openLightbox = () => {
    if (main) setLightboxOpen(true);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full min-h-[220px] aspect-[4/3] max-h-[min(420px,52vh)] bg-slate-100 rounded-xl overflow-hidden border border-slate-200/80">
        {main ? (
          <button
            type="button"
            onClick={openLightbox}
            className="absolute inset-0 z-0 flex items-center justify-center p-3 cursor-zoom-in group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 rounded-xl"
            aria-label="Open photos full screen"
          >
            <img
              src={main}
              alt={item?.title || "Listing"}
              className="max-h-full max-w-full w-auto h-auto object-contain pointer-events-none"
              draggable={false}
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white/90 bg-slate-950/75 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Click photo for full screen
            </span>
          </button>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-400">
            <ImageIcon className="w-16 h-16" />
          </div>
        )}
        {urls.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                setActive((a) => (a - 1 + urls.length) % urls.length);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-slate-950/75 hover:bg-slate-950 text-white p-2 rounded-full shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                setActive((a) => (a + 1) % urls.length);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-slate-950/75 hover:bg-slate-950 text-white p-2 rounded-full shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
              {urls.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Photo ${i + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${i === active ? "bg-amber-500" : "bg-white/70 hover:bg-white"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {urls.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {urls.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors bg-slate-100 flex items-center justify-center ${i === active ? "border-amber-500" : "border-transparent opacity-70 hover:opacity-100"}`}
            >
              <img src={src} alt="" className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && main && (
        <div
          className="fixed inset-0 z-[200] flex flex-col bg-black/95 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white/90 text-sm font-bold truncate pr-4">
              {item?.title || "Photos"}
              {urls.length > 1 && (
                <span className="text-white/50 font-medium ml-2">
                  {active + 1} / {urls.length}
                </span>
              )}
            </p>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="shrink-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div
            className="relative z-10 flex-1 flex items-center justify-center p-6 md:p-10 min-h-0"
            onClick={() => setLightboxOpen(false)}
          >
            {urls.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive((a) => (a - 1 + urls.length) % urls.length);
                  }}
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
                >
                  <ArrowLeft className="w-7 h-7" />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive((a) => (a + 1) % urls.length);
                  }}
                  className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
            <img
              src={urls[active]}
              alt=""
              className="relative z-10 max-w-full max-h-[min(82vh,100%)] w-auto h-auto object-contain select-none shadow-2xl"
              draggable={false}
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {urls.length > 1 && (
            <div
              className="relative z-10 flex justify-center gap-2 pb-6 pt-1 shrink-0 flex-wrap px-4 max-w-5xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {urls.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 shrink-0 bg-neutral-900 flex items-center justify-center ${i === active ? "border-amber-500 ring-2 ring-amber-500/40" : "border-white/20 opacity-60 hover:opacity-100"}`}
                >
                  <img src={src} alt="" className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {videoUrl && (
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Play className="w-4 h-4 text-amber-500" /> Video
          </p>
          <ListingVideo url={videoUrl} />
        </div>
      )}
    </div>
  );
};

// ==========================================
// SEO RESOURCES
// ==========================================
const SEO_RESOURCES = [
  {
    category: "Cost, Value, & Buying Decisions",
    articles: [
      {
        id: "container-conversion-costs",
        title: "Container Conversion Costs",
        desc: "Learn typical price ranges and what factors affect the total cost.",
        content: (setView) => (
          <div className="space-y-8 text-lg text-slate-700 leading-relaxed">
            <p className="text-xl text-slate-600 font-medium leading-relaxed">
              Container conversion costs vary widely depending on size, layout, features, and finish level. A basic conversion can be relatively affordable, while a fully finished container office or custom build can rival the cost of traditional structures.
            </p>
            <h3 className="text-3xl font-black text-slate-950 mt-12 mb-6 border-b border-slate-200 pb-4">Average Cost Tiers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
                <h4 className="font-black text-slate-950 text-xl mb-1">Basic Build</h4>
                <div className="text-amber-600 font-black text-2xl mb-4">$10,000 - $18,000</div>
                <p className="text-sm">Minimal build-out, basic insulation, limited electrical.</p>
              </div>
              <div className="bg-slate-950 text-white border border-slate-800 p-6 rounded-xl shadow-xl relative transform md:-translate-y-2">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-xs font-black uppercase px-3 py-1 rounded-full">Most Common</div>
                <h4 className="font-black text-white text-xl mb-1">Mid-Level Office</h4>
                <div className="text-amber-500 font-black text-2xl mb-4">$18,000 - $30,000</div>
                <p className="text-sm text-slate-300">Fully insulated, finished interior, electrical, HVAC.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
                <h4 className="font-black text-slate-950 text-xl mb-1">High-End Custom</h4>
                <div className="text-amber-600 font-black text-2xl mb-4">$40,000 - $60,000+</div>
                <p className="text-sm">Premium finishes, complex layouts, plumbing.</p>
              </div>
            </div>
            <div className="mt-12 bg-slate-950 text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h4 className="text-2xl font-black mb-2">Ready to get an exact price?</h4>
                <p className="text-slate-400">View our standard models with transparent pricing.</p>
              </div>
              <div className="flex-shrink-0">
                <button onClick={() => setView('shop')} className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded font-black transition-colors w-full">Shop Inventory</button>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "pros-cons-conversions",
        title: "Pros and Cons of Container Conversions",
        desc: "A balanced look at the advantages and limitations of shipping container builds.",
        content: (_setView) => (
          <div className="space-y-8 text-lg text-slate-700 leading-relaxed">
            <h3 className="text-3xl font-black text-slate-950 mt-12 mb-6 border-b border-slate-200 pb-4 text-green-700 flex items-center">
              <CheckCircle2 className="w-8 h-8 mr-3" /> The Pros
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-950 text-xl mb-3">Durable Steel Construction</h4>
                <p className="text-sm mb-4">Built from structural Cor-Ten steel designed to withstand harsh oceanic environments.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-950 text-xl mb-3">Faster Build Times</h4>
                <p className="text-sm mb-4">Built off-site in controlled facilities and delivered as finished units.</p>
              </div>
            </div>
            <h3 className="text-3xl font-black text-slate-950 mt-12 mb-6 border-b border-slate-200 pb-4 text-red-700 flex items-center">
              <AlertTriangle className="w-8 h-8 mr-3" /> The Cons
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-red-100 p-6 rounded-xl">
                <h4 className="font-bold text-slate-950 text-xl mb-3">Higher Upfront Cost</h4>
                <p className="text-sm">Often cost more upfront than simple wood-framed sheds or unfinished structures.</p>
              </div>
              <div className="border border-red-100 p-6 rounded-xl">
                <h4 className="font-bold text-slate-950 text-xl mb-3">Limited Width</h4>
                <p className="text-sm">Fixed 8-foot external width restricts certain architectural applications.</p>
              </div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    category: "Build Process and Logistics",
    articles: [
      {
        id: "how-conversions-are-built",
        title: "How Container Conversions Are Built",
        desc: "A step-by-step overview of the professional manufacturing process.",
        content: (_setView) => (
          <div className="space-y-8 text-lg text-slate-700 leading-relaxed">
            <h3 className="text-3xl font-black text-slate-950 mt-12 mb-8 border-b border-slate-200 pb-4">The Manufacturing Process</h3>
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row md:items-start border-l-4 border-amber-500 pl-6">
                <div className="bg-amber-100 text-amber-600 font-black text-2xl w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0 mb-4 md:mb-0 md:mr-6">1</div>
                <div><h4 className="text-2xl font-black text-slate-950 mb-2">Selecting the Steel</h4><p>We select the appropriate grade (One-Trip or WWT) based on the project.</p></div>
              </div>
              <div className="flex flex-col md:flex-row md:items-start border-l-4 border-amber-500 pl-6">
                <div className="bg-amber-100 text-amber-600 font-black text-2xl w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0 mb-4 md:mb-0 md:mr-6">2</div>
                <div><h4 className="text-2xl font-black text-slate-950 mb-2">Structural Modifications & Reinforcement</h4><p>We weld heavy-duty steel tube framing around every opening to maintain strength.</p></div>
              </div>
              <div className="flex flex-col md:flex-row md:items-start border-l-4 border-amber-500 pl-6">
                <div className="bg-amber-100 text-amber-600 font-black text-2xl w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0 mb-4 md:mb-0 md:mr-6">3</div>
                <div><h4 className="text-2xl font-black text-slate-950 mb-2">Climate Engineering & Insulation</h4><p>Commercial-grade insulation creates a perfect thermal break.</p></div>
              </div>
            </div>
          </div>
        )
      }
    ]
  }
];

// ==========================================
// ADMIN - LOGIN
// ==========================================
function adminLoginErrorMessage(err) {
  const code = err?.code || '';
  if (code === 'auth/unauthorized-domain') {
    return 'This website address is not allowed to use Firebase sign-in yet. In Firebase Console go to Authentication → Settings → Authorized domains, and add your live domain (e.g. your-site.netlify.app and your custom domain). Then try again.';
  }
  if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found' || code === 'auth/invalid-email') {
    return 'Invalid email or password.';
  }
  if (code === 'auth/operation-not-allowed') {
    return 'Email/password sign-in is turned off in Firebase. Enable it under Authentication → Sign-in method.';
  }
  if (code === 'auth/invalid-api-key' || code === 'auth/api-key-not-valid') {
    return 'Firebase API key is missing or wrong. Check Netlify → Site settings → Environment variables (all VITE_FIREBASE_* values), then redeploy.';
  }
  if (code === 'auth/network-request-failed') {
    return 'Network error — check your connection and try again.';
  }
  return err?.message || 'Sign-in failed. Check the browser console (F12) for details.';
}

const AdminLogin = ({ onLoginSuccess, onBackToSite, onEmailSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!auth) {
        setError(
          'Firebase is not connected on this deployment. In Netlify add all VITE_FIREBASE_* variables from your .env (same names as .env.example), save, then trigger a new deploy.'
        );
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
      onEmailSignIn?.();
      onLoginSuccess?.();
    } catch (err) {
      setError(adminLoginErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 animate-in fade-in duration-300 pb-12">
      {onBackToSite && (
        <button
          type="button"
          onClick={onBackToSite}
          className="mb-8 inline-flex items-center gap-2 text-slate-400 hover:text-amber-500 text-sm font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to website
        </button>
      )}
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-2xl font-black text-white">Admin Access</h1>
          <p className="text-slate-500 text-sm mt-1">Southern Container Solutions</p>
        </div>

        {!auth && (
          <div className="mb-6 bg-amber-950/40 border border-amber-700/60 text-amber-200 text-sm px-4 py-3 rounded-lg">
            Firebase config is missing on this server build. Add the six <span className="font-mono text-xs">VITE_FIREBASE_*</span> environment variables in Netlify, then redeploy the site.
          </div>
        )}

        <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email</label>
            <input
              required type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <input
                required type={showPass ? 'text' : 'password'} value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500 transition-colors pr-12"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors text-xs font-bold">
                {showPass ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-950/50 border border-red-800 text-red-400 text-sm font-medium px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button disabled={loading || !auth} className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-950 py-4 rounded font-black transition-colors">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-slate-600 text-xs mt-6">
          Admin accounts are created in your Firebase console under Authentication{'>'} Users.
        </p>
      </div>
    </div>
  );
};

// ==========================================
// ADMIN - ITEM FORM (Add / Edit)
// ==========================================
const AdminItemForm = ({ item, onSave, onCancel }) => {
  const isNew = !item?.id;
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const initialImages = () => {
    const fromImages = coerceImageList(item?.images);
    if (fromImages.length) return fromImages;
    return coerceImageList(item?.image);
  };

  const [form, setForm] = useState({
    title: item?.title || '',
    price: item?.price || '',
    description: item?.description || '',
    features: Array.isArray(item?.features) ? item.features.join('\n') : '',
    availability: item?.availability || 'In Stock - Ready to Ship',
    stripeLink: item?.stripeLink || '',
    images: initialImages(),
    videoUrl: item?.videoUrl || '',
    order: item?.order ?? 99,
  });

  const [uploadProgress, setUploadProgress] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const uploadToStorage = (file, folder = 'scs_inventory') =>
    new Promise((resolve, reject) => {
      const safeName = file.name.replace(/[^\w.-]/g, '_');
      const storageRef = ref(storage, `${folder}/${Date.now()}_${safeName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          setUploadProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
        },
        (err) => {
          reject(err);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });

  const handlePhotosUpload = async (e) => {
    const files = [...(e.target.files || [])].filter((f) => f.type.startsWith('image/'));
    e.target.value = '';
    if (!files.length || !storage) return;
    setUploadError('');
    for (const file of files) {
      try {
        const url = await uploadToStorage(file, 'scs_inventory');
        setForm((f) => ({ ...f, images: [...f.images, url] }));
      } catch (err) {
        console.error(err);
        setUploadError('Photo upload failed. Check Firebase Storage rules.');
        break;
      } finally {
        setUploadProgress(null);
      }
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !file.type.startsWith('video/') || !storage) return;
    setUploadError('');
    setUploadProgress(0);
    try {
      const url = await uploadToStorage(file, 'scs_inventory/videos');
      setForm((f) => ({ ...f, videoUrl: url }));
    } catch (err) {
      console.error(err);
      setUploadError('Video upload failed. Check Storage rules and file size limits.');
    } finally {
      setUploadProgress(null);
    }
  };

  const removeImageAt = (index) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  };

  const moveImage = (index, delta) => {
    setForm((f) => {
      const next = [...f.images];
      const j = index + delta;
      if (j < 0 || j >= next.length) return f;
      [next[index], next[j]] = [next[j], next[index]];
      return { ...f, images: next };
    });
  };

  const dragPhotoFrom = useRef(null);
  const [photoDragOver, setPhotoDragOver] = useState(null);

  const reorderPhoto = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    setForm((f) => {
      const next = [...f.images];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return { ...f, images: next };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const priceNum = parseInt(form.price, 10) || 0;
    const imgs = form.images.map((s) => String(s).trim()).filter(Boolean);
    const itemData = {
      ...(item || {}),
      title: form.title.trim(),
      price: priceNum,
      priceStr: '$' + priceNum.toLocaleString(),
      description: form.description.trim(),
      features: form.features.split('\n').map((x) => x.trim()).filter(Boolean),
      availability: form.availability.trim(),
      stripeLink: form.stripeLink.trim(),
      images: imgs,
      image: imgs[0] || '',
      videoUrl: form.videoUrl.trim(),
      order: parseInt(form.order, 10) || 0,
    };
    try {
      if (isNew) {
        await addDoc(collection(db, 'scs_inventory'), itemData);
      } else {
        await setDoc(doc(db, 'scs_inventory', item.id), itemData);
      }
      setSaving(false);
      onSave();
    } catch (err) {
      console.error('Save error:', err);
      setSaving(false);
    }
  };

  const inputCls = "w-full bg-slate-950 border border-slate-800 rounded p-3 text-white outline-none focus:border-amber-500 transition-colors text-sm";
  const labelCls = "block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2";

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className={labelCls}>Title</label>
          <input required type="text" className={inputCls} value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="e.g. 20' Office Container" />
        </div>
        <div>
          <label className={labelCls}>Price (numbers only)</label>
          <input required type="number" className={inputCls} value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value}))} placeholder="19900" />
        </div>
        <div>
          <label className={labelCls}>Display Order</label>
          <input type="number" className={inputCls} value={form.order} onChange={e => setForm(f => ({...f, order: e.target.value}))} placeholder="0 = first" />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Availability Status</label>
          <input type="text" className={inputCls} value={form.availability} onChange={e => setForm(f => ({...f, availability: e.target.value}))} placeholder="In Stock - Ready to Ship" />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Optional external checkout URL</label>
          <input type="url" className={inputCls} value={form.stripeLink} onChange={e => setForm(f => ({...f, stripeLink: e.target.value}))} placeholder="Leave blank — purchases use the Buy now request form" />
          <p className="text-xs text-slate-500 mt-1">Public site uses QuickBooks / wire flow from Buy now, not this field.</p>
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Description</label>
          <textarea required rows="3" className={inputCls} value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Features (one per line)</label>
          <textarea rows="6" className={inputCls + " font-mono"} value={form.features} onChange={e => setForm(f => ({...f, features: e.target.value}))} placeholder={"12,000 BTU Mini-Split\nPVC Wall Panels\n36\" Man Door"} />
        </div>

        {/* Photos + video */}
        <div className="md:col-span-2 bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6">
          <div>
            <label className={labelCls}>Listing photos</label>
            <p className="text-slate-500 text-xs mb-3">
              Upload multiple images. <strong className="text-slate-400">First photo is the cover.</strong> Drag thumbnails to reorder, or use arrows.
            </p>
            {form.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                {form.images.map((src, idx) => (
                  <div
                    key={`${idx}-${src.slice(-24)}`}
                    draggable
                    onDragStart={(e) => {
                      dragPhotoFrom.current = idx;
                      e.dataTransfer.effectAllowed = 'move';
                      e.dataTransfer.setData('text/plain', String(idx));
                      try {
                        e.dataTransfer.setDragImage(e.currentTarget, 40, 40);
                      } catch {
                        /* ignore */
                      }
                    }}
                    onDragEnd={() => {
                      dragPhotoFrom.current = null;
                      setPhotoDragOver(null);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                      setPhotoDragOver(idx);
                    }}
                    onDragLeave={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget)) setPhotoDragOver(null);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const from = dragPhotoFrom.current;
                      setPhotoDragOver(null);
                      if (from === null || from === idx) return;
                      reorderPhoto(from, idx);
                    }}
                    className={`relative group rounded-lg overflow-hidden border aspect-square bg-slate-900 cursor-grab active:cursor-grabbing transition-colors ${
                      photoDragOver === idx ? 'border-amber-500 ring-2 ring-amber-500/40' : 'border-slate-800'
                    }`}
                  >
                    <div className="absolute top-1 right-1 z-10 bg-slate-950/85 rounded p-0.5 pointer-events-none" title="Drag to reorder">
                      <GripVertical className="w-4 h-4 text-slate-400" aria-hidden />
                    </div>
                    <img src={src} alt="" className="w-full h-full object-cover pointer-events-none select-none" draggable={false} referrerPolicy="no-referrer" />
                    {/* pointer-events-none so drag works on the tile; only buttons capture clicks */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-1 pointer-events-none">
                      <div className="flex gap-1 pointer-events-auto">
                        <button type="button" onClick={() => moveImage(idx, -1)} disabled={idx === 0} className="text-[10px] font-bold bg-white/90 text-slate-900 px-2 py-1 rounded disabled:opacity-30">
                          Up
                        </button>
                        <button type="button" onClick={() => moveImage(idx, 1)} disabled={idx === form.images.length - 1} className="text-[10px] font-bold bg-white/90 text-slate-900 px-2 py-1 rounded disabled:opacity-30">
                          Down
                        </button>
                      </div>
                      <button type="button" onClick={() => removeImageAt(idx)} className="text-[10px] font-bold bg-red-600 text-white px-2 py-1 rounded pointer-events-auto">
                        Remove
                      </button>
                    </div>
                    {idx === 0 && (
                      <span className="absolute top-1 left-1 bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded pointer-events-none">COVER</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadProgress !== null || !storage}
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white text-sm font-bold px-4 py-3 rounded transition-colors"
              >
                <Upload className="w-4 h-4" />
                {uploadProgress !== null ? `Uploading ${uploadProgress}%` : 'Add photos'}
              </button>
              <input
                type="text"
                className={inputCls + " flex-1 min-w-[200px]"}
                placeholder="Paste image URL, then press Enter to add"
                onKeyDown={(e) => {
                  if (e.key !== 'Enter') return;
                  e.preventDefault();
                  const v = e.target.value.trim();
                  if (!v) return;
                  setForm((f) => ({ ...f, images: [...f.images, v] }));
                  e.target.value = '';
                }}
              />
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotosUpload} />
          </div>

          <div className="border-t border-slate-800 pt-5">
            <label className={labelCls}>Video</label>
            <p className="text-slate-500 text-xs mb-3">YouTube / Vimeo link, direct .mp4 URL, or upload a file (stored in Firebase).</p>
            <input
              type="url"
              className={inputCls + " mb-3"}
              value={form.videoUrl}
              onChange={(e) => setForm((f) => ({ ...f, videoUrl: e.target.value }))}
              placeholder="https://www.youtube.com/watch?v=... or https://..."
            />
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                disabled={uploadProgress !== null || !storage}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white text-sm font-bold px-4 py-3 rounded transition-colors"
              >
                <Video className="w-4 h-4" />
                Upload video file
              </button>
              {form.videoUrl && (
                <button type="button" onClick={() => setForm((f) => ({ ...f, videoUrl: '' }))} className="text-red-400 text-sm font-bold hover:underline">
                  Clear video
                </button>
              )}
            </div>
            <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
            {form.videoUrl && (
              <div className="mt-4 max-w-lg rounded-lg overflow-hidden border border-slate-800">
                <ListingVideo url={form.videoUrl} />
              </div>
            )}
          </div>

          {uploadProgress !== null && (
            <div className="bg-slate-800 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
            </div>
          )}
          {uploadError && <p className="text-red-400 text-xs">{uploadError}</p>}
          {!storage && <p className="text-slate-500 text-xs">Firebase Storage not configured - paste image/video URLs only.</p>}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-950 font-black px-6 py-3 rounded transition-colors">
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : (isNew ? 'Create Listing' : 'Save Changes')}
        </button>
        <button type="button" onClick={onCancel} className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
};

// ==========================================
// ADMIN - DASHBOARD VIEW
// ==========================================
const ViewAdmin = ({ isAdmin, inventory, onRefresh, onNavigateHome, onEmailAdminSignedIn }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (auth) {
      const unsub = onAuthStateChanged(auth, () => setAuthChecked(true));
      return unsub;
    } else {
      setAuthChecked(true);
    }
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this listing permanently?')) return;
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, 'scs_inventory', id));
      await onRefresh();
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleFormSave = async () => {
    setEditingItem(null);
    setShowNewForm(false);
    await onRefresh();
  };

  const handleLogout = async () => {
    await signOut(auth);
    onNavigateHome?.();
  };

  if (!authChecked) return null;

  if (!isAdmin) {
    return <AdminLogin onLoginSuccess={() => {}} onBackToSite={onNavigateHome} onEmailSignIn={onEmailAdminSignedIn} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white animate-in fade-in duration-300">
      {/* Admin Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center">
            <PackageOpen className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="font-black text-white text-sm">Admin Dashboard</div>
            <div className="text-slate-500 text-xs">Southern Container Solutions</div>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
          <button
            type="button"
            onClick={() => onNavigateHome?.()}
            className="flex items-center gap-1.5 text-amber-500 hover:text-amber-400 text-xs font-bold transition-colors border border-amber-500/40 hover:border-amber-400/60 rounded px-3 py-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> View website
          </button>
          <button onClick={onRefresh} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs font-bold transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button onClick={handleLogout} className="flex items-center gap-1.5 bg-slate-800 hover:bg-red-900 text-slate-300 hover:text-white px-3 py-1.5 rounded text-xs font-bold transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">

        {/* New Item Form */}
        {showNewForm ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-black text-white mb-6 border-b border-slate-800 pb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-500" /> Add New Listing
            </h2>
            <AdminItemForm key="new" item={null} onSave={handleFormSave} onCancel={() => setShowNewForm(false)} />
          </div>
        ) : editingItem ? (
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-black text-white mb-6 border-b border-slate-800 pb-4 flex items-center gap-2">
              <Edit2 className="w-5 h-5 text-amber-500" /> Editing: {editingItem.title}
            </h2>
            <AdminItemForm key={editingItem.id} item={editingItem} onSave={handleFormSave} onCancel={() => setEditingItem(null)} />
          </div>
        ) : (
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-black text-white">Inventory Listings</h1>
              <p className="text-slate-500 text-sm mt-1">{inventory.length} listing{inventory.length !== 1 ? 's' : ''} - changes go live instantly</p>
            </div>
            <button
              onClick={() => setShowNewForm(true)}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-5 py-2.5 rounded transition-colors text-sm"
            >
              <Plus className="w-4 h-4" /> Add Listing
            </button>
          </div>
        )}

        {/* Inventory Cards */}
        {!showNewForm && !editingItem && (
          <div className="space-y-4">
            {inventory.length === 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
                <ImageIcon className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 font-bold">No listings yet. Add your first one above.</p>
              </div>
            )}
            {[...inventory].sort((a, b) => (a.order ?? 99) - (b.order ?? 99)).map(item => (
              <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col sm:flex-row overflow-hidden hover:border-slate-700 transition-colors">
                <div className="w-full sm:w-40 h-40 sm:h-auto flex-shrink-0 bg-slate-800">
                  {listingImageUrls(item)[0] ? (
                    <img src={listingImageUrls(item)[0]} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-slate-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 p-5 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">#{item.order ?? '--'}</span>
                    </div>
                    <h3 className="font-black text-white text-lg leading-tight">{item.title}</h3>
                    <div className="text-amber-500 font-black text-xl mt-1">{item.priceStr}</div>
                    <div className="mt-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${item.availability?.toLowerCase().includes('stock') ? 'bg-green-900/50 text-green-400' : 'bg-amber-900/50 text-amber-400'}`}>
                        {item.availability}
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-2 line-clamp-2">{item.description}</p>
                  </div>
                  <div className="flex sm:flex-col gap-2 justify-start sm:justify-center flex-shrink-0">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="flex items-center gap-1.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-xs font-bold px-3 py-2 rounded transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="flex items-center gap-1.5 bg-slate-800 hover:bg-red-700 text-slate-400 hover:text-white text-xs font-bold px-3 py-2 rounded transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> {deletingId === item.id ? '...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Leads section hint */}
        {!showNewForm && !editingItem && (
          <div className="mt-12 bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
            <h3 className="font-black text-white text-sm mb-1">Viewing Form Leads</h3>
            <p className="text-slate-500 text-xs">
              All quote request leads are stored in your Firebase Console {'>'} Firestore {'>'}{' '}
              <span className="font-mono bg-slate-800 px-1 py-0.5 rounded text-slate-300">scs_leads</span>{' '}
              collection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// GLOBAL COMPONENTS
// ==========================================
const Navbar = ({ currentView, setView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Finished Offices' },
    { id: 'raw', label: 'Raw Containers' },
    { id: 'rentals', label: 'Rentals' },
    { id: 'custom', label: 'Custom Builds' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'about', label: 'About' },
    { id: 'resources', label: 'Resources' },
  ];

  return (
    <>
      <div className="bg-slate-950 text-slate-300 py-2 px-4 md:px-8 text-xs font-medium justify-between items-center hidden lg:flex">
        <div className="flex space-x-6">
          <span className="flex items-center"><MapPin className="w-3 h-3 mr-1 text-amber-500" /> Covington, Louisiana</span>
          <span className="flex items-center"><Truck className="w-3 h-3 mr-1 text-amber-500" /> Nationwide Delivery</span>
        </div>
        <div className="flex space-x-6">
          <a href="tel:985-250-0708" className="hover:text-white transition-colors flex items-center">
            <Phone className="w-3 h-3 mr-1" /> (985) 250-0708
          </a>
        </div>
      </div>

      <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('home')}>
            <div className="w-12 h-12 bg-slate-950 rounded flex items-center justify-center shadow-md">
              <PackageOpen className="w-7 h-7 text-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-950 leading-none block">SOUTHERN</span>
              <span className="text-[10px] md:text-xs font-bold text-amber-600 tracking-[0.2em] uppercase leading-none mt-1">Container Solutions</span>
            </div>
          </div>

          <div className="hidden lg:flex space-x-6 items-center font-bold text-sm text-slate-500">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => setView(link.id)}
                className={`transition-colors pb-1 border-b-2 ${currentView === link.id ? 'text-slate-950 border-amber-500' : 'border-transparent hover:text-slate-950'}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setView('admin')}
              className="flex items-center gap-2 text-slate-600 hover:text-amber-600 font-bold text-sm px-2 py-2 rounded transition-colors"
              title="Edit listings and view leads"
            >
              <Lock className="w-4 h-4" />
              Admin
            </button>
            <button
              onClick={() => setView('shop')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-2.5 rounded font-black text-sm transition-all shadow-[0_4px_14px_0_rgba(245,158,11,0.39)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.23)] hover:-translate-y-0.5"
            >
              Buy Online
            </button>
          </div>

          <button className="lg:hidden text-slate-950 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-4 shadow-2xl absolute w-full z-40">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => { setView(link.id); setIsMenuOpen(false); }}
                className="block w-full text-left font-bold text-slate-900 py-2 border-b border-slate-100"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => { setView('admin'); setIsMenuOpen(false); }}
              className="flex items-center gap-2 w-full font-bold text-slate-600 py-3 border-b border-slate-100"
            >
              <Lock className="w-4 h-4" /> Admin (listings &amp; leads)
            </button>
            <button
              onClick={() => { setView('shop'); setIsMenuOpen(false); }}
              className="w-full bg-amber-500 text-slate-950 px-6 py-4 rounded font-black text-base mt-6 flex justify-center items-center"
            >
              Buy Online <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

// ==========================================
// VIEWS
// ==========================================

const ViewHome = ({ setView, inventory }) => (
  <div className="animate-in fade-in duration-500">
    <header className="relative bg-slate-950 overflow-hidden min-h-[85vh] flex flex-col lg:flex-row lg:items-stretch">
      {/* Copy — left column on large screens; below hero image on mobile */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8 xl:px-12 py-14 lg:py-24 order-2 lg:order-1">
        <div className="max-w-3xl lg:max-w-xl xl:max-w-2xl mx-auto lg:mx-0 lg:ml-auto lg:mr-8 xl:mr-12">
          <div className="inline-flex items-center space-x-2 bg-slate-900/80 border border-slate-700 backdrop-blur-sm text-slate-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Commercial Grade - Built in Louisiana</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
            Premium Modular Offices. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Transparent Pricing.</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed font-medium">
            Stop waiting days for a quote. We engineer heavy-duty container offices for job sites and businesses. See the price, buy direct, and get it delivered.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button onClick={() => setView('shop')} className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded font-black text-lg transition-all flex items-center justify-center hover:-translate-y-1">
              Shop Available Units <ShoppingCart className="ml-3 w-5 h-5" />
            </button>
            <button onClick={() => setView('custom')} className="bg-slate-900/50 hover:bg-slate-800 text-white border border-slate-600 px-8 py-4 rounded font-bold text-lg transition-all flex items-center justify-center backdrop-blur-md">
              Request Custom Build
            </button>
          </div>
        </div>
      </div>

      {/* Hero photo — right on desktop; full width on top for mobile */}
      <div className="relative w-full lg:w-[50%] xl:w-[48%] min-h-[260px] sm:min-h-[340px] lg:min-h-[85vh] order-1 lg:order-2 shrink-0">
        <img
          src={publicUrl("hero-office-storage-combo.png")}
          alt="40-foot container office and storage unit on a job site"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950 lg:bg-gradient-to-l lg:from-slate-950 lg:via-slate-950/25 lg:to-transparent"
          aria-hidden
        />
      </div>
    </header>

    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-950 mb-4">Featured Inventory</h2>
            <p className="text-slate-600 text-lg font-medium">Standard configurations ready for production.</p>
          </div>
          <button onClick={() => setView('shop')} className="hidden md:flex text-amber-600 hover:text-amber-700 font-bold items-center">
            View All <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {inventory.slice(0, 2).map(product => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
              <div className="h-72 overflow-hidden relative">
                <img
                  src={listingImageUrls(product)[0] || ''}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1588636181775-654db0733a41?auto=format&fit=crop&q=80&w=1200';
                  }}
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black text-slate-950">{product.title}</h3>
                  <span className="text-2xl font-black text-amber-600">{product.priceStr}</span>
                </div>
                <p className="text-slate-600 mb-6 font-medium line-clamp-2">{product.description}</p>
                <button onClick={() => setView('shop')} className="w-full bg-slate-100 hover:bg-slate-950 text-slate-900 hover:text-white py-4 rounded font-bold transition-colors flex justify-center items-center">
                  View Specifications
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const SITE_LEADS_EMAIL = 'bdlindustriesllc@gmail.com';

/** FormSubmit → SITE_LEADS_EMAIL (confirm inbox once at formsubmit.co on first submission). */
async function sendSiteLeadEmail(subject, fields) {
  const body = {
    _subject: subject,
    _template: 'table',
    _captcha: false,
    ...fields,
  };
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(SITE_LEADS_EMAIL)}`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) console.warn('Site lead email returned', res.status);
}

/** Buy flow: collect contact + payment preference; you send QuickBooks link or wire instructions. */
const OfficePurchaseRequestModal = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    paymentPreference: 'quickbooks',
    notes: '',
  });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!product) return;
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      paymentPreference: 'quickbooks',
      notes: '',
    });
    setStatus('idle');
  }, [product?.id]);

  useEffect(() => {
    if (!product) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [product]);

  if (!product) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    try {
      if (db) {
        await addDoc(collection(db, 'scs_leads'), {
          formType: 'office-purchase-request',
          productId: product.id,
          productTitle: product.title,
          price: product.price ?? null,
          priceStr: product.priceStr ?? '',
          paymentPreference: formData.paymentPreference,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company: formData.company.trim(),
          notes: formData.notes.trim(),
          submittedAt: serverTimestamp(),
        });
      }
      await sendSiteLeadEmail('Southern Container Solutions - Office purchase request', {
        formType: 'office-purchase-request',
        productId: product.id,
        productTitle: product.title,
        priceStr: product.priceStr ?? '',
        paymentPreference: formData.paymentPreference,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        notes: formData.notes.trim(),
      });
      setStatus('success');
    } catch (err) {
      console.error('Purchase request error:', err);
      setStatus('error');
    }
  };

  const inputCls = 'w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500';

  return (
    <div
      className="fixed inset-0 z-[180] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[min(92vh,720px)] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="purchase-modal-title"
      >
        <div className="sticky top-0 flex items-start justify-between gap-4 px-6 py-4 border-b border-slate-100 bg-white z-10">
          <div>
            <h2 id="purchase-modal-title" className="text-xl font-black text-slate-950 leading-tight">
              Request to purchase
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              <span className="font-bold text-slate-900">{product.title}</span>
              <span className="text-amber-600 font-black ml-2">{product.priceStr}</span>
              <span className="text-slate-400 text-xs font-bold uppercase"> + freight</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 py-5">
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-black text-slate-950 mb-2">Request received</p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                We will follow up with a QuickBooks payment link (ACH or card) or wiring instructions, based on what you selected.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="bg-slate-950 text-white font-bold px-8 py-3 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          ) : status === 'error' ? (
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <p className="font-bold text-slate-900 mb-2">Could not send request</p>
              <p className="text-slate-600 text-sm mb-4">Please try again or call us.</p>
              <button type="button" onClick={() => setStatus('idle')} className="text-amber-600 font-bold hover:underline">
                Try again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 border border-slate-200 rounded-lg p-4">
                Prices stay exactly as shown. After you submit, we will email you a <strong className="text-slate-900">QuickBooks</strong> invoice link to pay by <strong className="text-slate-900">ACH or credit card</strong>, or send <strong className="text-slate-900">wire transfer instructions</strong> if you prefer that.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full name *</label>
                <input required type="text" className={inputCls} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email *</label>
                  <input required type="email" className={inputCls} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone *</label>
                  <input required type="tel" className={inputCls} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Company (optional)</label>
                <input type="text" className={inputCls} value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
              </div>

              <fieldset className="border border-slate-200 rounded-lg p-4">
                <legend className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">How do you want to pay? *</legend>
                <div className="space-y-3 mt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paypref"
                      className="mt-1 text-amber-600 focus:ring-amber-500"
                      checked={formData.paymentPreference === 'quickbooks'}
                      onChange={() => setFormData({ ...formData, paymentPreference: 'quickbooks' })}
                    />
                    <span>
                      <span className="font-bold text-slate-900 block">QuickBooks link — ACH or credit card</span>
                      <span className="text-sm text-slate-600">We will send a secure QuickBooks payment link so you can pay from your bank (ACH) or by card.</span>
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paypref"
                      className="mt-1 text-amber-600 focus:ring-amber-500"
                      checked={formData.paymentPreference === 'wire'}
                      onChange={() => setFormData({ ...formData, paymentPreference: 'wire' })}
                    />
                    <span>
                      <span className="font-bold text-slate-900 block">Wire transfer</span>
                      <span className="text-sm text-slate-600">We will email you bank wiring instructions for this purchase.</span>
                    </span>
                  </label>
                </div>
              </fieldset>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Notes (optional)</label>
                <textarea rows={3} className={inputCls} value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Delivery zip, timeline, questions…" />
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                <button type="button" onClick={onClose} className="sm:flex-1 py-3 rounded-lg font-bold border-2 border-slate-200 text-slate-700 hover:bg-slate-50">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="sm:flex-[2] bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-950 py-3 rounded-lg font-black flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? 'Sending…' : <>Submit request <ShoppingCart className="w-5 h-5" /></>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const listingFeatureRows = (item) =>
  Array.isArray(item?.listingFeatures) && item.listingFeatures.length
    ? item.listingFeatures
    : item?.features || [];

const ViewShop = ({ inventory, setView }) => {
  const [detail, setDetail] = useState(null);
  const [buyProduct, setBuyProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [detail]);

  if (detail) {
    const photoCount = listingImageUrls(detail).length;
    return (
      <>
      <OfficePurchaseRequestModal product={buyProduct} onClose={() => setBuyProduct(null)} />
      <div className="min-h-screen bg-slate-50 py-10 md:py-14 animate-in fade-in duration-300">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <button
            type="button"
            onClick={() => setDetail(null)}
            className="flex items-center gap-2 text-slate-600 hover:text-amber-600 font-bold mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            Back to catalog
          </button>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-5 p-4 md:p-6 lg:p-8 bg-slate-100 border-b lg:border-b-0 lg:border-r border-slate-200">
                <div className="mb-4 inline-flex items-center gap-2 bg-slate-950 text-white px-3 py-1.5 text-xs font-bold rounded-lg">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  {detail.availability}
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  {photoCount} photo{photoCount !== 1 ? "s" : ""} — use arrows or thumbnails to view all
                </p>
                <ListingGallery item={detail} />
              </div>

              <div className="lg:col-span-7 p-6 md:p-10 flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <h1 className="text-3xl md:text-4xl font-black text-slate-950 leading-tight">{detail.title}</h1>
                  <div className="sm:text-right shrink-0">
                    <span className="text-3xl md:text-4xl font-black text-amber-600 block">{detail.priceStr}</span>
                    <span className="text-xs text-slate-500 font-bold uppercase">+ Freight</span>
                  </div>
                </div>

                <p className="text-slate-600 text-lg leading-relaxed mb-8 whitespace-pre-line">
                  {detail.listingDescription || detail.description}
                </p>

                <h2 className="text-sm font-black text-slate-950 uppercase tracking-widest border-b border-slate-200 pb-2 mb-4">
                  Standard features
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {listingFeatureRows(detail).map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm font-medium text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 mr-2 shrink-0 mt-0.5" />
                      <span className="whitespace-pre-line">{feature}</span>
                    </li>
                  ))}
                </ul>

                {(detail.deliveryBlurb || detail.customizationBlurb) && (
                  <div className="space-y-8 mb-10">
                    {detail.deliveryBlurb && (
                      <div>
                        <h2 className="text-sm font-black text-slate-950 uppercase tracking-widest border-b border-slate-200 pb-2 mb-3">
                          Delivery &amp; Setup
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">{detail.deliveryBlurb}</p>
                        <button
                          type="button"
                          onClick={() => {
                            setDetail(null);
                            setView("delivery");
                          }}
                          className="text-amber-600 font-bold hover:text-amber-700 hover:underline text-sm"
                        >
                          Go to Delivery
                        </button>
                      </div>
                    )}
                    {detail.customizationBlurb && (
                      <div>
                        <h2 className="text-sm font-black text-slate-950 uppercase tracking-widest border-b border-slate-200 pb-2 mb-3">
                          Customization available
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">{detail.customizationBlurb}</p>
                        <button
                          type="button"
                          onClick={() => {
                            setDetail(null);
                            setView("custom");
                          }}
                          className="text-amber-600 font-bold hover:text-amber-700 hover:underline text-sm"
                        >
                          Go to Custom Builds
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setDetail(null)}
                    className="sm:flex-1 py-4 rounded-lg font-bold border-2 border-slate-200 text-slate-800 hover:border-slate-400 hover:bg-slate-50 transition-colors"
                  >
                    Back to all listings
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuyProduct(detail)}
                    className="sm:flex-[2] bg-amber-500 hover:bg-amber-400 text-slate-950 py-4 rounded-lg font-black text-lg transition-all text-center flex items-center justify-center gap-2 shadow-md"
                  >
                    Buy now <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
    <OfficePurchaseRequestModal product={buyProduct} onClose={() => setBuyProduct(null)} />
    <div className="min-h-screen bg-slate-50 py-12 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-slate-950 mb-4">Direct Purchase Catalog</h2>
          <p className="text-slate-600 text-lg max-w-3xl">
            Scroll the list below — each row shows a quick summary and a photo gallery you can click through (arrows and thumbnails). Use{" "}
            <span className="font-bold text-slate-800">Full listing</span> for every detail.{" "}
            <span className="font-bold text-slate-800">Buy now</span> sends us your details; we follow up with a QuickBooks payment link (ACH or card) or wire instructions. Freight is billed separately by delivery zip.
          </p>
        </div>

        <div className="space-y-12">
          {[...inventory].sort((a, b) => (a.order ?? 99) - (b.order ?? 99)).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row hover:shadow-md transition-shadow"
            >
              <div className="w-full lg:w-2/5 relative lg:min-w-[min(100%,380px)] p-4 lg:p-6 bg-slate-100">
                <div className="absolute top-6 left-6 z-20 bg-slate-950/90 text-white px-3 py-1.5 text-xs font-bold rounded flex items-center shadow-lg">
                  <Zap className="w-3 h-3 text-amber-400 mr-1.5 shrink-0" /> {product.availability}
                </div>
                <ListingGallery item={product} />
              </div>

              <div className="w-full lg:w-3/5 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <h3 className="text-3xl font-black text-slate-950 mb-2 md:mb-0 pr-4">{product.title}</h3>
                    <div className="text-left md:text-right shrink-0">
                      <span className="text-3xl font-black text-amber-600 block">{product.priceStr}</span>
                      <span className="text-xs text-slate-500 font-bold uppercase">+ Freight</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-lg mb-6 leading-relaxed">{product.description}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {(product.features || []).map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm font-medium text-slate-700">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 mr-2 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setDetail(product)}
                    className="flex-1 py-4 rounded-lg font-black text-sm bg-slate-950 text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    Full listing <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuyProduct(product)}
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 py-4 rounded-lg font-black text-lg transition-all text-center flex items-center justify-center gap-2"
                  >
                    Buy now <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

const ViewRawContainers = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', zip: '', container: '20_WWT_STD' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    try {
      if (db) {
        await addDoc(collection(db, 'scs_leads'), {
          ...formData,
          formType: 'raw-container-quote',
          submittedAt: serverTimestamp(),
        });
      }
      await sendSiteLeadEmail('Southern Container Solutions - Raw container quote', {
        formType: 'raw-container-quote',
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        zip: formData.zip.trim(),
        container: formData.container,
      });
      setStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 bg-slate-200 text-slate-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Direct Depot Sourcing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-950 mb-4 uppercase tracking-tight">Raw Shipping Containers</h2>
          <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
            Need an unmodified container for dry storage or your own DIY project? We source raw containers directly from local depots and coordinate delivery straight to your site.
          </p>
          <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-sm font-bold max-w-3xl rounded-r">
            <AlertTriangle className="w-5 h-5 inline-block mr-2 -mt-0.5" />
            Inventory and pricing fluctuate daily based on depot supply. Submit a request below for today's exact pricing including freight.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-black text-slate-950 mb-6 border-b border-slate-100 pb-4">20-Foot Containers</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <div><span className="font-bold text-slate-900 block">Wind & Watertight (WWT)</span><span className="text-xs text-slate-500 uppercase tracking-wider">Standard Height (8'6")</span></div>
                  <CheckCircle2 className="w-5 h-5 text-amber-500" />
                </li>
                <li className="flex justify-between items-center">
                  <div><span className="font-bold text-slate-900 block">Cargo Worthy (CWO)</span><span className="text-xs text-slate-500 uppercase tracking-wider">Standard Height (8'6")</span></div>
                  <CheckCircle2 className="w-5 h-5 text-amber-500" />
                </li>
                <li className="flex justify-between items-center">
                  <div><span className="font-bold text-slate-900 block">New / One-Trip</span><span className="text-xs text-slate-500 uppercase tracking-wider">Standard Height (8'6")</span></div>
                  <CheckCircle2 className="w-5 h-5 text-amber-500" />
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-black text-slate-950 mb-6 border-b border-slate-100 pb-4">40-Foot Containers</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <div><span className="font-bold text-slate-900 block">Wind & Watertight (WWT)</span><span className="text-xs text-slate-500 uppercase tracking-wider">Standard (8'6") or High Cube (9'6")</span></div>
                  <CheckCircle2 className="w-5 h-5 text-amber-500" />
                </li>
                <li className="flex justify-between items-center">
                  <div><span className="font-bold text-slate-900 block">Cargo Worthy (CWO)</span><span className="text-xs text-slate-500 uppercase tracking-wider">Standard (8'6") or High Cube (9'6")</span></div>
                  <CheckCircle2 className="w-5 h-5 text-amber-500" />
                </li>
                <li className="flex justify-between items-center">
                  <div><span className="font-bold text-slate-900 block">New / One-Trip</span><span className="text-xs text-slate-500 uppercase tracking-wider">High Cube (9'6")</span></div>
                  <CheckCircle2 className="w-5 h-5 text-amber-500" />
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 md:p-10 border border-slate-800 shadow-2xl relative h-fit">
            {status === 'success' ? (
              <div className="text-center py-16">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-3xl font-black text-white mb-2">Quote Requested</h3>
                <p className="text-slate-400">We are checking depot availability and freight rates. We will contact you shortly.</p>
              </div>
            ) : status === 'error' ? (
              <div className="text-center py-16">
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-3xl font-black text-white mb-2">Submission Failed</h3>
                <p className="text-slate-400 mb-6">Something went wrong. Please try again or call us directly.</p>
                <button onClick={() => setStatus('idle')} className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded font-black transition-colors">Try Again</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-black text-white mb-6 border-b border-slate-800 pb-4">Check Availability & Pricing</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                    <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone</label>
                    <input required type="tel" className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email</label>
                    <input required type="email" className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Delivery Zip Code</label>
                    <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" placeholder="Required for freight" onChange={e => setFormData({...formData, zip: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Container Size & Grade</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, container: e.target.value})}>
                    <optgroup label="20-Foot Options">
                      <option value="20_WWT_STD">20' Standard - Wind & Watertight</option>
                      <option value="20_CWO_STD">20' Standard - Cargo Worthy</option>
                      <option value="20_ONE_STD">20' Standard - New / One-Trip</option>
                    </optgroup>
                    <optgroup label="40-Foot Standard Height (8'6&quot;)">
                      <option value="40_WWT_STD">40' Standard - Wind & Watertight</option>
                      <option value="40_CWO_STD">40' Standard - Cargo Worthy</option>
                    </optgroup>
                    <optgroup label="40-Foot High Cube (9'6&quot;)">
                      <option value="40_WWT_HC">40' High Cube - Wind & Watertight</option>
                      <option value="40_CWO_HC">40' High Cube - Cargo Worthy</option>
                      <option value="40_ONE_HC">40' High Cube - New / One-Trip</option>
                    </optgroup>
                  </select>
                </div>

                <button disabled={status === 'submitting'} className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-950 py-4 rounded font-black text-lg transition-colors flex justify-center items-center">
                  {status === 'submitting' ? 'Submitting...' : 'Request Exact Quote'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-20 border-t border-slate-200 pt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-slate-950 mb-4">Container Condition Guide</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">Please read before requesting a quote. We source industrial shipping containers. Used containers will have cosmetic wear.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6"><CheckCircle2 className="w-6 h-6 text-slate-600" /></div>
              <h4 className="text-xl font-black text-slate-950 mb-2">Wind & Watertight (WWT)</h4>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-4">The Budget Option</div>
              <ul className="space-y-3 text-sm text-slate-700 mb-6 flex-grow">
                <li><strong className="text-slate-950">Condition:</strong> Heavily used (10-15 years at sea).</li>
                <li><strong className="text-slate-950">Cosmetics:</strong> Expect significant rust, heavy dents, and previous patches.</li>
                <li><strong className="text-slate-950">Function:</strong> Guaranteed not to leak.</li>
              </ul>
              <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 italic"><strong>Best for:</strong> Cheap, stationary dry storage.</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6"><ShieldCheck className="w-6 h-6 text-amber-600" /></div>
              <h4 className="text-xl font-black text-slate-950 mb-2">Cargo Worthy (CWO)</h4>
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-4 border-b border-slate-100 pb-4">The Structural Standard</div>
              <ul className="space-y-3 text-sm text-slate-700 mb-6 flex-grow">
                <li><strong className="text-slate-950">Condition:</strong> Used, but certified structurally sound.</li>
                <li><strong className="text-slate-950">Cosmetics:</strong> Visible surface rust, dents, and shipping logos.</li>
                <li><strong className="text-slate-950">Function:</strong> Superior structural integrity. Floors and frames are solid.</li>
              </ul>
              <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 italic"><strong>Best for:</strong> Heavy industrial storage or export.</div>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-xl text-white">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-6 border border-amber-500/30"><Star className="w-6 h-6 text-amber-500" /></div>
              <h4 className="text-xl font-black text-white mb-2">New / One-Trip</h4>
              <div className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-4 border-b border-slate-800 pb-4">Premium Quality</div>
              <ul className="space-y-3 text-sm text-slate-300 mb-6 flex-grow">
                <li><strong className="text-white">Condition:</strong> Loaded once, shipped to U.S. Essentially new.</li>
                <li><strong className="text-white">Cosmetics:</strong> Pristine exterior. Minor scuffs from forklift loading.</li>
                <li><strong className="text-white">Function:</strong> Perfect doors, flawless floors, maximum lifespan.</li>
              </ul>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg text-sm text-slate-400 italic"><strong>Best for:</strong> Clean residential properties, high-end conversions.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BIG_RENTALS_PHONE_DISPLAY = '985-898-5811';
const BIG_RENTALS_QUOTE_EMAIL = 'blauber@big.rent';

const ViewRentals = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', zip: '', product: '20_Office', duration: '' });
  const [status, setStatus] = useState('idle');
  const [logoError, setLogoError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    try {
      const leadPayload = {
        ...formData,
        formType: 'rental-quote',
        notifyEmail: BIG_RENTALS_QUOTE_EMAIL,
        bigRentalsPhone: BIG_RENTALS_PHONE_DISPLAY,
        submittedAt: serverTimestamp(),
      };

      if (db) {
        await addDoc(collection(db, 'scs_leads'), leadPayload);
      }

      // Email Big Rentals (FormSubmit - confirm the address once on first use at formsubmit.co if prompted)
      const emailBody = {
        _subject: 'Southern Container Solutions - Rental quote request',
        _template: 'table',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        zip: formData.zip,
        product: formData.product,
        duration: formData.duration,
        _captcha: false,
      };
      const fsRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(BIG_RENTALS_QUOTE_EMAIL)}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(emailBody),
      });
      if (!fsRes.ok) {
        console.warn('Quote email notify returned', fsRes.status);
      }

      setStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <div className="inline-flex items-center space-x-2 bg-slate-200 text-slate-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Commercial Leasing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-950 mb-6 uppercase tracking-tight">Need It Temporarily?</h2>
          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            Not ready to purchase an asset outright? We partner exclusively with <strong>Big Rentals</strong> to provide our premium container offices and storage units on a month-to-month basis for active job sites, temporary projects, and seasonal overflow.
          </p>

          <div className="bg-slate-950 text-white rounded-2xl p-6 md:p-8 border border-slate-800 shadow-lg mb-8">
            <p className="text-amber-500 text-xs font-black uppercase tracking-[0.2em] mb-2">Big Rentals - Get pricing now</p>
            <p className="text-lg md:text-xl font-bold text-white mb-4 leading-snug">
              Request a quote using the form, or call Big Rentals directly for immediate help.
            </p>
            <a
              href={`tel:+1${BIG_RENTALS_PHONE_DISPLAY.replace(/\D/g, '')}`}
              className="inline-flex items-center gap-3 text-2xl md:text-3xl font-black text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0" aria-hidden />
              {BIG_RENTALS_PHONE_DISPLAY}
            </a>
            <p className="text-slate-400 text-sm mt-4">
              Quote requests are sent to Big Rentals at{' '}
              <a href={`mailto:${BIG_RENTALS_QUOTE_EMAIL}`} className="text-amber-500 font-semibold hover:underline">
                {BIG_RENTALS_QUOTE_EMAIL}
              </a>
              .
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-8">
            <div className="mb-8 border-b border-slate-100 pb-6">
              {!logoError ? (
                <div className="flex flex-col items-center sm:items-start gap-3">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest w-full text-center sm:text-left">
                    Leasing partner
                  </p>
                  <img
                    src={publicUrl("big-rentals-logo.png")}
                    alt="Big Rentals — commercial equipment leasing"
                    className="h-20 sm:h-24 md:h-28 w-auto max-w-full object-contain rounded-lg shadow-md ring-1 ring-slate-200/80"
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                <div className="rounded-xl bg-slate-950 px-8 py-6 inline-block">
                  <div className="text-3xl font-black text-white tracking-tighter">
                    BIG <span className="text-red-500">RENTALS</span>
                  </div>
                </div>
              )}
            </div>
            <h3 className="text-xl font-black text-slate-950 mb-4 flex items-center">
              <Truck className="w-6 h-6 mr-3 text-amber-500" /> Fulfilled by Big Rentals
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              All rental contracts, billing, and logistics are seamlessly managed by our dedicated leasing partner, Big Rentals. You get Southern Container Solutions' build quality with flexible, short-term commercial terms.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-8 md:p-10 border border-slate-800 shadow-2xl relative h-fit">
          {status === 'success' ? (
            <div className="text-center py-16">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-3xl font-black text-white mb-2">Request Sent</h3>
              <p className="text-slate-400 mb-4">Our leasing team at Big Rentals will contact you shortly with availability and freight costs.</p>
              <p className="text-slate-500 text-sm">
                A copy was routed to <span className="text-slate-300 font-mono">{BIG_RENTALS_QUOTE_EMAIL}</span>. Need help sooner? Call{' '}
                <a href={`tel:+1${BIG_RENTALS_PHONE_DISPLAY.replace(/\D/g, '')}`} className="text-amber-400 font-bold hover:underline">
                  {BIG_RENTALS_PHONE_DISPLAY}
                </a>
                .
              </p>
            </div>
          ) : status === 'error' ? (
            <div className="text-center py-16">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-3xl font-black text-white mb-2">Submission Failed</h3>
              <p className="text-slate-400 mb-6">Something went wrong. Please try again or call us directly.</p>
              <button onClick={() => setStatus('idle')} className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded font-black transition-colors">Try Again</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-2xl font-black text-white mb-2 border-b border-slate-800 pb-4">Request a Rental Quote</h3>
              <p className="text-slate-400 text-sm mb-6">
                Submit below for a written quote, or call{' '}
                <a href={`tel:+1${BIG_RENTALS_PHONE_DISPLAY.replace(/\D/g, '')}`} className="text-amber-400 font-bold hover:underline">
                  {BIG_RENTALS_PHONE_DISPLAY}
                </a>
                .
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                  <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone</label>
                  <input required type="tel" className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email</label>
                <input required type="email" className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Delivery Zip</label>
                  <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, zip: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Est. Duration</label>
                  <select required className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, duration: e.target.value})}>
                    <option value="">Select...</option>
                    <option value="1-3 Months">1-3 Months</option>
                    <option value="3-6 Months">3-6 Months</option>
                    <option value="6-12 Months">6-12 Months</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Unit Type</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, product: e.target.value})}>
                  <option value="20_Office">20' Office Container</option>
                  <option value="40_Office">40' Office Container</option>
                  <option value="Raw_Storage">Raw Storage Container</option>
                </select>
              </div>
              <button disabled={status === 'submitting'} className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-950 py-4 rounded font-black text-lg transition-colors flex justify-center items-center">
                {status === 'submitting' ? 'Submitting...' : 'Submit to Big Rentals'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const ViewCustom = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', details: '', size: '20ft' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    try {
      if (db) {
        await addDoc(collection(db, 'scs_leads'), {
          ...formData,
          formType: 'custom-build-quote',
          submittedAt: serverTimestamp(),
        });
      }
      await sendSiteLeadEmail('Southern Container Solutions - Custom build quote', {
        formType: 'custom-build-quote',
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        size: formData.size,
        details: formData.details.trim(),
      });
      setStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen py-20 text-white animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">Need a modification? We can help.</h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Need an extra window, custom door placement, a half-bath, or an electrical upgrade? We handle straightforward modifications to our standard units to fit your exact needs. Describe your project, and we'll provide a firm quote.
          </p>
          <div className="space-y-8">
            <div className="flex">
              <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center flex-shrink-0 mr-4 border border-slate-800"><span className="font-black text-amber-500">1</span></div>
              <div><h4 className="text-xl font-bold mb-2">Submit Your Needs</h4><p className="text-slate-400">Tell us what you need added or changed from our standard layouts. We review requests daily.</p></div>
            </div>
            <div className="flex">
              <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center flex-shrink-0 mr-4 border border-slate-800"><span className="font-black text-amber-500">2</span></div>
              <div><h4 className="text-xl font-bold mb-2">Quote & Timeline</h4><p className="text-slate-400">We provide a straightforward, firm price quote and a realistic timeline for your build.</p></div>
            </div>
            <div className="flex">
              <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center flex-shrink-0 mr-4 border border-slate-800"><span className="font-black text-amber-500">3</span></div>
              <div><h4 className="text-xl font-bold mb-2">Fabrication</h4><p className="text-slate-400">Your unit is modified at our Covington facility, inspected, and shipped directly to your site.</p></div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-8 md:p-10 border border-slate-800 shadow-2xl relative">
          {status === 'success' ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-3xl font-black mb-2">Request Received</h3>
              <p className="text-slate-400">Our team will review your specs and contact you shortly.</p>
            </div>
          ) : status === 'error' ? (
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-3xl font-black mb-2">Submission Failed</h3>
              <p className="text-slate-400 mb-6">Something went wrong. Please try again or call us directly.</p>
              <button onClick={() => setStatus('idle')} className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded font-black transition-colors">Try Again</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-2xl font-black mb-6 border-b border-slate-800 pb-4">Request a Quote</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                  <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone</label>
                  <input required type="tel" className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email</label>
                <input required type="email" className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Container Size</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, size: e.target.value})}>
                  <option value="20ft">20-Foot Container</option>
                  <option value="40ft">40-Foot Container</option>
                  <option value="unsure">Not Sure Yet</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project Details</label>
                <textarea required rows="4" className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, details: e.target.value})}></textarea>
              </div>
              <button disabled={status === 'submitting'} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-4 rounded font-black text-lg transition-colors flex justify-center items-center">
                {status === 'submitting' ? 'Submitting...' : 'Submit Specs'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const ViewDelivery = () => {
  const [formData, setFormData] = useState({ email: '', product: '', address: '', type: 'Commercial', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    try {
      if (db) {
        await addDoc(collection(db, 'scs_leads'), {
          ...formData,
          formType: 'delivery-quote',
          submittedAt: serverTimestamp(),
        });
      }
      await sendSiteLeadEmail('Southern Container Solutions - Delivery quote', {
        formType: 'delivery-quote',
        email: formData.email.trim(),
        product: formData.product.trim(),
        address: formData.address.trim(),
        type: formData.type,
        message: formData.message.trim(),
      });
      setStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white py-16 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16 items-center">
          <div>
            <h2 className="text-5xl font-black text-slate-950 mb-6 uppercase tracking-tight">Delivery Made Simple</h2>
            <p className="text-slate-600 text-xl leading-relaxed mb-6">
              We ship containers anywhere in the continental United States. Delivery cost is paid directly to a third-party trucking company. We coordinate everything on your behalf.
            </p>
            <div className="inline-flex items-center bg-slate-100 text-slate-900 px-4 py-2 rounded-lg font-bold">
              <ShieldCheck className="w-5 h-5 text-amber-500 mr-2" /> No Markups. No Surprises.
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96">
            <img
              src={publicUrl("delivery-container-office.png")}
              alt="Modified office container on a flatbed trailer, ready for delivery"
              className="w-full h-full object-cover object-center"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1588636181775-654db0733a41?auto=format&fit=crop&q=80&w=1200"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white font-bold flex items-center">
              <Truck className="w-5 h-5 mr-2 text-amber-500" /> Tilt-bed delivery to your site
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-black text-slate-950 mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-amber-500" /> Site Requirements
            </h3>
            <ul className="space-y-6">
              <li className="flex flex-col">
                <span className="font-bold text-slate-900">1. Level Ground</span>
                <span className="text-slate-600 text-sm mt-1">Ground must be reasonably level to ensure doors open and close properly.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-slate-900">2. Clearance Space</span>
                <span className="text-slate-600 text-sm mt-1">Trucks need up to 100ft of straight clearance to slide a 40ft container off a tilt-bed trailer.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-slate-900">3. Overhead Clearance</span>
                <span className="text-slate-600 text-sm mt-1">Ensure no low-hanging power lines or tree branches obstruct the drop zone.</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            {status === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Quote Request Sent</h3>
                <p className="text-slate-600">We will calculate freight and contact you shortly.</p>
              </div>
            ) : status === 'error' ? (
              <div className="text-center py-12">
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Submission Failed</h3>
                <p className="text-slate-600 mb-6">Something went wrong. Please try again or call us directly.</p>
                <button onClick={() => setStatus('idle')} className="bg-slate-950 hover:bg-slate-800 text-white px-6 py-3 rounded font-bold transition-colors">Try Again</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-black mb-4">Request a Delivery Quote</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email (Required)</label>
                    <input required type="email" className="w-full bg-slate-50 border border-slate-300 rounded p-3 focus:border-amber-500 outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Product Interested In</label>
                    <select className="w-full bg-slate-50 border border-slate-300 rounded p-3 focus:border-amber-500 outline-none" onChange={e => setFormData({...formData, product: e.target.value})}>
                      <option>20' Standard Office</option>
                      <option>40' Combo Unit</option>
                      <option>Custom Build</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Delivery Address / Zip Code</label>
                  <input required type="text" className="w-full bg-slate-50 border border-slate-300 rounded p-3 focus:border-amber-500 outline-none" onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="locType" value="Commercial" defaultChecked className="text-amber-500 focus:ring-amber-500" onChange={e => setFormData({...formData, type: e.target.value})} />
                    <span className="font-bold text-sm">Commercial Address</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="locType" value="Residential" className="text-amber-500 focus:ring-amber-500" onChange={e => setFormData({...formData, type: e.target.value})} />
                    <span className="font-bold text-sm">Residential Address</span>
                  </label>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Message / Site Details</label>
                  <textarea rows="3" className="w-full bg-slate-50 border border-slate-300 rounded p-3 focus:border-amber-500 outline-none" onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                </div>
                <button type="submit" disabled={status === 'submitting'} className="bg-slate-950 hover:bg-slate-800 disabled:opacity-60 text-white px-8 py-4 rounded font-bold transition-colors">
                  {status === 'submitting' ? 'Submitting...' : 'Send Delivery Info'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ViewAbout = () => (
  <div className="min-h-screen bg-slate-50 animate-in fade-in duration-300">
    <div className="bg-slate-950 text-white py-24 px-4 text-center">
      <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase">Who We Are</h2>
      <p className="text-xl text-amber-500 font-bold max-w-2xl mx-auto">
        Your project stays simple. Your cost stays upfront. Your container shows up ready to work.
      </p>
    </div>

    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 -mt-10 relative z-10">
      <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-slate-100">
        <p className="text-lg text-slate-700 leading-relaxed mb-8">
          Southern Container Solutions builds dependable, purpose-built container offices and custom conversions for businesses, contractors, and property owners across the U.S. Our focus is simple: <span className="font-bold text-slate-950">deliver high-value units with honest pricing, solid workmanship, and fast turnaround.</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div className="flex">
            <HardHat className="w-10 h-10 text-amber-500 mr-4 flex-shrink-0" />
            <div>
              <h4 className="font-black text-slate-950 text-lg mb-2">Engineered for Durability</h4>
              <p className="text-sm text-slate-600">Every unit has insulated walls, reliable electrical systems, quality HVAC, clean finishes, and secure steel construction. We design units that hold up and stay functional for years.</p>
            </div>
          </div>
          <div className="flex">
            <BookOpen className="w-10 h-10 text-amber-500 mr-4 flex-shrink-0" />
            <div>
              <h4 className="font-black text-slate-950 text-lg mb-2">Transparent Process</h4>
              <p className="text-sm text-slate-600">Buying a container office shouldn't require endless quoting or hard-to-find pricing. Every unit is listed clearly, and you can request to purchase with transparent next steps.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-2xl font-black text-slate-950 mb-2">Need a custom modification?</h3>
            <p className="text-slate-600 text-sm mb-4 md:mb-0">Our Louisiana facility handles complex builds daily.</p>
          </div>
          <div className="flex flex-col text-right">
            <span className="font-bold text-slate-900">Covington, LA</span>
            <a href="tel:9852500708" className="text-amber-600 font-bold hover:underline">(985) 250-0708</a>
            <a href="mailto:info@southerncontainersolutions.com" className="text-slate-500 text-sm hover:text-slate-900">info@southerncontainersolutions.com</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ViewResources = ({ setView }) => {
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeArticle]);

  if (activeArticle) {
    return (
      <div className="min-h-screen bg-white py-16 animate-in fade-in duration-300">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <button
            onClick={() => setActiveArticle(null)}
            className="flex items-center text-slate-500 hover:text-amber-600 font-bold mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Resources
          </button>

          <h1 className="text-4xl md:text-6xl font-black text-slate-950 mb-6 leading-tight tracking-tight">
            {activeArticle.title}
          </h1>

          <div className="flex items-center space-x-4 mb-12 border-b border-slate-200 pb-8">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <PackageOpen className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="font-bold text-slate-950">Southern Container Solutions</div>
              <div className="text-sm text-slate-500">Resource Library</div>
            </div>
          </div>

          <article className="prose prose-lg prose-slate max-w-none">
            {activeArticle.content ? (
              activeArticle.content(setView)
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-12 text-center">
                <Wrench className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Article in Production</h3>
                <p className="text-slate-600">Our engineering team is currently updating this resource.</p>
              </div>
            )}
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-950 mb-6 uppercase tracking-tight">Container Conversion Resources</h2>
          <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
            Understanding cost, build quality, container types, and logistics helps ensure you choose the right solution and avoid common mistakes.
          </p>
        </div>

        <div className="space-y-16">
          {SEO_RESOURCES.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase border-b-2 border-amber-500 pb-2 inline-block">
                {section.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.articles.map((article, aIdx) => (
                  <div
                    key={aIdx}
                    onClick={() => setActiveArticle(article)}
                    className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-400 transition-all cursor-pointer group flex flex-col h-full"
                  >
                    <div className="flex items-start mb-4">
                      <FileText className="w-6 h-6 text-slate-400 group-hover:text-amber-500 transition-colors mr-3 flex-shrink-0" />
                      <h4 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-amber-600 transition-colors">{article.title}</h4>
                    </div>
                    <p className="text-slate-600 text-sm ml-9 flex-grow">{article.desc}</p>
                    <div className="ml-9 mt-4 text-amber-600 text-xs font-bold uppercase tracking-wider flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      Read Guide <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MASTER APP
// ==========================================
export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [inventory, setInventory] = useState(SEED_INVENTORY);
  const [isAdmin, setIsAdmin] = useState(false);

  // Anonymous auth for public form submissions + admin auth state listener
  useEffect(() => {
    if (!auth) return;
    let anonymousTimer = null;
    const unsub = onAuthStateChanged(auth, (user) => {
      if (anonymousTimer) {
        clearTimeout(anonymousTimer);
        anonymousTimer = null;
      }
      if (!user) {
        setIsAdmin(false);
        // Brief delay so email/password sign-in can set currentUser before we re-anonymize
        // (avoids a race where admin login appears to succeed but session snaps back to anonymous)
        anonymousTimer = setTimeout(async () => {
          anonymousTimer = null;
          if (!auth?.currentUser) {
            try {
              await signInAnonymously(auth);
            } catch {
              /* ignore */
            }
          }
        }, 500);
      } else {
        setIsAdmin(!user.isAnonymous);
      }
    });
    return () => {
      if (anonymousTimer) clearTimeout(anonymousTimer);
      unsub();
    };
  }, []);

  // Load inventory from Firestore; seed empty DB; restore any missing default catalog rows (e.g. 40' deleted earlier)
  const loadInventory = async () => {
    if (!db) {
      console.warn(
        "[Southern Container Solutions] Firestore is not configured (missing VITE_FIREBASE_* in build). The shop will keep bundled demo listings until Firebase is connected."
      );
      return;
    }
    try {
      const snapshot = await getDocs(collection(db, 'scs_inventory'));
      if (snapshot.empty) {
        for (const item of SEED_INVENTORY) {
          await setDoc(doc(db, 'scs_inventory', item.id), item);
        }
        setInventory([...SEED_INVENTORY]);
        return;
      }

      const existingIds = new Set(snapshot.docs.map((d) => d.id));
      for (const item of SEED_INVENTORY) {
        if (!existingIds.has(item.id)) {
          await setDoc(doc(db, 'scs_inventory', item.id), item);
        }
      }

      const after = await getDocs(collection(db, 'scs_inventory'));
      const items = after.docs.map((d) =>
        enrichInventoryFromSeed(normalizeInventoryItemFromFirestore(d.id, d.data()))
      );
      items.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
      setInventory(items);
    } catch (err) {
      console.error('Inventory load error:', err);
    }
  };

  useEffect(() => { loadInventory(); }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {currentView !== 'admin' && <Navbar currentView={currentView} setView={setCurrentView} />}

      <main className="flex-grow bg-white">
        {currentView === 'home'      && <ViewHome setView={setCurrentView} inventory={inventory} />}
        {currentView === 'shop'      && <ViewShop inventory={inventory} setView={setCurrentView} />}
        {currentView === 'raw'       && <ViewRawContainers />}
        {currentView === 'rentals'   && <ViewRentals />}
        {currentView === 'custom'    && <ViewCustom />}
        {currentView === 'delivery'  && <ViewDelivery />}
        {currentView === 'about'     && <ViewAbout />}
        {currentView === 'resources' && <ViewResources setView={setCurrentView} />}
        {currentView === 'admin'     && (
          <ViewAdmin
            isAdmin={isAdmin}
            inventory={inventory}
            onRefresh={loadInventory}
            onNavigateHome={() => setCurrentView('home')}
            onEmailAdminSignedIn={() => setIsAdmin(true)}
          />
        )}
      </main>

      {currentView !== 'admin' && (
        <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex flex-col mb-6">
                <h2 className="text-2xl font-black text-white tracking-tighter leading-none m-0">SOUTHERN</h2>
                <span className="text-[10px] font-bold text-amber-600 tracking-[0.2em] uppercase leading-none mt-1">Container Solutions</span>
              </div>
              <p className="text-sm max-w-sm mb-6 leading-relaxed">
                Premium container offices engineered for durability. Built in Covington, Louisiana, delivered nationwide.
              </p>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">A BDL Industries Company</span>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Navigation</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><button onClick={() => setCurrentView('shop')} className="hover:text-amber-500 transition-colors">Finished Offices</button></li>
                <li><button onClick={() => setCurrentView('raw')} className="hover:text-amber-500 transition-colors">Raw Containers</button></li>
                <li><button onClick={() => setCurrentView('rentals')} className="hover:text-amber-500 transition-colors">Rentals</button></li>
                <li><button onClick={() => setCurrentView('custom')} className="hover:text-amber-500 transition-colors">Custom Builds</button></li>
                <li><button onClick={() => setCurrentView('delivery')} className="hover:text-amber-500 transition-colors">Delivery Info</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0" />
                  <span className="font-medium">Covington, LA</span>
                </li>
                <li className="flex items-center font-medium">
                  <Phone className="w-5 h-5 mr-3 text-amber-500" /> (985) 250-0708
                </li>
                <li className="flex items-center font-medium break-all">
                  <Mail className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0" /> info@southerncontainersolutions.com
                </li>
              </ul>
              <button
                type="button"
                onClick={() => setCurrentView('admin')}
                className="mt-8 inline-flex items-center gap-2 text-slate-400 hover:text-amber-500 text-xs font-bold uppercase tracking-widest transition-colors border border-slate-700 hover:border-amber-500/60 rounded-lg px-4 py-2"
              >
                <Lock className="w-3.5 h-3.5" /> Admin
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
