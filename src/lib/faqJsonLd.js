/** Build FAQPage JSON-LD that must match visible on-page FAQ text. */
export function buildFaqPageJsonLd(faqs) {
  if (!Array.isArray(faqs) || !faqs.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}
