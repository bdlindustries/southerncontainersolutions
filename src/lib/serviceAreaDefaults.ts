export type ServiceAreaFaq = {
  question: string;
  answer: string;
};

export function buildDefaultHighways(city: string, state: string): string {
  return `Major regional highways and corridors serving ${city}, ${state}.`;
}

export function buildDefaultFaqs(city: string, state: string): ServiceAreaFaq[] {
  return [
    {
      question: `How much site preparation is needed for a delivery in ${city}?`,
      answer: `Because our units sit flat on the ground, no stairs or skirting are required. You just need a relatively flat, firm surface like gravel, dirt, or asphalt on your ${city} jobsite.`,
    },
    {
      question: "How do I power the office container?",
      answer:
        "Finished offices include a jobsite breaker panel. Your site electrician typically ties in temporary power from a generator or temporary service using a hardwired line or generator pigtail to run interior outlets, lighting, and climate control.",
    },
    {
      question: `Are these containers secure on ${city} jobsites?`,
      answer:
        "Yes. They are built from one-trip shipping containers and include a 36-inch steel man door with a deadbolt, plus steel security bars over the sliding window(s)—one on 20' models, two on 40' office builds.",
    },
  ];
}

export {
  OFFICE_20_STANDARD_SPECS,
  OFFICE_40_STANDARD_SPECS,
} from "@/lib/productSpecs";

export function buildOfficeContainerProductJsonLd(city: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `40' Office Container in ${city}`,
    offers: {
      "@type": "Offer",
      price: "27900",
      priceCurrency: "USD",
    },
  };
}
