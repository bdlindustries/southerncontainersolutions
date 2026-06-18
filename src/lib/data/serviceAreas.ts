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
];

export function getServiceAreaBySlug(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}

export function getAllServiceAreaSlugs(): string[] {
  return serviceAreas.map((area) => area.slug);
}
