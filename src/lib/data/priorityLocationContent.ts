import type { ServiceAreaFaq } from "@/lib/serviceAreaDefaults";

export type LocationContentPatch = {
  heroHeadline?: string;
  heroSub?: string;
  localUniqueIntro?: string;
  appendIndustry?: string;
  appendDelivery?: string;
  localShopRentalsParagraph?: string;
  extraFaqs?: ServiceAreaFaq[];
};

export const PRIORITY_LOCATION_CONTENT: Record<string, LocationContentPatch> = {
  "new-iberia-la": {
    heroHeadline: "Shipping Container Offices in New Iberia, LA",
    localUniqueIntro:
      "Port of Iberia fabrication, shipbuilding support, and Acadiana energy service companies mobilize crews on tight laydown yards where plywood trailers are a poor fit. Southern Container Solutions supplies finished shipping container offices and Conex storage to Iberia Parish without selling spray foam or HVAC as standalone services—those systems are part of our finished office builds.",
    appendIndustry:
      "New Iberia sits at the crossroads of offshore vessel fabrication, ship channel logistics, and land-based oilfield service work. Superintendents staging along Highway 14 and the Port of Iberia Industrial Park need ground-level offices that stay secure when tools and survey gear remain on site overnight. A 20' container office gives a compact command post for inspectors and safety staff at fabrication gates; a 40' unit supports multi-discipline teams running simultaneous weld and outfitting packages. When dry storage matters more than desks, wind-and-watertight Conex boxes protect hose reels, consumables, and valve skids beside the same pad.",
    appendDelivery:
      "Deliveries from our Covington, Louisiana build yard typically route west on I-10 to US-90 and LA-14 into Iberia Parish. Tilt-bed placement sets the unit on shell, gravel, or concrete without stairs blocking forklift corridors. Narrow yard roads near fabrication shops may require a morning delivery window—share gate codes, weight limits, and crane swing zones when you request freight so the driver can stage safely.",
    localShopRentalsParagraph:
      "Browse shipping container offices for sale with published pricing on our shop page. Need bare storage at the fabrication yard? Request Conex box pricing on our raw containers page. For turnarounds measured in weeks rather than years, ask about container office rentals serving Acadiana.",
  },
  "tyler-tx": {
    heroHeadline: "Shipping Container Offices in Tyler, TX",
    heroSub:
      "Finished shipping container offices and portable storage for East Texas healthcare expansions, distribution construction, and industrial jobsites around the Tyler metro.",
    localUniqueIntro:
      "Tyler's growth mixes hospital campus work, retail distribution, and light industrial construction where rental trailers slow mobilization. Southern Container Solutions sells ground-level shipping container offices built in Louisiana and delivered across East Texas.",
    appendIndustry:
      "East Texas contractors working along Loop 323, Grande Boulevard logistics corridors, and outlying county industrial pads need workspace that tolerates red clay dust and summer heat indexes. Container offices give safety and project staff a lockable, climate-controlled room while 40' units support plan tables and owner representatives during phased hospital or education builds. Capital projects may justify purchasing a unit for reuse across multiple developments. Pair an office with a WWT Conex box when crews need secure material storage on the same dirt pad.",
    appendDelivery:
      "Freight from Covington typically runs I-20 west into Tyler. Winch and tilt deliveries place containers at ground level on compacted base material; avoid saturated clay ruts that can drag a tilt trailer. Residential-adjacent commercial infill may need neighbor coordination for early-morning set times—include site photos and contact numbers when you schedule.",
  },
  "new-orleans-la": {
    heroHeadline: "Shipping Container Offices in New Orleans, LA",
    localUniqueIntro:
      "Orleans Parish infill, port-adjacent industrial work, and levee corridor construction reward ground-level steel offices that fit tight lots better than stair-heavy trailers. Southern Container Solutions delivers finished container offices and storage containers built at our Covington yard across the Greater New Orleans area.",
    appendIndustry:
      "Project managers along the Industrial Canal, Intracoastal, and riverfront logistics lanes often fight sidewalk clearance, flood-wall setbacks, and zero-lot-line commercial pads. Shipping container offices sit at grade so crews step in without platforms consuming sidewalk space. Use them as secure plan rooms for civil contractors, electrical re-build scopes, and hospitality infrastructure where theft risk is real. Hotel and mixed-use vertical work downtown may still place units on rear service courts—confirm local permitting with your architect. Storage-only needs at the same job can stay on a matched Conex box rather than mixing office traffic with laydown inventory.",
    appendDelivery:
      "Dispatch routes use I-10, US-90, and the Pontchartrain corridor depending on whether your pad is East Bank, West Bank, or Metairie-adjacent. Low wires and tight French Quarter-adjacent alleys may be unsuitable for tilt delivery—send lane widths and overhead clearance photos before booking. Ground-level placement on asphalt or stabilized stone is ideal; uneven subsidence areas may need shim planning with your superintendent.",
    localShopRentalsParagraph:
      "See shipping container offices for sale on our shop, request Conex storage pricing on raw containers, or ask about rentals when your Orleans Parish schedule is shorter than a purchase cycle.",
  },
  "baton-rouge-la": {
    heroHeadline: "Shipping Container Offices in Baton Rouge, LA",
    localUniqueIntro:
      "Capital Region petrochemical turnarounds, river corridor construction, and MSI corridor commercial work need secure, climate-controlled field offices. Southern Container Solutions builds shipping container offices in Covington and delivers throughout Baton Rouge, Port Allen, and Ascension-adjacent sites.",
    appendIndustry:
      "Plant gate security and turnaround density mean your office must protect laptops, radios, and marked prints—not just provide shade. Container offices give a steel perimeter with barred windows and man-door deadbolts suited to ExxonMobil, Formosa, and midstream sites along the Mississippi. Capitol Park and downtown commercial contractors use the same platforms on asphalt pads when trailer ramps would block laydown. Choose 20' models for tight turnaround trailers parking and 40' layouts when instrument teams share space with construction managers during multi-month capital projects. Raw storage containers handle valve carts and spool racks separately from the office traffic pattern.",
    appendDelivery:
      "Typical routing from Covington uses I-12 and I-10 into Baton Rouge and Airline Highway industrial zones. Plant sites often require badge escorts and morning delivery windows—send gate instructions with freight quotes. Units drop on prepared gravel or concrete at grade; coordinate with site civil for pad location relative to fire lanes. Mississippi River flood stages and barge traffic can affect afternoon access on river-adjacent pads—morning delivery slots often work best. We can set units on stabilized stone near maintenance warehouses or out on turnaround gravel next to unit boundaries when civil completes access roads.",
    localShopRentalsParagraph:
      "Buy container offices with published pricing on our shop, quote Conex laydown boxes on raw containers, or explore rental fleet options for turnaround-length schedules on our rentals page.",
  },
  "lake-charles-la": {
    heroHeadline: "Shipping Container Offices in Lake Charles, LA",
    localUniqueIntro:
      "Calcasieu Parish LNG construction, petrochemical turnarounds, and port expansions push contractors to replace fiberglass trailers with steel container offices that survive mud, wind, and long schedules.",
    appendIndustry:
      "Lake Charles contractors staging along I-210, LA-27, and the ship channel face simultaneous mega projects and limited laydown acreage. Container offices consolidate safety, QA, and client reps in one lockable footprint. LNG and civil contractors often run parallel night shifts—exterior lighting and multiple interior circuits on finished office builds keep documentation work continuing after crane ops slow. When only secure storage is required for cable trays or gasket kits near the same gate, specify WWT or one-trip Conex boxes instead of a full office conversion. Contractors between Sulphur, Westlake, and the port often run multiple small yards simultaneously—a purchased 40' office can move between those pads with less re-setup than a wheeled trailer when phases change.",
    appendDelivery:
      "Delivery trucks commonly approach via I-10 and I-210 into westlake and north Lake Charles industrial parks. Heavy rain can soften access roads—compact stone before delivery when civil allows. Share TWIC or plant-specific orientation requirements early so drivers are not turned around at the gate.",
    localShopRentalsParagraph:
      "Shop shipping container offices for sale, request storage container quotes on our raw page, or ask about rentals for turnaround-length Lake Charles work on our rentals page.",
  },
  "houma-la": {
    heroHeadline: "Shipping Container Offices in Houma, LA",
    heroSub:
      "Ground-level shipping container offices for Terrebonne Parish maritime yards, offshore supply bases, and along-the-canal industrial work—with documented deliveries in the Houma market.",
    localUniqueIntro:
      "Terrebonne Parish is built around offshore supply, fabrication, and inland waterway logistics where fiberglass trailers rot quickly in salt air. Southern Container Solutions documents Houma deliveries and builds container offices sized for marsh-side and shell-yard pads.",
    appendIndustry:
      "Oilfield service companies, ship channel contractors, and fabrication shops along LA-311, US-90, and the Houma Navigation Canal need walk-in offices beside busy laydown. The photos on this page show real Houma placements on shell and concrete—ground level so forklifts retain aisle width. Use 40' offices when tool clerks share space with project engineers; add a storage container for basket racks and chemical totes when office traffic must stay clean. Rental options help contractors riding short fabrication spikes without capitalizing every mobilization.",
    appendDelivery:
      "Tilt-bed delivery onto crushed shell is standard for Houma supply bases. Coordinate tide and shift-change traffic so the truck can back along canal-side roads safely. Salt exposure makes moisture-resistant interior finishes on finished offices worthwhile for multi-year placements.",
    localShopRentalsParagraph:
      "Purchase shipping container offices on our shop page, quote Conex boxes for offshore laydown on raw containers, or ask about Houma-area rentals when your fabrication window is limited.",
  },
  "beaumont-tx": {
    heroHeadline: "Shipping Container Offices in Beaumont, TX",
    localUniqueIntro:
      "Golden Triangle refinery turnarounds and Port Arthur–adjacent industrial work depend on fast, secure field offices. Southern Container Solutions delivers shipping container offices and storage containers throughout Beaumont and Hardin County corridors.",
    appendIndustry:
      "Beaumont contractors on US-69, US-96, and I-10 industrial spurs run turnaround scopes where trailer theft and heat-related downtime are common complaints. Container offices keep instrument teams and turnaround coordinators in a cooled, lockable room steps from unit boundaries. Petrochemical owners often require badgable structures—steel boxes with controlled single-door entry simplify security compared with multi-door trailers. Pair offices with Conex storage for PPE cages and specialty tool cribs on the same gravel pad. Hardin County pipeline spreads and Nederland fabricators often pair a single container office with multiple laydown Conex boxes along the same ROW—keeping supervision climate-controlled while consumables stay in locked dry storage.",
    appendDelivery:
      "Freight from Louisiana crosses I-10 into Beaumont and Nederland-adjacent sites. Refinery gates may restrict delivery to escorted windows and PPE requirements—include safety orientation details with scheduling. Place units on well-drained gravel to handle Gulf Coast downpours during turnaround season. Larger turnaround parking fields often stage multiple offices—tell us if you need side-by-side drops so drivers can line up units along the same gravel spine.",
    localShopRentalsParagraph:
      "Shop container offices for sale, explore Conex storage for turnaround laydown, or review rental terms for Golden Triangle projects on our rentals page.",
  },
  "galveston-tx": {
    heroHeadline: "Shipping Container Offices in Galveston, TX",
    localUniqueIntro:
      "Galveston Island and port-adjacent work combines salt air, tight maritime footprints, and tourism-driven commercial construction—conditions where ground-level shipping container offices outperform wheeled trailers.",
    appendIndustry:
      "Ship repair contractors, cruise-port logistics, and coastal commercial builders along Harborside and the Strand need offices that resist corrosion-driven maintenance cycles. Finished container offices put HVAC and insulated walls inside the steel shell so crews can work prints without opening doors to Gulf wind. Maritime jobs often mix office and parts storage—consider a 40' office for staff and a separate storage container for consumables to avoid salt tracking through the workspace. Hospital and university expansion on the mainland side of the causeway uses the same models on asphalt pads with faster setup than modular wood trailers.",
    appendDelivery:
      "Causeway and Harborside deliveries require planning for bridge traffic and tight dock approaches. Send overhead clearance and turning radius notes for historic-district-adjacent jobs. Elevated flood awareness may influence pad placement—coordinate with civil engineers on finished floor elevation relative to storm planning. Ferry traffic and causeway congestion can affect delivery timing—share whether your pad is Island-side or mainland before we schedule the truck.",
    localShopRentalsParagraph:
      "Buy shipping container offices on our shop, request Conex pricing on raw containers, or ask about rentals for maritime schedules on our rentals page.",
  },
  "gulfport-ms": {
    heroHeadline: "Shipping Container Offices in Gulfport, MS",
    localUniqueIntro:
      "Harrison County port work, military-adjacent construction, and coastal commercial builds need container offices that handle salt air without constant trailer maintenance. Ground-level steel units keep supervisors out of wheeled trailers that degrade quickly along the beach corridor.",
    appendIndustry:
      "Gulfport contractors serving the port, naval construction clients, and I-10 corridor distribution centers need secure field space on shell and asphalt pads. Container offices support QC and safety staff with lockable storage for laptops and calibration tools. Casino and hospitality infrastructure along the beach uses ground-level placement behind service roads where ramps would block emergency lanes. When projects need only Conex storage for fixtures and tile cartons, raw WWT boxes keep cost down while offices handle supervision. Keesler-adjacent commercial work and port warehouse expansions often need multiple 20' units for separate subs—published shop pricing helps owners plan purchases for multi-month casino or logistics builds.",
    appendDelivery:
      "Delivery commonly runs I-10 east from Louisiana into Gulfport and Long Beach industrial areas. Coordinate with port security when delivering inside fenced facilities. Summer afternoon storms can delay tilt placement—flexible scheduling helps. Long Beach and industrial Gulfport yards may need escorted gate access similar to port terminals—include your point of contact on the delivery request.",
    localShopRentalsParagraph:
      "See container offices for sale on our shop, quote storage containers on our raw page, or explore Mississippi Gulf Coast rentals on our rentals page.",
  },
  "mobile-al": {
    heroHeadline: "Shipping Container Offices in Mobile, AL",
    localUniqueIntro:
      "Mobile Bay shipbuilding, Airbus-supply-chain construction, and Austal-adjacent yard work reward durable shipping container offices over rental trailers that struggle in salt wind.",
    appendIndustry:
      "Mobile contractors work across Theodore Industrial Canal, Brookley Aeroplex, and downtown waterfront redevelopment. Container offices give AFL-class yards a theft-resistant plan room within walking distance of hull blocks. Aerospace and warehouse expansions along I-65 use 20' offices for supers while 40' units host owner reps during steel erection. Alabama humidity makes climate-controlled interiors more than a comfort issue when electronics stay on site overnight. Secure Conex boxes handle laydown for fasteners and rigging gear beside the office door. Downtown redevelopment projects sometimes split a 40' office between owner reps and GC staff with separate lock sets—confirm door hardware needs when ordering.",
    appendDelivery:
      "Routes from Covington use I-10 through Mississippi into Mobile and I-65 spurs to Brookley. Shipyard deliveries may require specific gate badges—send contacts in advance. Ground-level set on stabilized stone keeps crews working the same day without carpentry for stairs. Brookley and Theodore deliveries sometimes share the same I-10 off-ramp window—coordinate with adjacent subs when two containers drop on the same industrial park the same week.",
    localShopRentalsParagraph:
      "Shop shipping container offices, request Conex quotes on raw containers, or review Mobile-area container office rentals on our rentals page.",
  },
};
