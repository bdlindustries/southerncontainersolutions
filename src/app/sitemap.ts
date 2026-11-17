import type { MetadataRoute } from "next";
import { getLiveInventory } from "@/lib/firebase";
import { getProductPathSlug } from "@/lib/data";
import { getAllLocationSlugs, normalizeLocationSlug } from "@/lib/locationSlugs";
import { RESOURCE_ARTICLE_SLUGS, absoluteUrl } from "@/lib/siteUrl";
import {
  lastModForPath,
  LOCATION_HUB_LAST_MOD,
} from "@/lib/sitemapLastMod";

const CORE_PATHS = [
  "/",
  "/shop",
  "/raw",
  "/rentals",
  "/custom-builds",
  "/delivery",
  "/contact",
  "/faq",
  "/gallery",
  "/privacy",
  "/terms",
  "/about",
  "/resources",
  "/locations",
] as const;

function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly",
  lastModified?: Date
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: lastModified ?? lastModForPath(path),
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const inventory = await getLiveInventory();
  const productBuildTime = new Date();

  const productEntries: MetadataRoute.Sitemap = inventory.map((product) =>
    entry(`/shop/${getProductPathSlug(product)}`, 0.9, "daily", productBuildTime)
  );

  const locationEntries: MetadataRoute.Sitemap = getAllLocationSlugs().map(
    (slug) => {
      const canonicalSlug = normalizeLocationSlug(slug);
      return entry(
        `/locations/${canonicalSlug}`,
        0.8,
        "monthly",
        new Date(`${LOCATION_HUB_LAST_MOD}T00:00:00.000Z`)
      );
    }
  );

  const resourceEntries: MetadataRoute.Sitemap = RESOURCE_ARTICLE_SLUGS.map(
    (slug) => entry(`/resources/${slug}`, 0.7, "monthly")
  );

  return [
    ...CORE_PATHS.map((path) => {
      const freq =
        path === "/shop"
          ? "daily"
          : path === "/raw"
            ? "daily"
            : path === "/" || path === "/custom-builds"
              ? "weekly"
              : path === "/delivery" || path === "/about"
                ? "monthly"
                : "weekly";
      const priority =
        path === "/shop" || path === "/custom-builds"
          ? 1.0
          : path === "/"
            ? 0.9
            : 0.6;
      return entry(path, priority, freq);
    }),
    ...productEntries,
    ...locationEntries,
    ...resourceEntries,
  ];
}
