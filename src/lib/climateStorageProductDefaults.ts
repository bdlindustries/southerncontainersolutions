const CLIMATE_20_ID = "T9zMYdawbuAyL4Lh9Mq1";
const CLIMATE_20_SLUG = "scs-20-climate-storage";

const CLIMATE_20_LISTING_FEATURES = [
  'Insulation\n2" closed-cell spray foam insulation for temperature and humidity control.',
  "Climate control\n12,000 BTU LG mini split heat pump (AC & heat) with dedicated surge protection.",
  "Electrical\nJobsite breaker panel, 1 interior outlet, and 1 exterior GFCI outlet.",
  "Lighting\n1 interior LED light.",
  "Cargo access\nOriginal operational cargo doors for loading and securing stored goods.",
];

const CLIMATE_20_FEATURES = [
  '2" closed-cell spray foam insulation',
  "12,000 BTU LG mini split (AC & heat)",
  "Jobsite breaker panel",
  "1 interior outlet",
  "1 exterior GFCI outlet",
  "1 interior LED light",
  "Operational cargo doors",
];

const CLIMATE_20_GALLERY_NOTE =
  "Photos shown may be from a representative build. Your 20' climate controlled storage container matches the specifications listed on this page.";

export function enrichClimateStorageListing<T extends { id?: string; slug?: string }>(item: T): T {
  if (!item?.id) return item;
  const slug = typeof item.slug === "string" ? item.slug.trim() : "";
  const is20Climate = item.id === CLIMATE_20_ID || slug === CLIMATE_20_SLUG;
  if (!is20Climate) return item;

  const raw = item as { listingFeatures?: unknown; features?: string[]; imageGalleryNote?: string };
  const hasListingFeatures =
    Array.isArray(raw.listingFeatures) && raw.listingFeatures.length > 0;

  return {
    ...item,
    listingFeatures: hasListingFeatures
      ? (raw.listingFeatures as string[])
      : CLIMATE_20_LISTING_FEATURES,
    features: CLIMATE_20_FEATURES,
    imageGalleryNote: CLIMATE_20_GALLERY_NOTE,
  };
}