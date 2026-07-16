import {
  getAllLocationAreas,
  getAllLocationSlugs,
  normalizeLocationSlug,
} from "@/lib/locationSlugs";
import type { ServiceArea } from "@/lib/data/serviceAreas";

export type LocationSection = {
  label: string;
  slugs: string[];
};

export type LocationRegion = {
  state: string;
  stateName: string;
  sections: LocationSection[];
};

const STATE_NAMES: Record<string, string> = {
  LA: "Louisiana",
  TX: "Texas",
  MS: "Mississippi",
  AL: "Alabama",
  FL: "Florida",
};

/** Curated Gulf South groupings for the /locations directory. */
export const LOCATION_REGIONS: LocationRegion[] = [
  {
    state: "LA",
    stateName: "Louisiana",
    sections: [
      {
        label: "Northshore & Metro",
        slugs: ["covington-la", "slidell-la", "mandeville-la", "metairie-la", "kenner-la", "new-orleans-la", "hammond-la"],
      },
      {
        label: "Mississippi River Corridor",
        slugs: [
          "baton-rouge-la",
          "garyville-la",
          "reserve-la",
          "plaquemine-la",
          "luling-boutte-la",
          "st-rose-la",
          "convent-la",
          "geismar-la",
          "gonzales-la",
          "prairieville-la",
          "denham-springs-la",
          "laplace-la",
        ],
      },
      {
        label: "Lake Charles & Southwest",
        slugs: ["lake-charles-la", "sulphur-la", "cameron-la", "port-fourchon-la"],
      },
      {
        label: "Acadiana & Bayou",
        slugs: ["lafayette-la", "morgan-city-la", "houma-la", "thibodaux-la", "bogalusa-la"],
      },
      {
        label: "North Louisiana",
        slugs: ["monroe-la", "alexandria-la", "shreveport-la", "ruston-la", "caddo-la", "holly-ridge-la", "st-francisville-la"],
      },
    ],
  },
  {
    state: "TX",
    stateName: "Texas",
    sections: [
      {
        label: "Golden Triangle",
        slugs: ["beaumont-tx", "orange-tx", "nederland-tx", "port-arthur-tx"],
      },
      {
        label: "Houston Ship Channel",
        slugs: [
          "houston-tx",
          "baytown-tx",
          "pasadena-tx",
          "deer-park-tx",
          "laporte-tx",
          "channelview-tx",
          "texas-city-tx",
        ],
      },
      {
        label: "Texas Gulf Coast",
        slugs: ["freeport-tx", "corpus-christi-tx", "brownsville-tx"],
      },
      {
        label: "North & Central Texas",
        slugs: ["victoria-tx", "midlothian-tx", "red-oak-tx", "temple-tx", "bryan-tx", "tyler-tx", "longview-tx", "lufkin-tx"],
      },
    ],
  },
  {
    state: "MS",
    stateName: "Mississippi",
    sections: [
      {
        label: "Gulf Coast",
        slugs: ["gulfport-ms", "pascagoula-ms", "biloxi-ms", "bay-st-louis-ms", "ocean-springs-ms", "picayune-ms"],
      },
      {
        label: "Central Mississippi",
        slugs: ["jackson-ms", "columbus-ms", "canton-ms", "hattiesburg-ms"],
      },
    ],
  },
  {
    state: "AL",
    stateName: "Alabama",
    sections: [
      {
        label: "Gulf Coast",
        slugs: ["mobile-al", "theodore-al", "daphne-al"],
      },
      {
        label: "North Alabama",
        slugs: ["huntsville-al", "decatur-al"],
      },
    ],
  },
  {
    state: "FL",
    stateName: "Florida",
    sections: [
      {
        label: "Florida Panhandle",
        slugs: ["pensacola-fl", "panama-city-fl"],
      },
    ],
  },
];

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
