/**
 * Known content revision dates for sitemap `lastmod` (UTC calendar dates).
 * Add entries when pages are materially updated.
 */
export const SITEMAP_LAST_MOD: Record<string, string> = {
  "/": "2026-01-15",
  "/shop": "2026-09-29",
  "/raw": "2026-09-29",
  "/rentals": "2026-09-29",
  "/custom-builds": "2026-01-15",
  "/delivery": "2026-01-15",
  "/contact": "2026-11-16",
  "/faq": "2026-11-16",
  "/gallery": "2026-11-16",
  "/privacy": "2026-11-16",
  "/terms": "2026-11-16",
  "/about": "2026-01-15",
  "/resources": "2026-07-22",
  "/locations": "2026-09-29",
  "/resources/container-condensation": "2026-03-01",
  "/resources/site-prep-delivery": "2026-03-01",
  "/resources/industrial-jobsite-offices": "2026-03-01",
  "/resources/petrochemical-turnaround-trailers": "2026-07-22",
  "/resources/urban-jobsite-theft-prevention": "2026-07-22",
  "/resources/civil-dirt-work-offices": "2026-07-22",
};

/** Default lastmod for `/locations/[city]` hub pages (legacy + service area rollout). */
export const LOCATION_HUB_LAST_MOD = "2026-06-18";

export function lastModForPath(path: string): Date {
  const iso = SITEMAP_LAST_MOD[path];
  return iso ? new Date(`${iso}T00:00:00.000Z`) : new Date();
}
