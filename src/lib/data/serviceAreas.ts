export type ServiceArea = {
  slug: string;
  city: string;
  state: string;
  h1: string;
  hook: string;
  industryFocus: string;
  logistics: string;
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
      "Serving industrial contractors, refinery turnarounds, and project managers across Southeast Texas with secure, ground-level mobile offices.",
    industryFocus:
      "Beaumont jobsites demand steel that survives heat, humidity, and heavy traffic. We deliver commercial-grade 20' and 40' office containers with insulation, HVAC, and secure lockable construction—built for industrial schedules, not residential trailer timelines.",
    logistics:
      "We dispatch from Louisiana and run dedicated freight into the Beaumont and Golden Triangle corridor, dropping units exactly where your field team needs them.",
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
