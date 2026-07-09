import type { MetadataRoute } from "next";
import { getLiveInventory } from "@/lib/firebase";

const BASE_URL = "https://www.southerncontainersolutions.com";

/** All 33 Gulf South service area slugs (canonical path uses top-level route when mapped). */
const SERVICE_AREA_SLUGS = [
  "covington-la",
  "beaumont-tx",
  "orange-tx",
  "freeport-tx",
  "houston-tx",
  "corpus-christi-tx",
  "victoria-tx",
  "brownsville-tx",
  "baytown-tx",
  "pasadena-tx",
  "deer-park-tx",
  "laporte-tx",
  "channelview-tx",
  "lake-charles-la",
  "sulphur-la",
  "baton-rouge-la",
  "garyville-la",
  "reserve-la",
  "plaquemine-la",
  "luling-boutte-la",
  "convent-la",
  "jackson-ms",
  "columbus-ms",
  "monroe-la",
  "alexandria-la",
  "shreveport-la",
  "gulfport-ms",
  "pascagoula-ms",
  "mobile-al",
  "morgan-city-la",
  "houma-la",
  "lafayette-la",
  "geismar-la",
] as const;

/** Top-level city landing pages (canonical URLs for five service areas). */
const TOP_LEVEL_CITY_PATHS = [
  "/gulfport-ms",
  "/pascagoula-ms",
  "/mobile-al",
  "/morgan-city-la",
  "/geismar-la",
] as const;

const TOP_LEVEL_SLUG_BY_PATH: Record<(typeof TOP_LEVEL_CITY_PATHS)[number], string> = {
  "/gulfport-ms": "gulfport-ms",
  "/pascagoula-ms": "pascagoula-ms",
  "/mobile-al": "mobile-al",
  "/morgan-city-la": "morgan-city-la",
  "/geismar-la": "geismar-la",
};

function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly"
): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const inventory = await getLiveInventory();

  const productEntries: MetadataRoute.Sitemap = inventory.map((product) =>
    entry(`/shop/${product.id}`, 0.9, "daily")
  );

  const topLevelSlugSet = new Set(Object.values(TOP_LEVEL_SLUG_BY_PATH));

  const serviceAreaEntries: MetadataRoute.Sitemap = SERVICE_AREA_SLUGS.filter(
    (slug) => !topLevelSlugSet.has(slug)
  ).map((slug) => entry(`/service-areas/${slug}`, 0.8));

  const topLevelCityEntries: MetadataRoute.Sitemap = TOP_LEVEL_CITY_PATHS.map((path) =>
    entry(path, 0.8)
  );

  return [
    entry("/", 0.9, "weekly"),
    entry("/shop", 1.0, "daily"),
    entry("/raw", 0.7, "daily"),
    entry("/rentals", 0.6, "weekly"),
    entry("/custom-builds", 1.0, "weekly"),
    entry("/delivery", 0.6, "monthly"),
    entry("/about", 0.6, "monthly"),
    entry("/resources", 0.6, "weekly"),
    ...productEntries,
    ...serviceAreaEntries,
    ...topLevelCityEntries,
  ];
}
