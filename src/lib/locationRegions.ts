export type LocationSection = {
  label: string;
  slugs: string[];
};

export type LocationRegion = {
  state: string;
  stateName: string;
  sections: LocationSection[];
};

/** Curated Gulf South groupings for the /locations directory and nearby-city links. */
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
        slugs: ["lafayette-la", "new-iberia-la", "morgan-city-la", "houma-la", "thibodaux-la", "bogalusa-la"],
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
        slugs: ["galveston-tx", "freeport-tx", "corpus-christi-tx", "brownsville-tx"],
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
