/** Canonical production origin (apex, no trailing slash). */
export const SITE_URL = "https://southerncontainersolutions.com";

/** Build an absolute URL from a site path (`/shop`, `/locations/houma-la`). */
export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

/** Resource article path segments under `/resources`. */
export const RESOURCE_ARTICLE_SLUGS = [
  "container-condensation",
  "site-prep-delivery",
  "industrial-jobsite-offices",
  "petrochemical-turnaround-trailers",
  "urban-jobsite-theft-prevention",
  "civil-dirt-work-offices",
] as const;
