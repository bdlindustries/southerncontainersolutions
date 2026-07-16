const STATE_NAMES = {
  LA: "Louisiana",
  TX: "Texas",
  MS: "Mississippi",
  AL: "Alabama",
};

/** City-specific industrial verticals for localized keyword injection. */
const CITY_INDUSTRIES = {
  "covington-la": [
    "Northshore commercial construction",
    "New Orleans metro industrial staging",
    "regional distribution and fabrication yards",
  ],
  "beaumont-tx": [
    "Golden Triangle refinery turnarounds",
    "LNG capital projects",
    "petrochemical mega-project staging",
  ],
  "orange-tx": [
    "Golden Triangle shipbuilding",
    "marine fabrication",
    "petrochemical expansions",
  ],
  "freeport-tx": [
    "LNG export terminals",
    "deepwater port logistics",
    "chemical plant expansions",
  ],
  "houston-tx": [
    "Houston Ship Channel logistics",
    "petrochemical mega-projects",
    "Ship Channel turnaround staging",
  ],
  "corpus-christi-tx": [
    "Port of Corpus Christi exports",
    "coastal refinery expansions",
    "crude and LNG terminal staging",
  ],
  "victoria-tx": [
    "inland manufacturing hubs",
    "regional logistics centers",
    "Gulf Coast supply-chain staging",
  ],
  "brownsville-tx": [
    "Port of Brownsville LNG projects",
    "aerospace infrastructure",
    "South Texas coastal manufacturing",
  ],
  "baytown-tx": [
    "Ship Channel petrochemical complexes",
    "refinery turnaround offices",
    "ExxonMobil corridor mega-projects",
  ],
  "pasadena-tx": [
    "Ship Channel petrochemical plants",
    "refinery turnaround command centers",
    "industrial construction mega-projects",
  ],
  "deer-park-tx": [
    "Ship Channel chemical manufacturing",
    "refinery and terminal staging",
    "heavy industrial contractor mobilization",
  ],
  "laporte-tx": [
    "Ship Channel industrial parks",
    "Bayport terminal logistics",
    "petrochemical construction staging",
  ],
  "channelview-tx": [
    "Ship Channel refining operations",
    "terminal and pipeline construction",
    "mega-project jobsite offices",
  ],
  "lake-charles-la": [
    "SW Louisiana petrochemical expansions",
    "LNG export terminal staging",
    "Calcasieu Parish industrial turnarounds",
  ],
  "sulphur-la": [
    "petrochemical and refining operations",
    "industrial turnaround staging",
    "Calcasieu corridor mega-projects",
  ],
  "baton-rouge-la": [
    "Mississippi River chemical corridor",
    "refinery and petrochemical turnarounds",
    "Capital Region mega-project offices",
  ],
  "garyville-la": [
    "River Parish refinery operations",
    "chemical plant turnarounds",
    "Ascension and St. John industrial staging",
  ],
  "reserve-la": [
    "River Parish petrochemical facilities",
    "plant gate turnaround staging",
    "heavy industrial contractor offices",
  ],
  "plaquemine-la": [
    "Iberville Parish chemical manufacturing",
    "Mississippi River industrial complexes",
    "plant expansion mega-projects",
  ],
  "luling-boutte-la": [
    "St. Charles Parish industrial construction",
    "Mississippi River corridor staging",
    "petrochemical contractor mobilization",
  ],
  "convent-la": [
    "River Parish chemical plants",
    "industrial turnaround offices",
    "Ascension Parish mega-project staging",
  ],
  "jackson-ms": [
    "central Mississippi commercial construction",
    "industrial distribution hubs",
    "regional mega-project staging",
  ],
  "columbus-ms": [
    "Golden Triangle manufacturing",
    "steel and aerospace supplier staging",
    "east Mississippi industrial projects",
  ],
  "monroe-la": [
    "north Louisiana manufacturing",
    "data center and mega-project staging",
    "regional industrial construction",
  ],
  "alexandria-la": [
    "central Louisiana industrial hubs",
    "manufacturing and logistics staging",
    "regional commercial mega-projects",
  ],
  "shreveport-la": [
    "northwest Louisiana manufacturing",
    "logistics and industrial construction",
    "regional mega-project mobilization",
  ],
  "gulfport-ms": [
    "Mississippi Gulf Coast port logistics",
    "maritime and commercial construction",
    "Harrison County industrial staging",
  ],
  "pascagoula-ms": [
    "Pascagoula shipyard turnarounds",
    "maritime fabrication",
    "Jackson County industrial mega-projects",
  ],
  "mobile-al": [
    "Port of Mobile maritime commerce",
    "shipbuilding and terminal logistics",
    "Alabama Gulf Coast industrial staging",
  ],
  "morgan-city-la": [
    "offshore marine fabrication",
    "shipyard and port logistics",
    "St. Mary Parish industrial staging",
  ],
  "houma-la": [
    "offshore oil and gas support",
    "shipbuilding and coastal restoration",
    "Terrebonne Parish maritime projects",
  ],
  "lafayette-la": [
    "Acadiana energy sector staging",
    "oil and gas contractor mobilization",
    "Hub City commercial mega-projects",
  ],
  "geismar-la": [
    "Ascension Parish chemical plants",
    "refinery and petrochemical turnarounds",
    "Mississippi River mega-project offices",
  ],
};

