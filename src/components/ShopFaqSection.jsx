import Link from "next/link";
import { SHOP_PAGE_FAQS } from "@/lib/shopPageContent";

export default function ShopFaqSection({ title = "Office Container Buyer FAQ" }) {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-black text-slate-950 mb-6">{title}</h2>
      <div className="max-w-3xl divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
        {SHOP_PAGE_FAQS.map((faq) => (
          <details key={faq.question} className="group bg-slate-50 open:bg-white">
            <summary className="cursor-pointer list-none px-6 py-4 font-bold text-slate-950 hover:text-amber-600 transition-colors flex items-center justify-between gap-4">
              <span>{faq.question}</span>
              <span className="text-amber-500 text-xl leading-none group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <div className="px-6 pb-5 text-slate-700 leading-relaxed">{faq.answer}</div>
          </details>
        ))}
      </div>
      <p className="mt-6 text-slate-600 text-sm">
        Need delivery logistics? Read our{" "}
        <Link href="/resources/site-prep-delivery" className="font-bold text-amber-700 hover:underline">
          site prep and delivery guide
        </Link>
        .
      </p>
    </section>
  );
}