const STATE_NAMES: Record<string, string> = {
  LA: "Louisiana",
  TX: "Texas",
  MS: "Mississippi",
  AL: "Alabama",
  FL: "Florida",
};

const CLIMATE_ANGLE: Record<string, string> = {
  "covington-la": "Northshore humidity swings and afternoon heat indexes that spike inside uninsulated trailers",
  "slidell-la": "St. Tammany Gulf humidity and hurricane-season wind exposure along the I-10/I-12 corridor",
  "mandeville-la": "Causeway corridor humidity and lake-effect heat on upscale Northshore commercial pads",
  "metairie-la": "Jefferson Parish urban heat islands and tight-lot humidity along Causeway Blvd",
  "kenner-la": "MSY aviation corridor humidity and industrial park heat near Jefferson Parish warehouses",
  "new-orleans-la": "Port of New Orleans salt air, flood-zone moisture, and CBD humidity",
  "hammond-la": "Tangipahoa Parish heat and dust from I-55 distribution center earthwork",
  "midlothian-tx": "North Texas industrial heat radiating off Midlothian cement and data-center builds",
  "tyler-tx": "East Texas humidity and heat on Tyler metro commercial expansions",
  "thibodaux-la": "Bayou humidity and Acadiana heat on Thibodaux industrial sites",
  "texas-city-tx": "Galveston Bay salt air and refinery corridor heat in Texas City",
  "temple-tx": "Central Texas heat indexes on Temple logistics and manufacturing yards",
  "st-francisville-la": "West Feliciana humidity along bluff and river staging areas",
  "ruston-la": "North Louisiana heat and humidity on Ruston commercial jobsites",
  "red-oak-tx": "DFW-adjacent heat and wind on Red Oak industrial pads",
  "prairieville-la": "Ascension Parish humidity between Baton Rouge and river corridor projects",
  "port-fourchon-la": "coastal salt air and Gulf humidity at Port Fourchon service bases",
  "port-arthur-tx": "Golden Triangle refinery heat and Sabine Pass humidity",
  "picayune-ms": "Pearl River corridor humidity and South Mississippi heat",
  "ocean-springs-ms": "Jackson County coastal humidity and Gulf breeze exposure",
  "longview-tx": "East Texas heat and humidity on Longview industrial expansions",
  "lufkin-tx": "Deep East Texas humidity on Lufkin forestry and manufacturing sites",
  "laplace-la": "St. John the Baptist river humidity on Laplace riverfront yards",
  "huntsville-al": "North Alabama humidity and heat on Huntsville aerospace-adjacent builds",
  "holly-ridge-la": "remote North Louisiana humidity on Holly Ridge staging areas",
  "hattiesburg-ms": "Pine Belt humidity and heat on Hattiesburg commercial sites",
  "gonzales-la": "Ascension Parish river humidity on Gonzales industrial corridors",
  "denham-springs-la": "Livingston Parish humidity and heat on Denham Springs infill sites",
  "decatur-al": "Tennessee Valley humidity on Decatur manufacturing yards",
  "daphne-al": "Mobile Bay humidity and Eastern Shore salt exposure",
  "canton-ms": "Madison County heat on Canton industrial and distribution sites",
  "cameron-la": "Cameron Parish coastal humidity and Gulf storm exposure",
  "caddo-la": "Shreveport-area humidity and North Louisiana heat loads",
  "bryan-tx": "Brazos Valley heat and humidity on Bryan-College Station builds",
  "bogalusa-la": "Washington Parish humidity on Bogalusa mill and industrial yards",
};

export function buildClimateSpecs(city: string, state: string, slug: string): string {
  const stateName = STATE_NAMES[state] ?? state;
  const angle =
    CLIMATE_ANGLE[slug] ??
    `${city} jobsite humidity, heat, and weather exposure typical of ${stateName} industrial corridors`;

  return `Every ${city} unit ships with 2-inch closed-cell spray foam, commercial PVC wall systems, and mini-split HVAC sized for ${angle}. We seal door and window openings to limit condensation that ruins blueprints, networking gear, and crew comfort on ${city} command centers. From summer heat advisories to sudden Gulf rain events, your ${city}, ${state} office maintains stable interior conditions that uninsulated rental trailers cannot hold through a full turnaround or capital project schedule.`;
}
