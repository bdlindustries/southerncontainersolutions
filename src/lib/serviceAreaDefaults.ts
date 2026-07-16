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
        "The unit includes a 100-amp breaker panel. You can have your site electrician hardwire a permanent line or wire up a custom pigtail to your jobsite generator to power the eighteen interior outlets, LED lights, and 12,000 BTU AC.",
    },
    {
      question: `Are these containers secure on ${city} jobsites?`,
      answer:
        "Yes. They are built from one-trip shipping containers and include a 36-inch steel man door with a deadbolt, plus heavy-duty steel security bars over both sliding windows.",
    },
  ];
}

export const STANDARD_OFFICE_CONTAINER_SPECS = [
  '2" closed-cell spray foam',
  "12,000 BTU LG mini split heat pump (AC & Heat)",
  "Moisture-resistant PVC wall/ceiling panels",
  "4 interior LED lights",
  "1 exterior photocell light",
  "18 interior outlets",
  "100-amp breaker panel",
  'two 42"x30" sliding windows with steel security bars',
  '36" steel man door with deadbolt',
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