const STATE_INDUSTRIES = {
  LA: [
    "petrochemical complexes",
    "refinery turnarounds",
    "Mississippi River chemical corridor mega-projects",
    "offshore and maritime support staging",
  ],
  TX: [
    "petrochemical and LNG export facilities",
    "Houston Ship Channel logistics",
    "refinery turnarounds",
    "Gulf Coast mega-project construction",
  ],
  MS: [
    "shipbuilding and maritime fabrication",
    "port-adjacent industrial yards",
    "coastal mega-project staging",
  ],
  AL: [
    "maritime commerce",
    "shipbuilding yards",
    "port logistics",
    "coastal industrial construction",
  ],
};

const STATE_CLIMATE = {
  LA: {
    headline:
      "humid subtropical heat, heavy Gulf rainfall, and hurricane-season wind loads",
    specs: [
      "2-inch closed-cell spray foam insulation rated for Louisiana's extreme humidity and sustained 95°F+ summer heat indexes",
      "Commercial-grade PVC interior wall systems that resist mold, moisture intrusion, and condensation common on Louisiana jobsites",
      "Corten steel exteriors and reinforced door frames spec'd for Gulf Coast storm exposure and industrial yard traffic",
      "HVAC sizing calibrated for dehumidification during Louisiana's wet season, keeping blueprints, servers, and crew comfortable year-round",
    ],
    closing:
      "From Baton Rouge chemical corridors to coastal shipyards, our container offices maintain stable interior temperatures when Louisiana weather swings from torrential rain to blistering heat, without the condensation failures that ruin equipment in standard trailers.",
  },
  TX: {
    headline:
      "extreme Gulf Coast heat, coastal humidity, and high-wind industrial corridors",
    specs: [
      "Closed-cell spray foam thermal barriers engineered for Texas summer heat loads and radiant jobsite temperatures",
      "Wind-resistant steel construction suited to exposed petrochemical yards, LNG terminals, and Ship Channel staging areas",
      "Moisture-managed interior envelopes that combat Texas Gulf humidity without the mold risk of fiberglass trailer insulation",
      "Commercial PVC finishes and sealed window/door packages built for dust, salt air, and heavy equipment vibration on Texas mega-projects",
    ],
    closing:
      "Whether your command center sits on a Pasadena turnaround pad or a Corpus Christi export terminal, our climate packages keep site managers productive through Texas heat advisories and coastal weather events that shut down uninsulated trailers.",
  },
  MS: {
    headline:
      "Gulf humidity, shipyard salt exposure, and hurricane-season coastal conditions",
    specs: [
      "Spray foam insulation systems tuned for Mississippi's persistent coastal humidity and high dew points",
      "Steel container shells that outperform wood-frame trailers in shipyard environments with salt air and heavy lift traffic",
      "Condensation-resistant interior spec aligned with maritime and industrial jobsite standards across Jackson and Gulf Coast counties",
      "Secure, weather-tight lockbox and door assemblies for MS yards where wind-driven rain is a daily operational concern",
    ],
    closing:
      "From Pascagoula shipbuilding turnarounds to Gulfport port logistics, our units deliver reliable climate control when Mississippi weather pushes standard mobile offices past their limits.",
  },
  AL: {
    headline:
      "Mobile Bay salt air, coastal humidity, and Gulf hurricane exposure",
    specs: [
      "Closed-cell foam insulation packages designed for Alabama's humid subtropical climate and coastal industrial zones",
      "Marine-adjacent durability spec for port gates, shipbuilding yards, and terminal staging across the Alabama Gulf Coast",
      "Commercial PVC interiors that resist moisture and maintain air quality in enclosed command centers during long turnaround shifts",
      "Ground-level steel footprints that eliminate trailer stairs while providing stable, insulated workspaces in high-wind coastal corridors",
    ],
    closing:
      "Alabama maritime and petrochemical contractors rely on our container offices when Port of Mobile weather and industrial site conditions demand more than a rental trailer can deliver.",
  },
};

