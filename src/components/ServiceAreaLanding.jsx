import Link from "next/link";
import { ArrowRight, MapPin, PackageOpen } from "lucide-react";
import { getImageAlt } from "@/lib/serviceAreaLocalSeo";
import { STANDARD_OFFICE_CONTAINER_SPECS } from "@/lib/serviceAreaDefaults";

export default function ServiceAreaLanding({ area }) {
  const imageAlt = getImageAlt(area.city, area.state);
  const heroImage = area.image ?? "/images/jobsite-office-container.png";

  return (
    <div className="min-h-screen bg-slate-50 animate-in fade-in duration-300">
      <header className="bg-slate-950 py-16 md:py-24 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 text-slate-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>
              {area.city}, {area.state}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6 max-w-4xl">
            {area.heroHeadline}
          </h1>
          <p className="text-xl text-slate-300 font-medium max-w-3xl leading-relaxed">
            {area.heroSub}
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-20 space-y-12">
        <figure className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          <img
            src={heroImage}
            alt={imageAlt}
            className="w-full h-auto object-cover"
          />
        </figure>

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
          <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">
            {area.localIndustryFocus}
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10 space-y-4">
          <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">
            {area.localDeliveryLogistics}
          </p>
          <p className="text-slate-900 font-bold text-lg leading-relaxed">
            Primary {area.city} Delivery Routes: {area.localHighways}
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
          <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">
            {area.localClimateSpecs}
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
          <h2 className="text-2xl font-black text-slate-950 mb-6">
            Standard 40&apos; Office Features
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {STANDARD_OFFICE_CONTAINER_SPECS.map((spec) => (
              <li
                key={spec}
                className="flex items-start gap-2 text-slate-700 text-base leading-relaxed"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                {spec}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
          <div className="flex-1 flex flex-col gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded-lg font-black transition-colors"
            >
              <PackageOpen className="w-5 h-5" />
              View Available Units
            </Link>
            <Link
              href="/rentals"
              className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-slate-600 hover:text-amber-600 border border-slate-300 hover:border-amber-400 px-6 py-2.5 rounded-lg transition-colors"
            >
              Need it short-term? Explore our Rental Fleet →
            </Link>
          </div>
          <Link
            href="/delivery"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-black transition-colors"
          >
            Request Delivery Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
          <h2 className="text-2xl font-black text-slate-950 mb-6">
            Frequently Asked Questions in {area.city}
          </h2>
          <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
            {area.faqs.map((faq) => (
              <details key={faq.question} className="group bg-slate-50 open:bg-white">
                <summary className="cursor-pointer list-none px-6 py-4 font-bold text-slate-950 hover:text-amber-600 transition-colors flex items-center justify-between gap-4">
                  <span>{faq.question}</span>
                  <span className="text-amber-500 text-xl leading-none group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 text-slate-700 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
