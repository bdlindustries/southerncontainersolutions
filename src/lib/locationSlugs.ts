import {
  getAllServiceAreaSlugs,
  getServiceAreaBySlug,
  enrichServiceArea,
  type ServiceArea,
} from "@/lib/data/serviceAreas";
import { buildClimateSpecs } from "@/lib/serviceAreaClimate";

/** Legacy static location pages from the previous site (public/locations/*.html). */
export const LEGACY_LOCATION_SLUGS = [
  "baton-rouge-la",
  "bay-st-louis-ms",
  "baytown-tx",
  "beaumont-tx",
  "biloxi-ms",
  "bogalusa-la",
  "bryan-tx",
  "caddo-la",
  "cameron-la",
  "canton-ms",
  "columbus-ms",
  "covington-la",
  "daphne-al",
  "decatur-al",
  "denham-springs-la",
  "geismar-la",
  "gonzales-la",
  "gulfport-ms",
  "hammond-la",
  "hattiesburg-ms",
  "holly-ridge-la",
  "houma-la",
  "houston-tx",
  "huntsville-al",
  "jackson-ms",
  "kenner-la",
  "lafayette-la",
  "lake-charles-la",
  "laplace-la",
  "longview-tx",
  "lufkin-tx",
  "mandeville-la",
  "metairie-la",
  "midlothian-tx",
  "mobile-al",
  "monroe-la",
  "new-orleans-la",
  "ocean-springs-ms",
  "orange-tx",
  "pasadena-tx",
  "pascagoula-ms",
  "picayune-ms",
  "port-arthur-tx",
  "port-fourchon-la",
  "prairieville-la",
  "red-oak-tx",
  "ruston-la",
  "shreveport-la",
  "slidell-la",
  "st-francisville-la",
  "sulphur-la",
  "temple-tx",
  "texas-city-tx",
  "thibodaux-la",
  "tyler-tx",
] as const;

/** Alternate slug shapes that should resolve to the same location page. */
const SLUG_ALIASES: Record<string, string> = {
  "bay-st.-louis-ms": "bay-st-louis-ms",
  "st.-francisville-la": "st-francisville-la",
};

function capitalize(word: string): string {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/** Normalize legacy filenames (e.g. bay-st.-louis-ms) to canonical slugs. */
export function normalizeLocationSlug(slug: string): string {
  const lowered = slug.toLowerCase().trim();
  const aliased = SLUG_ALIASES[lowered] ?? lowered;
  return aliased.replace(/\./g, "");
}

function formatCityName(cityPart: string): string {
  const parts = cityPart.split("-");

  if (cityPart === "luling-boutte") return "Luling and Boutte";

  const words: string[] = [];
  for (let i = 0; i < parts.length; i += 1) {
    if (parts[i] === "st" && i + 1 < parts.length) {
      words.push(`St. ${capitalize(parts[i + 1])}`);
      i += 1;
    } else {
      words.push(capitalize(parts[i]));
    }
  }

  return words.join(" ");
}

export function parseCityStateFromSlug(slug: string): { city: string; state: string } | null {
  const normalized = normalizeLocationSlug(slug);
  const match = normalized.match(/^(.+)-([a-z]{2})$/);
  if (!match) return null;

  const [, cityPart, state] = match;
  return {
    city: formatCityName(cityPart),
    state: state.toUpperCase(),
  };
}

function createLegacyServiceArea(slug: string): ServiceArea | null {
  const parsed = parseCityStateFromSlug(slug);
  if (!parsed) return null;

  const { city, state } = parsed;

  return enrichServiceArea({
    slug,
    city,
    state,
    heroHeadline: `Commercial Jobsite Office Containers in ${city}, ${state}`,
    heroSub: `Turnkey 20' and 40' ground-level mobile offices delivered to ${city}, ${state} jobsites and commercial projects.`,
    localIndustryFocus: `Southern Container Solutions delivers commercial-grade, climate-controlled container offices built for ${city}, ${state} contractors. Our 20' and 40' steel-framed units provide secure, ground-level workspace for project managers, engineers, and crews without the OSHA trip hazards of traditional trailers on active ${city} industrial sites.`,
    localDeliveryLogistics: `We dispatch from our Covington, Louisiana yard with winch-loaded trucks, dropping your office container ground-level at your ${city} jobsite on dirt, gravel, or asphalt, ready for power connection without blocking packages or trailer stair towers.`,
    localClimateSpecs: buildClimateSpecs(city, state, slug),
    image: "/images/jobsite-office-container.png",
  });
}

/** Every canonical /locations/[city] slug (service areas + legacy pages). */
export function getAllLocationSlugs(): string[] {
  const slugs = new Set<string>([
    ...getAllServiceAreaSlugs(),
    ...LEGACY_LOCATION_SLUGS,
  ]);

  return [...slugs].sort((a, b) => a.localeCompare(b, "en"));
}

/** Resolve a /locations/[city] param to a renderable service area record. */
export function resolveLocationArea(rawSlug: string): ServiceArea | undefined {
  const slug = normalizeLocationSlug(rawSlug);

  const existing = getServiceAreaBySlug(slug);
  if (existing) return existing;

  return createLegacyServiceArea(slug) ?? undefined;
}

export function getAllLocationAreas(): ServiceArea[] {
  return getAllLocationSlugs()
    .map((slug) => resolveLocationArea(slug))
    .filter((area): area is ServiceArea => Boolean(area));
}
