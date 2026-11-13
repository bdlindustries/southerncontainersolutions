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

function resolveProductImages(product) {
  return listingImageUrls(product)
    .map((url) => {
      if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
      }
      return absoluteUrl(url.startsWith("/") ? url : `/${url}`);
    })
    .filter(Boolean);
}

/** Product + Offer JSON-LD for shop detail pages that display a price. */
export function buildShopProductJsonLd(product) {
  const price = parseProductPrice(product);
  if (price == null) return null;

  const slug = getProductPathSlug(product);
  const images = resolveProductImages(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
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

  if (images.length === 1) {
    jsonLd.image = images[0];
  } else if (images.length > 1) {
    jsonLd.image = images;
  }

  return jsonLd;
}