function getIndustries(slug, city, state) {
  const cityList = CITY_INDUSTRIES[slug];
  if (cityList) return cityList;
  const stateList = STATE_INDUSTRIES[state] ?? STATE_INDUSTRIES.LA;
  return [
    `${city} industrial construction`,
    ...stateList.slice(0, 2),
  ];
}

function formatIndustryPhrase(industries) {
  if (industries.length === 1) return industries[0];
  if (industries.length === 2) return `${industries[0]} and ${industries[1]}`;
  return `${industries.slice(0, -1).join(", ")}, and ${industries[industries.length - 1]}`;
}

export function getImageAlt(city, state) {
  return `40ft mobile office container delivered to ${city}, ${state} jobsite`;
}

export function getLocalDeliveryContent(area) {
  const { city, state, slug, logistics } = area;
  const stateName = STATE_NAMES[state] ?? state;
  const industries = getIndustries(slug, city, state);
  const industryPhrase = formatIndustryPhrase(industries);

  return [
    logistics,
    `Southern Container Solutions coordinates local delivery and logistics in ${city} for contractors managing ${industryPhrase}. Our Covington, Louisiana fabrication yard dispatches winch-loaded and tilt-bed trucks directly to your plant gate, refinery turnaround pad, port staging area, or unpaved industrial yard, wherever your mega-project needs a ground-level command center without trailer stairs, skirting, or complex blocking.`,
    `For ${city} procurement teams, we provide transparent freight quotes and realistic delivery windows tied to your mobilization schedule. We routinely serve ${stateName} petrochemical, maritime, and heavy construction accounts that cannot wait on rental trailer backlogs or multi day setup crews. Your 20' or 40' containerized office arrives ready for power connection: steel-framed, climate-controlled, and positioned exactly where your superintendent directs on dirt, gravel, asphalt, or compacted pad.`,
    `Our ${city} delivery playbook is built for industrial buyers: confirm site access and overhead clearance, coordinate drop timing with turnaround or construction milestones, and place the unit flat on the ground so crews can walk in at grade level. That ground-level advantage matters on ${stateName} petrochemical and maritime jobsites where trailer stairs create OSHA exposure and slow down daily foot traffic between the yard and the command center.`,
    `Need staging for a turnaround, LNG expansion, or Ship Channel logistics hub? Request a delivery quote and we will confirm routing, site access requirements, and drop placement for your ${city}, ${state} jobsite.`,
  ].join("\n\n");
}

export function getClimateControlContent(city, state) {
  const stateName = STATE_NAMES[state] ?? state;
  const climate = STATE_CLIMATE[state] ?? STATE_CLIMATE.LA;

  return [
    `${stateName} jobsites demand more than a basic portable office. Our container offices are engineered for ${climate.headline}, the conditions that destroy standard mobile trailers on active ${city} industrial and commercial projects.`,
    ...climate.specs.map((spec) => spec),
    climate.closing,
    `Every unit we deliver to ${city}, ${state} includes commercial-grade climate control spec'd for Gulf South industrial duty: insulated walls, sealed openings, and HVAC appropriate for continuous use by engineers, safety managers, and project teams running ${stateName} mega-projects around the clock.`,
    `Compared to uninsulated trailers, our closed-cell spray foam and commercial interior spec reduce condensation risk on ${city} jobsites, protecting paper records, networking gear, and employee comfort when ${stateName} weather shifts fast. That is why petrochemical, maritime, and EPC contractors across the Gulf South specify containerized offices instead of short term rental trailers for multi month turnarounds and capital projects.`,
  ].join("\n\n");
}

export function getStateDisplayName(state) {
  return STATE_NAMES[state] ?? state;
}
