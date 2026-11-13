import { getProductPathSlug, listingImageUrls } from "@/lib/data";
import { SITE_URL, absoluteUrl } from "@/lib/siteUrl";

function parseProductPrice(product) {
  if (typeof product?.price === "number" && !Number.isNaN(product.price)) {
    return product.price;
  }
  const str = product?.priceStr || "";
  const normalized = String(str).replace(/[^\d.]/g, "");
  const value = parseFloat(normalized);
  return Number.isFinite(value) ? value : null;
}

function availabilityToSchema(availability) {
  const text = String(availability || "").toLowerCase();
  if (text.includes("stock") && !text.includes("build")) {
    return "https://schema.org/InStock";
  }
  if (text.includes("order") || text.includes("lead") || text.includes("build")) {
    return "https://schema.org/PreOrder";
  }
  return "https://schema.org/InStock";
}

function resolveProductImage(product) {
  const urls = listingImageUrls(product);
  const first = urls[0];
  if (!first) {
    return absoluteUrl("/og-image.jpg");
  }
  if (first.startsWith("http://") || first.startsWith("https://")) {
    return first;
  }
  return absoluteUrl(first.startsWith("/") ? first : `/${first}`);
}

/** Product + Offer JSON-LD for shop detail pages that display a price. */
export function buildShopProductJsonLd(product) {
  const price = parseProductPrice(product);
  if (price == null) return null;

  const slug = getProductPathSlug(product);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: resolveProductImage(product),
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/shop/${slug}`),
      price: price.toFixed(2),
      priceCurrency: "USD",
      availability: availabilityToSchema(product.availability),
      seller: {
        "@type": "Organization",
        name: "Southern Container Solutions",
        url: SITE_URL,
      },
    },
  };
}
