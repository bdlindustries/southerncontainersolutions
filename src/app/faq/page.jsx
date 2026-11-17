import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pageOpenGraph } from "@/lib/pageOpenGraph";
import { buildFaqPageJsonLd } from "@/lib/faqJsonLd";
import { SHOP_PAGE_FAQS } from "@/lib/shopPageContent";
import ShopFaqSection from "@/components/ShopFaqSection";

export const metadata = {
  title: "Container Office FAQ | Southern Container Solutions",
  description:
    "Permits, financing, lead times, site prep, delivery clearance, and Gulf South container office buying questions—answered.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: pageOpenGraph("/faq", {
    title: "Container Office FAQ | Southern Container Solutions",
    description:
      "Permits, financing, lead times, site prep, delivery clearance, and Gulf South container office buying questions—answered.",
  }),
};

export default function FaqPage() {
  const faqJsonLd = buildFaqPageJsonLd(SHOP_PAGE_FAQS);

  return (
    <div className="min-h-screen bg-slate-50">
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <header className="bg-slate-950 py-16 md:py-20 border-b-4 border-amber-500">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Container Office FAQ
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Answers for procurement teams, contractors, and property owners buying mobile offices across the Gulf South.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <ShopFaqSection title="Buyer FAQ" />
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 font-bold text-amber-700 hover:text-amber-600"
        >
          Browse shop inventory <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}