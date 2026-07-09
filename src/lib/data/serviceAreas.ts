export type ServiceArea = {
  slug: string;
  city: string;
  state: string;
  h1: string;
  hook: string;
  industryFocus: string;
  logistics: string;
  image?: string;
  imageAlt?: string;
  /** Top-level route when different from /service-areas/[slug] */
  routePath?: string;
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "covington-la",
    city: "Covington",
    state: "LA",
    h1: "Commercial Jobsite Office Containers in Covington, LA",
    hook:
      "Turnkey 20' and 40' mobile offices built in Covington and delivered across the Northshore, New Orleans metro, and Gulf South jobsites.",
    industryFocus:
      "Southern Container Solutions builds heavy-duty, climate-controlled container offices at our Covington facility. Whether you need a secure jobsite command center or a finished portable office for your crew, our units are spec'd for commercial durability, transparent pricing, and fast deployment.",
    logistics:
      "We coordinate delivery from our Covington yard using tilt-bed and winch-loaded trucks so your unit lands ground-level on your pad with minimal site prep.",
  },
  {
    slug: "beaumont-tx",
    city: "Beaumont",
    state: "TX",
    h1: "Commercial Jobsite Office Containers in Beaumont, TX",
    hook:
      "Delivering secure, turnkey office containers for the Golden Triangle's refinery expansions, LNG projects, and industrial staging sites.",
    industryFocus:
      "With massive capital projects sweeping through Beaumont, Port Arthur, and Orange, regional project managers need reliable, fast-deployment site infrastructure. Standard mobile trailers are prone to damage and require complex setup. We supply heavy-duty 20' and 40' ground-level container offices built for the realities of Texas refinery work. Protect your blueprints, IT infrastructure, and site personnel in a climate-controlled, steel-enforced workspace without the OSHA trip hazards of stairs.",
    logistics:
      "Cross-state delivery is seamless. We dispatch directly down I-10 to the Golden Triangle, providing transparent pricing and winch-loaded delivery directly to your plant or construction site. Drop it on the dirt and get to work.",
    image: "/images/jobsite-office-container.png",
    imageAlt:
      "40-foot ground-level mobile office container on a Texas jobsite by Southern Container Solutions",
  },
  {
    slug: "orange-tx",
    city: "Orange",
    state: "TX",
    h1: "Commercial Jobsite Office Containers in Orange, TX",
    hook:
      "Supporting the Golden Triangle's shipbuilding, petrochemical expansions, and heavy industrial contractors with secure, ground-level mobile offices.",
    industryFocus:
      "As a critical piece of the Golden Triangle, Orange is home to massive marine fabrication and chemical manufacturing. Staging a project here requires rugged site infrastructure that can handle heavy industrial wear and Gulf Coast weather. Traditional wheeled trailers create safety risks and logistical headaches on unpaved or crowded yards. Southern Container Solutions supplies commercial-grade 20' and 40' steel office containers. Protect your engineering teams and blueprints in a secure, fully insulated, climate-controlled workspace that sits flat on the ground.",
    logistics:
      "We run directly down I-10 to service the Golden Triangle. Our specialized winch-loaded trucks drop your office container flat on the dirt or gravel exactly where you need it, eliminating the need for trailer stairs, skirting, or complex anchoring.",
  },
  {
    slug: "freeport-tx",
    city: "Freeport",
    state: "TX",
    h1: "Commercial Jobsite Office Containers in Freeport, TX",
    hook:
      "Providing heavy-duty, marine-grade mobile offices for LNG export terminals, deepwater port logistics, and major chemical plant expansions.",
    industryFocus:
      "Staging near massive operations like Freeport LNG and the Dow Chemical complex requires infrastructure that can handle intense coastal and industrial environments. High winds and corrosive conditions quickly destroy standard office trailers. We deliver heavy-duty 20' and 40' commercial-grade office containers built for the harsh realities of the Texas coast. Keep your site managers, safety coordinators, and technical gear secure in a fully fortified, climate-ready steel structure that completely bypasses OSHA trip hazards.",
    logistics:
      "We streamline delivery directly to the Texas coast. Our dispatch uses specialized winch-loaded trucks to drop your container office exactly where you need it on your port staging area or chemical plant gate, providing quick deployment so your crew can plug in and get straight to work.",
  },
  {
    slug: "houston-tx",
    city: "Houston",
    state: "TX",
    h1: "Commercial Jobsite Office Containers in Houston, TX",
    hook:
      "Supporting the Houston Ship Channel, massive petrochemical expansions, and heavy industrial contractors with heavy-duty, ground-level mobile offices.",
    industryFocus:
      "Houston is the epicenter of American energy and industrial manufacturing. When you are staging a major turnaround in Pasadena or managing port logistics in Baytown, you need workspaces that match the scale of your project. Southern Container Solutions delivers rugged, commercial-grade 20' and 40' office containers designed to endure Gulf Coast weather and heavy industrial use. Skip the flimsy trailers; our steel-framed offices provide a secure, climate-controlled environment for your engineers and site managers.",
    logistics:
      "We run straight down I-10 from our Louisiana yard, bypassing the backlog of local Texas trailer rentals. Our winch-loaded trucks drop your ground-level office directly onto the dirt, gravel, or asphalt of your jobsite, ready for immediate power connection.",
    image: "/images/jobsite-office-container.png",
    imageAlt:
      "40-foot ground-level mobile office container on a Texas jobsite by Southern Container Solutions",
  },
  {
    slug: "corpus-christi-tx",
    city: "Corpus Christi",
    state: "TX",
    h1: "Commercial Jobsite Office Containers in Corpus Christi, TX",
    hook:
      "Supporting the Port of Corpus Christi, heavy crude export terminals, and coastal refinery expansions with secure, ground-level mobile offices.",
    industryFocus:
      "When you are managing massive energy exports and coastal refinery operations, you need workspaces that withstand extreme coastal conditions. Standard trailers degrade and cause safety hazards in high winds. We deliver heavy-duty 20' and 40' commercial-grade office containers built for the harsh realities of the Texas coast. Provide your site managers and engineers with a secure, climate-controlled, steel-enforced workspace without the hassle of stairs or skirting.",
    logistics:
      "We deliver straight to your coastal jobsite. Our winch-loaded trucks drop your ground-level office directly onto the dirt, gravel, or concrete of your port or refinery staging area, ready for immediate use.",
  },
  {
    slug: "victoria-tx",
    city: "Victoria",
    state: "TX",
    h1: "Commercial Jobsite Office Containers in Victoria, TX",
    hook:
      "Supplying turnkey, climate-controlled mobile offices for the inland industrial hub, logistics centers, and regional manufacturing expansions.",
    industryFocus:
      "As a crucial inland crossroads supporting the Texas Gulf Coast, Victoria's manufacturing and logistics sectors demand fast and reliable site mobilization. Standard mobile trailers are prone to damage and slow to deploy. We provide heavy-duty 20' and 40' container offices built strictly for heavy commercial use. Protect your foremen, safety managers, and vital technical infrastructure in a fully fortified, climate-ready steel structure that sits securely on the ground.",
    logistics:
      "We dispatch our specialized winch-loaded trucks directly to your Victoria plant gate or commercial site. Your ground-level office is dropped exactly where you need it—on dirt, gravel, or asphalt—eliminating the need for complex setups so your team can get straight to work.",
  },
  {
    slug: "brownsville-tx",
    city: "Brownsville",
    state: "TX",
    h1: "Commercial Jobsite Office Containers in Brownsville, TX",
    hook:
      "Supporting Port of Brownsville LNG projects, aerospace staging, and heavy coastal manufacturing with secure, ground-level mobile offices.",
    industryFocus:
      "With massive LNG expansions and aerospace infrastructure driving the Brownsville economy, contractors need rugged site infrastructure that can handle the extreme South Texas coastal environment. Traditional trailers sink, degrade, and become liabilities in high winds. Southern Container Solutions supplies commercial-grade 20' and 40' steel office containers designed specifically for heavy industrial and port footprints. Keep your engineering teams and blueprints protected in a fully insulated, climate-controlled workspace that sits flat on the dirt, eliminating OSHA trip hazards.",
    logistics:
      "We dispatch straight to the South Texas coast. Our specialized winch-loaded trucks drop your ground-level office exactly where you need it on your Brownsville jobsite—ready for immediate power and bypassing the need for blocking or skirting.",
  },
  {
    slug: "baytown-tx",
    city: "Baytown",
    state: "TX",
    h1: "Commercial Jobsite Office Containers in Baytown, TX",
    hook:
      "Supplying the massive chemical complexes and Houston Ship Channel contractors with heavy-duty, climate-controlled mobile workspaces.",
    industryFocus:
      "Staging greenfield projects and plant turnarounds in Baytown requires robust site infrastructure. Standard wheeled trailers create logistical headaches on crowded industrial sites. We provide heavy-duty 20' and 40' steel-framed office containers built strictly for heavy industrial and chemical plant use. Keep your blueprints, foremen, and IT gear protected in a fully insulated, climate-controlled workspace.",
    logistics:
      "We streamline delivery to the Baytown industrial sector. Our dispatch uses specialized winch-loaded trucks to drop your container office exactly where you need it, skipping the red tape of blocking and complex setup so your team can get straight to work.",
  },
  {
    slug: "pasadena-tx",
    city: "Pasadena",
    state: "TX",
    h1: "Commercial Jobsite Office Containers in Pasadena, TX",
    hook:
      "Supporting the Houston Ship Channel's massive petrochemical complexes and heavy industrial contractors with secure, ground-level mobile offices.",
    industryFocus:
      "Pasadena is a critical hub for the Gulf Coast's chemical and refining industries. Staging a major turnaround or greenfield project here requires rugged, reliable site infrastructure. Standard office trailers cause logistical headaches and create OSHA trip hazards on crowded industrial sites. Southern Container Solutions delivers commercial-grade 20' and 40' steel office containers designed specifically for heavy petrochemical footprints. Keep your project managers, engineers, and blueprints protected in a fully insulated, climate-controlled workspace that sits flat on the dirt.",
    logistics:
      "We dispatch straight down I-10 to the Houston Ship Channel region. Our specialized winch-loaded trucks drop your ground-level office exactly where you need it on your Pasadena jobsite—ready for immediate power and bypassing the need for blocking or skirting.",
  },
  {
    slug: "deer-park-tx",
    city: "Deer Park",
    state: "TX",
    h1: "Commercial Jobsite Office Containers in Deer Park, TX",
    hook:
      "Supplying turnkey, climate-controlled mobile offices for plant turnarounds and capital projects throughout the Deer Park refinery sector.",
    industryFocus:
      "Home to some of the most intensive refining and chemical manufacturing operations in Texas, Deer Park contractors demand secure and fast site mobilization. Traditional wheeled trailers degrade quickly and require complex anchoring setups. We provide heavy-duty 20' and 40' container offices built strictly for heavy industrial use. Protect your foremen, safety managers, and vital technical infrastructure in a fully fortified, climate-ready steel structure that sits securely on the ground.",
    logistics:
      "We streamline delivery directly to the Texas petrochemical corridor. Our dispatch uses specialized winch-loaded trucks to drop your container office directly onto your plant gate or construction staging site, providing quick deployment so your crew can plug in and get straight to work.",
  },
  {
    slug: "laporte-tx",
    city: "LaPorte",
    state: "TX",
    h1: "Commercial Jobsite Office Containers in LaPorte, TX",
    hook:
      "Providing heavy-duty, climate-controlled mobile offices for Barbours Cut Terminal, maritime logistics, and chemical plant expansions.",
    industryFocus:
      "As a crucial logistics hub for the Houston Ship Channel, LaPorte handles massive container terminal operations and heavy chemical manufacturing. When you are managing port infrastructure or plant turnarounds, traditional wheeled trailers are a liability. We provide heavy-duty 20' and 40' container offices built strictly for heavy industrial and marine use. Protect your foremen, safety managers, and vital technical infrastructure in a fully fortified, climate-ready steel structure that sits securely on the ground.",
    logistics:
      "We streamline delivery directly to the Texas coast. Our dispatch uses specialized winch-loaded trucks to drop your container office directly onto your port staging area or plant gate, providing quick deployment so your crew can plug in and get straight to work.",
  },
  {
    slug: "channelview-tx",
    city: "Channelview",
    state: "TX",
    h1: "Commercial Jobsite Office Containers in Channelview, TX",
    hook:
      "Supporting Houston Ship Channel marine logistics, barge terminals, and heavy industrial contractors with secure, ground-level mobile offices.",
    industryFocus:
      "Channelview is deeply tied to the marine and heavy industrial sectors along the San Jacinto River and the Houston Ship Channel. Staging a project here requires durable infrastructure that can survive a heavy industrial footprint. Traditional trailers fail in these zones and create OSHA trip hazards. Southern Container Solutions delivers commercial-grade 20' and 40' steel office containers designed specifically for tough maritime and petrochemical environments. Keep your site managers and blueprints protected in a fully insulated, climate-controlled workspace.",
    logistics:
      "We streamline delivery directly down I-10 to your Channelview site. Our specialized winch-loaded trucks drop your office container flat on the ground exactly where you need it, skipping the hassle of blocking, tying down, or skirting.",
  },
  {
    slug: "lake-charles-la",
    city: "Lake Charles",
    state: "LA",
    h1: "Commercial Jobsite Office Containers in Lake Charles, LA",
    hook:
      "Providing heavy-duty, weatherproof mobile offices for LNG export terminal expansions, port infrastructure, and petrochemical turnarounds across Calcasieu Parish.",
    industryFocus:
      "With billions of dollars flowing into Calcasieu Parish projects like Woodside LNG and Venture Global, out-of-state modular trailer companies can't keep up with demand or the rough terrain. We provide heavy-duty, commercial-grade 20' and 40' office containers designed for the realities of the Gulf Coast. Built to withstand extreme weather and heavy industrial use, our ground-level offices offer secure staging for project managers, foremen, and engineers on active refinery and port jobsites.",
    logistics:
      "We deliver directly to the mud and gravel of your industrial site. Using specialized winch-loaded trucks, our dispatch ensures your office container is dropped flat on the ground exactly where you need it, bypassing the need for blocking, skirting, or complex setup.",
  },
  {
    slug: "sulphur-la",
    city: "Sulphur",
    state: "LA",
    h1: "Commercial Jobsite Office Containers in Sulphur, LA",
    hook:
      "Providing rugged, climate-controlled mobile offices for petrochemical expansions and industrial staging across the Calcasieu Parish industrial corridor.",
    industryFocus:
      "Serving the heavy industrial boom tied to the Lake Charles and Sulphur region means contractors need workspaces that can handle the mud, heavy traffic, and extreme Gulf Coast weather. Traditional trailers sink, degrade, and create OSHA trip hazards. Southern Container Solutions delivers commercial-grade 20' and 40' steel office containers designed specifically for heavy petrochemical footprints. Provide your site managers, engineers, and safety teams with a secure, climate-stable environment that sits flat on the ground.",
    logistics:
      "We dispatch our specialized winch-loaded trucks directly to your Sulphur jobsite or plant gate. Your ground-level office is dropped exactly where you need it—on dirt, gravel, or asphalt—eliminating the need for blocking, skirting, or complex setups.",
  },
  {
    slug: "baton-rouge-la",
    city: "Baton Rouge",
    state: "LA",
    h1: "Commercial Jobsite Office Containers in Baton Rouge, LA",
    hook:
      "Supporting the chemical manufacturing corridor, plant turnarounds, and industrial contractors from North Baton Rouge down to Geismar with turnkey mobile offices.",
    industryFocus:
      "When major specialty contractors and plant managers execute turnarounds or greenfield capital projects along the Mississippi River, fast mobilization is everything. Standard office trailers cause logistical bottlenecks. Southern Container Solutions provides heavy-duty, commercial-grade 20' and 40' container offices that are ready for immediate deployment. Situate your team securely in a ground-level, climate-ready environment without the OSHA trip hazards of traditional trailers.",
    logistics:
      "Located just down the interstate in Covington, we offer unmatched local proximity. We dispatch our winch-loaded trucks straight down I-12 and I-10 to deliver directly to your plant gate, chemical facility, or industrial park in the Greater Baton Rouge and Ascension Parish areas.",
  },
  {
    slug: "garyville-la",
    city: "Garyville",
    state: "LA",
    h1: "Commercial Jobsite Office Containers in Garyville, LA",
    hook:
      "Supplying turnkey, ground-level mobile offices for Marathon Refinery turnarounds and capital projects along the Mississippi River.",
    industryFocus:
      "Home to the largest refinery in Louisiana, Garyville is a critical hub for heavy industrial turnarounds and large-scale contractor mobilization. Standard mobile trailers create logistical bottlenecks and safety hazards on crowded refinery sites. We provide heavy-duty 20' and 40' container offices built strictly for industrial use. Protect your foremen, blueprints, and on-site IT gear in a fully fortified, climate-controlled workspace without the need for traditional trailer stairs or anchoring.",
    logistics:
      "Located just across the lake in Covington, we offer fast, direct logistics to St. John the Baptist Parish. We dispatch our winch-loaded trucks straight to your plant gate or construction staging site, dropping your workspace flat on the dirt so your crew can plug in and get to work safely and immediately.",
  },
  {
    slug: "reserve-la",
    city: "Reserve",
    state: "LA",
    h1: "Commercial Jobsite Office Containers in Reserve, LA",
    hook:
      "Supporting Port of South Louisiana operations, refinery turnarounds, and heavy industrial contractors with secure, ground-level mobile offices.",
    industryFocus:
      "Reserve sits at the heart of the Port of South Louisiana's massive maritime and refining footprint. Staging major capital projects here means dealing with heavy logistics and unpredictable river weather. Standard office trailers sink in the mud and create OSHA safety hazards on active industrial sites. Southern Container Solutions delivers commercial-grade 20' and 40' steel office containers designed specifically for heavy petrochemical and port environments. Keep your site managers and blueprints protected in a fully insulated, climate-controlled workspace.",
    logistics:
      "Located across the lake, we run straight down to St. John the Baptist Parish to deliver directly to your jobsite. Our winch-loaded trucks drop your office container flat on the ground exactly where you need it, skipping the hassle of blocking, tying down, or skirting.",
  },
  {
    slug: "plaquemine-la",
    city: "Plaquemine",
    state: "LA",
    h1: "Commercial Jobsite Office Containers in Plaquemine, LA",
    hook:
      "Supplying Dow Chemical, industrial staging, and heavy contractors along the Mississippi River with turnkey mobile offices.",
    industryFocus:
      "Staging a project near massive operations like the Dow Chemical complex in Plaquemine requires robust site infrastructure. Standard wheeled trailers create logistical bottlenecks and safety risks on crowded industrial sites. We provide heavy-duty 20' and 40' steel-framed office containers built strictly for heavy industrial and chemical plant use. Keep your blueprints, foremen, and IT gear protected in a fully insulated, climate-controlled workspace without the OSHA trip hazards of stairs.",
    logistics:
      "Located just across the lake in Covington, we offer unmatched local proximity to Iberville Parish. We dispatch our winch-loaded trucks straight to your plant gate or industrial staging area, dropping your workspace flat on the ground so your crew can plug in and get to work safely and immediately.",
  },
  {
    slug: "luling-boutte-la",
    city: "Luling and Boutte",
    state: "LA",
    h1: "Commercial Jobsite Office Containers in Luling and Boutte, LA",
    hook:
      "Supporting St. Charles Parish chemical plants, refineries, and heavy industrial contractors with secure, ground-level mobile offices.",
    industryFocus:
      "The industrial corridor running through Luling and Boutte handles some of the heaviest chemical and refining traffic in the state. When you are managing plant turnarounds or staging capital projects, standard office trailers create safety risks and logistical bottlenecks. Southern Container Solutions supplies commercial-grade 20' and 40' steel office containers designed specifically for tough petrochemical environments. Keep your site managers and blueprints protected in a fully insulated, climate-controlled workspace that sits flat on the dirt, eliminating OSHA trip hazards.",
    logistics:
      "Located just across the lake in Covington, we run straight down I-310 to deliver directly to your St. Charles Parish jobsite. Our winch-loaded trucks drop your office container flat on the ground exactly where you need it, skipping the hassle of blocking, tying down, or skirting.",
  },
  {
    slug: "convent-la",
    city: "Convent",
    state: "LA",
    h1: "Commercial Jobsite Office Containers in Convent, LA",
    hook:
      "Supplying turnkey, ground-level mobile offices for Mississippi River refinery turnarounds and industrial staging throughout St. James Parish.",
    industryFocus:
      "Convent is anchored by massive refining and terminal operations along the Mississippi River. Staging contractors for facility expansions here requires heavy-duty site infrastructure. Traditional wheeled trailers sink in the mud and require complex setups that waste time. We provide fortified 20' and 40' container offices built strictly for heavy industrial use. Protect your foremen, safety managers, and vital technical infrastructure in a fully climate-ready steel structure that sits securely on the ground.",
    logistics:
      "We offer fast, direct logistics to St. James Parish. We dispatch our winch-loaded trucks straight to your plant gate or construction staging site, dropping your workspace flat on the dirt so your crew can plug in and get to work safely and immediately.",
  },
  {
    slug: "jackson-ms",
    city: "Jackson",
    state: "MS",
    h1: "Climate-Controlled Jobsite Containers in Jackson, MS",
    hook:
      "Providing secure, insulated mobile offices for commercial construction, infrastructure, and industrial projects throughout the Jackson metro.",
    industryFocus:
      "Mississippi heat punishes crews and equipment alike. Our containerized offices deliver a climate-stable workspace with commercial PVC finishes, spray foam insulation, and jobsite-grade security—available in 20' and 40' footprints for project managers who need gear protected and teams productive.",
    logistics:
      "We handle routing and delivery into Jackson and surrounding parishes, with ground-level placement so your crew can walk straight in—no stairs, no trailer hitches.",
  },
  {
    slug: "columbus-ms",
    city: "Columbus",
    state: "MS",
    h1: "Commercial Jobsite Office Containers in Columbus, MS",
    hook:
      "Turnkey mobile offices for contractors, manufacturers, and site managers across Northeast Mississippi and the Golden Triangle.",
    industryFocus:
      "When your project timeline is tight, you need an office that shows up ready to work. We build and deliver fortified container offices with transparent pricing, secure steel construction, and finishes that hold up on active industrial sites.",
    logistics:
      "Our logistics team schedules winch-truck and tilt-bed delivery into Columbus and regional jobsites, placing units flat on the ground where your superintendent directs.",
  },
  {
    slug: "monroe-la",
    city: "Monroe",
    state: "LA",
    h1: "Commercial Jobsite Office Containers in Monroe, LA",
    hook:
      "Serving general contractors, infrastructure teams, and site managers across the Richland Parish data center projects with turnkey, ground-level mobile offices.",
    industryFocus:
      "When you are managing a multi-billion-dollar site, you don't have time for flimsy trailers that take weeks to set up. Southern Container Solutions provides heavy-duty, commercial-grade 20' and 40' office containers built to handle the mud, dirt, and heavy traffic of North Louisiana jobsites. Our units sit flat on the ground—meaning no stairs, no skirting, and no OSHA trip hazards. Every unit is turnkey, secure, and ready for your crew to plug in and get to work the second it hits the dirt.",
    logistics:
      "We bypass the red tape and deliver straight to your site. Our dispatch uses specialized winch-loaded trucks, allowing us to drop your office exactly where you need it on the Monroe or Richland Parish jobsite, even on unimproved surfaces.",
  },
  {
    slug: "alexandria-la",
    city: "Alexandria",
    state: "LA",
    h1: "Climate-Controlled Jobsite Containers in Alexandria, LA",
    hook:
      "Providing secure, fully insulated, climate-controlled workspaces for the AI campus expansions and heavy industrial projects throughout Rapides Parish.",
    industryFocus:
      "Louisiana heat and humidity will destroy sensitive IT equipment and blueprints. If you are staging tech infrastructure or managing large-scale civil projects in Alexandria, a standard metal box won't cut it. We build and deliver fully insulated, AC-and-heated office containers designed strictly for commercial project managers. Available in 20' and 40' footprints, these units offer a fortified, climate-stable environment for your crew, your gear, and your server racks.",
    logistics:
      "We handle the logistics straight up I-49. Every climate-controlled unit is delivered via winch-truck and dropped ground-level. No trailer hitches, no complicated blocking, just a secure, weatherproof office ready for power.",
  },
  {
    slug: "shreveport-la",
    city: "Shreveport",
    state: "LA",
    h1: "Commercial Jobsite Office Containers in Shreveport, LA",
    hook:
      "Supporting logistics hubs, regional manufacturing, and commercial construction across North Louisiana with secure, ground-level mobile offices.",
    industryFocus:
      "As a major logistics and manufacturing hub in North Louisiana, Shreveport demands rugged site infrastructure. Standard office trailers cause logistical headaches and safety risks on active commercial sites. Southern Container Solutions delivers commercial-grade 20' and 40' steel office containers designed specifically for heavy footprints. Keep your project managers, engineers, and blueprints protected in a fully insulated, climate-controlled workspace that sits flat on the dirt.",
    logistics:
      "We bypass the red tape and deliver straight to your site. Our dispatch uses specialized winch-loaded trucks, allowing us to drop your office exactly where you need it on your Shreveport jobsite, completely eliminating the need for trailer stairs, skirting, or complex anchoring.",
  },
  {
    slug: "gulfport-ms",
    city: "Gulfport",
    state: "MS",
    routePath: "/gulfport-ms",
    h1: "Custom Shipping Container Offices & Modifications in Gulfport, MS",
    hook:
      "Building and modifying heavy-duty container offices for Gulfport contractors, port-adjacent projects, and commercial jobsites across the Mississippi Gulf Coast.",
    industryFocus:
      "Gulfport, MS demands workspace solutions that survive coastal humidity, hurricane-season winds, and active commercial construction schedules. Southern Container Solutions designs custom shipping container offices and modifications—from added windows and door placements to electrical upgrades and climate-controlled interiors—for project managers who need more than a cookie-cutter trailer. Our 20' and 40' steel-framed units are built for commercial durability, transparent pricing, and fast deployment to Gulfport, Biloxi corridor, and Harrison County jobsites.",
    logistics:
      "We dispatch from our Covington, Louisiana fabrication yard straight down I-10 into Gulfport and the Mississippi Gulf Coast. Winch-loaded trucks place your modified container office ground-level on dirt, gravel, or concrete—no stairs, no skirting, and no complicated blocking required.",
  },
  {
    slug: "pascagoula-ms",
    city: "Pascagoula",
    state: "MS",
    routePath: "/pascagoula-ms",
    h1: "Custom Shipping Container Offices & Modifications in Pascagoula, MS",
    hook:
      "Turnkey container office builds and custom modifications for Pascagoula shipyard contractors, industrial turnarounds, and Jackson County construction sites.",
    industryFocus:
      "Pascagoula, MS is one of the Gulf South's most demanding industrial environments—shipbuilding schedules, refinery turnarounds, and heavy contractor mobilization leave no room for flimsy mobile trailers. Southern Container Solutions delivers custom shipping container offices and modifications engineered for the realities of Pascagoula jobsites: secure steel construction, spray-foam insulation, commercial-grade finishes, and layout changes tailored to your crew. Whether you need a climate-controlled command center or a modified 40' office with custom door and window placement, we build it in Louisiana and deliver it ready to work.",
    logistics:
      "Our logistics team runs dedicated freight from Covington into Pascagoula and Jackson County via I-10. Specialized winch trucks drop your container office exactly where your superintendent directs—flat on the ground at the shipyard gate, staging yard, or industrial pad—so your team can connect power and get to work the same day.",
  },
  {
    slug: "mobile-al",
    city: "Mobile",
    state: "AL",
    routePath: "/mobile-al",
    h1: "Custom Shipping Container Offices & Modifications in Mobile, AL",
    hook:
      "Heavy-duty container offices and custom modifications for Mobile maritime contractors, port operations, shipbuilding yards, and coastal industrial jobsites along the Gulf.",
    industryFocus:
      "Mobile, AL sits at the heart of Gulf Coast maritime commerce—from the Port of Mobile and APM Terminals to active shipbuilding and coastal industrial construction. Project managers staging waterfront work need offices that handle salt air, heavy equipment traffic, and tight mobilization windows. Southern Container Solutions builds custom shipping container offices and modifications for Mobile's maritime and industrial sector: climate-controlled interiors, secure steel construction, custom door and window layouts, and electrical upgrades spec'd for port-adjacent and shipyard jobsites. Our 20' and 40' units replace flimsy trailers with ground-level workspaces built for Alabama's coastal industrial reality.",
    logistics:
      "We run dedicated delivery from our Covington, Louisiana yard into Mobile and the Alabama Gulf Coast via I-10. Winch-loaded trucks drop your modified container office ground-level at the port gate, shipyard staging area, or coastal jobsite—on dirt, gravel, or asphalt—with no stairs, skirting, or complex setup required.",
  },
  {
    slug: "morgan-city-la",
    city: "Morgan City",
    state: "LA",
    routePath: "/morgan-city-la",
    h1: "Commercial Jobsite Office Containers in Morgan City, LA",
    hook:
      "Providing heavy-duty, marine-grade mobile offices for offshore fabrication, shipyards, and port logistics across St. Mary and Lower St. Martin Parishes.",
    industryFocus:
      "Morgan City is a critical hub for offshore construction, marine transportation, and heavy steel fabrication. Staging maritime projects requires rugged site infrastructure that can handle intense coastal humidity and heavy industrial wear. Southern Container Solutions supplies commercial-grade 20' and 40' steel office containers designed specifically for tough shipyard and marine footprints. Keep your logistics managers, foremen, and blueprints protected in a secure, fully insulated, climate-controlled workspace that sits flat on the ground.",
    logistics:
      "We run directly down from our yard straight into the Morgan City industrial and port sectors. Our specialized winch-loaded trucks drop your office container flat on the ground exactly where you need it, eliminating the need for trailer stairs, skirting, or complex anchoring.",
  },
  {
    slug: "houma-la",
    city: "Houma",
    state: "LA",
    h1: "Commercial Jobsite Office Containers in Houma, LA",
    hook:
      "Supplying turnkey, ground-level mobile offices for shipbuilding, offshore marine services, and coastal restoration staging throughout Terrebonne Parish.",
    industryFocus:
      "When major marine contractors, shipyards, and coastal engineering firms execute large-scale builds or staging in Houma, fast mobilization is key. Traditional wheeled trailers create logistical headaches and safety risks on busy, unpaved coastal yards. We provide fortified 20' and 40' container offices built strictly for heavy industrial and maritime use. Protect your engineering teams, safety managers, and vital technical infrastructure in a fully insulated, climate-ready steel structure that sits flat on the dirt without OSHA trip hazards.",
    logistics:
      "We offer efficient, direct logistics to Terrebonne Parish jobsites. We dispatch our winch-loaded trucks straight to your shipyard gate, port staging area, or industrial site, providing quick deployment and transparent pricing so your crew can plug in and get to work immediately.",
  },
  {
    slug: "lafayette-la",
    city: "Lafayette",
    state: "LA",
    h1: "Commercial Jobsite Office Containers in Lafayette, LA",
    hook:
      "Supplying turnkey, climate-controlled mobile offices for the oil and gas staging hubs and commercial construction sites throughout the Hub City.",
    industryFocus:
      "As the administrative and logistical center for Louisiana's energy sector, Lafayette contractors require fast, reliable site mobilization. Standard mobile trailers are prone to damage and require complex setups. We provide heavy-duty 20' and 40' container offices built strictly for commercial and industrial use. Protect your foremen, safety managers, and vital technical infrastructure in a fully fortified, climate-ready steel structure that sits securely on the ground.",
    logistics:
      "Located straight down I-10 and I-49, we offer efficient delivery to Lafayette Parish. Our dispatch uses specialized winch-loaded trucks to drop your container office directly onto your staging area or commercial site, providing quick deployment so your crew can plug in and get straight to work.",
  },
  {
    slug: "geismar-la",
    city: "Geismar",
    state: "LA",
    routePath: "/geismar-la",
    h1: "Custom Shipping Container Offices & Modifications in Geismar, LA",
    hook:
      "Custom container offices and modifications for Geismar chemical plants, heavy industrial facilities, refinery turnarounds, and Ascension Parish capital projects.",
    industryFocus:
      "Geismar, LA is one of the most concentrated chemical manufacturing corridors on the Mississippi River—home to major petrochemical complexes, heavy industrial plants, and constant turnaround activity. Plant managers and specialty contractors executing capital projects can't afford flimsy trailers that create OSHA trip hazards and logistical bottlenecks on crowded facility sites. Southern Container Solutions builds custom shipping container offices and modifications for Geismar's chemical and industrial sector: secure steel-framed construction, climate-controlled interiors, custom door and window placement, and electrical upgrades spec'd for refinery and chemical plant environments. Our 20' and 40' ground-level offices protect your foremen, blueprints, and on-site IT gear without the stairs, skirting, or anchoring headaches of traditional mobile trailers.",
    logistics:
      "Located just down the interstate in Covington, we offer fast direct logistics into Geismar and Ascension Parish. Our winch-loaded trucks dispatch straight down I-10 and I-12 to your plant gate, turnaround staging area, or industrial pad—dropping your workspace flat on the dirt so your crew can plug in and get to work safely and immediately.",
  },
];

export function getServiceAreaHref(area: ServiceArea): string {
  return area.routePath ?? `/service-areas/${area.slug}`;
}

export function getServiceAreaBySlug(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}

export function getAllServiceAreaSlugs(): string[] {
  return serviceAreas.map((area) => area.slug);
}
