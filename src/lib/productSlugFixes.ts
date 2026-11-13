/** Firestore doc IDs that need readable shop slugs (and 301 sources). */
export const LEGACY_SHOP_SLUG_BY_DOC_ID: Record<string, string> = {
  C2k0uxNu5N8fNWRdGaTC: "scs-40-climate-storage",
  T9zMYdawbuAyL4Lh9Mq1: "scs-20-climate-storage",
};

export const LEGACY_SHOP_REDIRECTS = Object.entries(LEGACY_SHOP_SLUG_BY_DOC_ID).map(
  ([docId, slug]) => ({
    source: `/shop/${docId}`,
    destination: `/shop/${slug}`,
  })
);

export function applyLegacyProductSlug(item: { id?: string; slug?: string }) {
  if (!item?.id) return item;
  if (item.slug && item.slug.trim()) return item;
  const fixed = LEGACY_SHOP_SLUG_BY_DOC_ID[item.id];
  if (!fixed) return item;
  return { ...item, slug: fixed };
}
