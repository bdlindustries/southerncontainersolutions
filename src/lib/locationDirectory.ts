import { serviceAreas, type ServiceArea } from "@/lib/data/serviceAreas";

export type LocationSection = {
  label: string;
  slugs: string[];
};

export type LocationRegion = {
  state: string;
  stateName: string;
  sections: LocationSection[];
};

/** Curated Gulf South groupings for the /locations directory. */
export const LOCATION_REGIONS: LocationRegion[] = [
  {
    state: "LA",
    stateName: "Louisiana",
    sections: [
      {
        label: "Northshore & Metro",
        slugs: ["covington-la", "slidell-la"],
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
        ],
      },
      {
        label: "Lake Charles & Southwest",
        slugs: ["lake-charles-la", "sulphur-la"],
      },
      {
        label: "Acadiana & Bayou",
        slugs: ["lafayette-la", "morgan-city-la", "houma-la"],
      },
      {
        label: "North Louisiana",
        slugs: ["monroe-la", "alexandria-la", "shreveport-la"],
      },
    ],
  },
  {
    state: "TX",
    stateName: "Texas",
    sections: [
      {
        label: "Golden Triangle",
        slugs: ["beaumont-tx", "orange-tx", "nederland-tx"],
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
        ],
      },
      {
        label: "Texas Gulf Coast",
        slugs: ["freeport-tx", "corpus-christi-tx", "brownsville-tx"],
      },
      {
        label: "Inland Texas",
        slugs: ["victoria-tx"],
      },
    ],
  },
  {
    state: "MS",
    stateName: "Mississippi",
    sections: [
      {
        label: "Gulf Coast",
        slugs: ["gulfport-ms", "pascagoula-ms", "biloxi-ms", "bay-st-louis-ms"],
      },
      {
        label: "Central Mississippi",
        slugs: ["jackson-ms", "columbus-ms"],
      },
    ],
  },
  {
    state: "AL",
    stateName: "Alabama",
    sections: [
      {
        label: "Gulf Coast",
        slugs: ["mobile-al", "theodore-al"],
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

const areaBySlug = new Map(serviceAreas.map((area) => [area.slug, area]));

export type LocationSectionWithAreas = {
  label: string;
  areas: ServiceArea[];
};

export type LocationRegionWithAreas = {
  state: string;
  stateName: string;
  sections: LocationSectionWithAreas[];
};

export function getLocationDirectory(): LocationRegionWithAreas[] {
  return LOCATION_REGIONS.map((region) => ({
    state: region.state,
    stateName: region.stateName,
    sections: region.sections
      .map((section) => ({
        label: section.label,
        areas: section.slugs
          .map((slug) => areaBySlug.get(slug))
          .filter((area): area is ServiceArea => Boolean(area)),
      }))
      .filter((section) => section.areas.length > 0),
  })).filter((region) => region.sections.length > 0);
}

export function getLocationHref(area: ServiceArea): string {
  return `/locations/${area.slug}`;
}
