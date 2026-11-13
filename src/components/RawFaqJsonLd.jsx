import { buildFaqPageJsonLd } from "@/lib/faqJsonLd";
import { RAW_PAGE_FAQS } from "@/lib/rawPageContent";

export default function RawFaqJsonLd() {
  const jsonLd = buildFaqPageJsonLd(RAW_PAGE_FAQS);
  if (!jsonLd) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
