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
