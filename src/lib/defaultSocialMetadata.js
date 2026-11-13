/** Default Open Graph / Twitter image (hero product photo). */
export const DEFAULT_OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Southern Container Solutions shipping container office and storage combo at a jobsite",
};

export const defaultOpenGraph = {
  type: "website",
  siteName: "Southern Container Solutions",
  images: [DEFAULT_OG_IMAGE],
};

export const defaultTwitter = {
  card: "summary_large_image",
  images: [DEFAULT_OG_IMAGE.url],
};
