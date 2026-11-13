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
        "Yes. They are built from one-trip shipping containers and include a 36-inch steel man door with a deadbolt, plus heavy-duty steel security bars over both sliding windows.",
    },
  ];
}

export const STANDARD_OFFICE_CONTAINER_SPECS = [
  "Climate-controlled finished interior (insulation + HVAC)",
  "Moisture-resistant PVC wall and ceiling panels",
  "Interior and exterior LED lighting",
  "Jobsite electrical package with breaker panel and multiple outlets",
  'Two sliding windows with steel security bars',
  'Steel man door with deadbolt',
  "Operational cargo doors for equipment access",
] as const;

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
