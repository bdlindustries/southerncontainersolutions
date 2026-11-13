import { LOCATION_REGIONS } from "@/lib/locationRegions";
import { normalizeLocationSlug } from "@/lib/locationSlugs";
import type { ServiceArea } from "@/lib/data/serviceAreas";
import { absoluteUrl, SITE_URL } from "@/lib/siteUrl";
import { buildClimateSpecs } from "@/lib/serviceAreaClimate";
import { PRIORITY_LOCATION_CONTENT } from "@/lib/data/priorityLocationContent";

export function buildLocationPageTitle(city: string, state: string): string {
  const long = `Shipping Container Offices in ${city}, ${state} | Southern Container Solutions`;
  if (long.length <= 60) return long;

  const medium = `Container Offices in ${city}, ${state} | Southern Container`;
  if (medium.length <= 60) return medium;

  return `Container Offices ${city}, ${state} | SCS`;
}

export function buildLocationBreadcrumbJsonLd(area: ServiceArea) {
  const slug = normalizeLocationSlug(area.slug);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: absoluteUrl("/locations"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${area.city}, ${area.state}`,
        item: absoluteUrl(`/locations/${slug}`),
      },
    ],
  };
}

/** Up to four nearby cities in the same curated directory section. */
export function getNearbyLocationSlugs(slug: string, limit = 4): string[] {
  const normalized = normalizeLocationSlug(slug);

  for (const region of LOCATION_REGIONS) {
    for (const section of region.sections) {
      const slugs = section.slugs.map((s) => normalizeLocationSlug(s));
      const index = slugs.indexOf(normalized);
      if (index === -1) continue;

      const neighbors: string[] = [];
      for (let offset = 1; neighbors.length < limit && (index - offset >= 0 || index + offset < slugs.length); offset += 1) {
        if (index - offset >= 0) {
          const left = slugs[index - offset];
          if (left !== normalized) neighbors.push(left);
        }
        if (neighbors.length >= limit) break;
        if (index + offset < slugs.length) {
          const right = slugs[index + offset];
          if (right !== normalized) neighbors.push(right);
        }
      }

      return neighbors.slice(0, limit);
    }
  }

  return [];
}

function buildDefaultUniqueIntro(area: ServiceArea): string {
  return `Southern Container Solutions delivers shipping container offices and portable storage containers to ${area.city}, ${area.state} jobsites. Offices are finished, ground-level steel workspaces; storage units are Corten steel Conex boxes when you need secure laydown without an office build.`;
}

const FAR_FROM_COVINGTON_RENTAL_STATES = new Set(["TX", "MS", "AL", "FL"]);

export function buildFarShopRentalsParagraph(city: string, state: string): string {
  return `Browse shipping container offices for sale on our shop page. For secure laydown, request storage container pricing on our raw inventory page. Long-term container office rentals are available through our partner Big Rentals with transportation quoted by distance from our Covington yard—call (985) 251-2316 for a delivery quote to ${city}, ${state}.`;
}

function buildDefaultShopRentalsParagraph(area: ServiceArea): string {
  if (FAR_FROM_COVINGTON_RENTAL_STATES.has(area.state)) {
    return buildFarShopRentalsParagraph(area.city, area.state);
  }
  return `Ready to buy? Browse published pricing on shipping container offices in our shop. Need secure storage without a full office build? Request a quote for storage containers and Conex boxes on our raw inventory page. For longer schedules, explore container office rentals on our rentals page or call (985) 251-2316.`;
}

export function enhanceServiceAreaForLocationPage(area: ServiceArea): ServiceArea {
  const patch = PRIORITY_LOCATION_CONTENT[area.slug];
  let next: ServiceArea = {
    ...area,
    localClimateSpecs: buildClimateSpecs(area.city, area.state, area.slug),
    localUniqueIntro:
      patch?.localUniqueIntro ?? area.localUniqueIntro ?? buildDefaultUniqueIntro(area),
    localShopRentalsParagraph:
      patch?.localShopRentalsParagraph ??
      area.localShopRentalsParagraph ??
      buildDefaultShopRentalsParagraph(area),
  };

  if (patch?.heroHeadline) next.heroHeadline = patch.heroHeadline;
  if (patch?.heroSub) next.heroSub = patch.heroSub;
  if (patch?.appendIndustry) {
    next.localIndustryFocus = `${next.localIndustryFocus}\n\n${patch.appendIndustry}`;
  }
  if (patch?.appendDelivery) {
    next.localDeliveryLogistics = `${next.localDeliveryLogistics}\n\n${patch.appendDelivery}`;
  }
  if (patch?.extraFaqs?.length) {
    next.faqs = [...next.faqs, ...patch.extraFaqs];
  }

  if (FAR_FROM_COVINGTON_RENTAL_STATES.has(next.state)) {
    next.localShopRentalsParagraph = buildFarShopRentalsParagraph(next.city, next.state);
  }

  return next;
}

export function countLocationPageWords(area: ServiceArea): number {
  const text = [
    area.heroSub,
    area.localUniqueIntro,
    area.localIndustryFocus,
    area.localDeliveryLogistics,
    area.localClimateSpecs,
    area.localShopRentalsParagraph,
    area.localHighways,
    ...area.faqs.flatMap((f) => [f.question, f.answer]),
  ]
    .filter(Boolean)
    .join(" ");

  return text.split(/\s+/).filter(Boolean).length;
}
