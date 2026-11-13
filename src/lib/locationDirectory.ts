import {
  getAllLocationAreas,
  getAllLocationSlugs,
  normalizeLocationSlug,
} from "@/lib/locationSlugs";
import type { ServiceArea } from "@/lib/data/serviceAreas";
import { LOCATION_REGIONS } from "@/lib/locationRegions";

export { LOCATION_REGIONS } from "@/lib/locationRegions";
export type { LocationRegion, LocationSection } from "@/lib/locationRegions";

const STATE_NAMES: Record<string, string> = {
  LA: "Louisiana",
  TX: "Texas",
  MS: "Mississippi",
  AL: "Alabama",
  FL: "Florida",
};

const areaBySlug = new Map(
  getAllLocationAreas().map((area) => [normalizeLocationSlug(area.slug), area])
);

export type LocationSectionWithAreas = {
  label: string;
  areas: ServiceArea[];
};

export type LocationRegionWithAreas = {
  state: string;
  stateName: string;
  sections: LocationSectionWithAreas[];
};

function uniqueAreas(areas: ServiceArea[]): ServiceArea[] {
  const seen = new Set<string>();
  return areas.filter((area) => {
    const key = normalizeLocationSlug(area.slug);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function getLocationDirectory(): LocationRegionWithAreas[] {
  const assignedSlugs = new Set<string>();

  const curatedRegions = LOCATION_REGIONS.map((region) => ({
    state: region.state,
    stateName: region.stateName,
    sections: region.sections
      .map((section) => {
        const areas = uniqueAreas(
          section.slugs
            .map((slug) => areaBySlug.get(normalizeLocationSlug(slug)))
            .filter((area): area is ServiceArea => Boolean(area))
        );

        areas.forEach((area) => assignedSlugs.add(normalizeLocationSlug(area.slug)));

        return {
          label: section.label,
          areas,
        };
      })
      .filter((section) => section.areas.length > 0),
  })).filter((region) => region.sections.length > 0);

  const unassignedByState = new Map<string, ServiceArea[]>();

  for (const slug of getAllLocationSlugs()) {
    const normalized = normalizeLocationSlug(slug);
    if (assignedSlugs.has(normalized)) continue;

    const area = areaBySlug.get(normalized);
    if (!area) continue;

    const bucket = unassignedByState.get(area.state) ?? [];
    bucket.push(area);
    unassignedByState.set(area.state, bucket);
  }

  for (const [state, areas] of unassignedByState.entries()) {
    if (!areas.length) continue;

    const sortedAreas = [...areas].sort((a, b) => a.city.localeCompare(b.city, "en"));
    const existingRegion = curatedRegions.find((region) => region.state === state);

    const overflowSection = {
      label: "Additional Markets",
      areas: sortedAreas,
    };

    if (existingRegion) {
      existingRegion.sections.push(overflowSection);
    } else {
      curatedRegions.push({
        state,
        stateName: STATE_NAMES[state] ?? state,
        sections: [overflowSection],
      });
    }
  }

  return curatedRegions.sort((a, b) => a.stateName.localeCompare(b.stateName, "en"));
}

export function getLocationHref(area: ServiceArea): string {
  return `/locations/${normalizeLocationSlug(area.slug)}`;
}
