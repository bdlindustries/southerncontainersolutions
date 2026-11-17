import Link from "next/link";
import { ArrowRight, MapPin, PackageOpen } from "lucide-react";
import { getImageAlt } from "@/lib/serviceAreaLocalSeo";
import { OFFICE_20_STANDARD_SPECS, OFFICE_40_STANDARD_SPECS } from "@/lib/serviceAreaDefaults";
import { getNearbyLocationSlugs } from "@/lib/locationSeo";
import { normalizeLocationSlug, resolveLocationArea } from "@/lib/locationSlugs";

export default function ServiceAreaLanding({ area }) {
  const defaultAlt = getImageAlt(area.city, area.state);
  const gallery =
    area.heroImages?.length > 0
      ? area.heroImages
      : [{ src: area.heroImage, alt: area.imageAlt ?? defaultAlt }];

  const industryHeading =
    area.sectionHeadings?.industry ??
    `${area.city} Jobsite and Industrial Applications`;
  const deliveryHeading =
    area.sectionHeadings?.delivery ?? `Delivery Logistics in ${area.city}, ${area.state}`;
  const climateHeading =
    area.sectionHeadings?.climate ??
    `Climate-Controlled Shipping Container Offices in ${area.city}, ${area.state}`;

  const isDeliveryShowcase = Boolean(area.buildModifications && area.heroImages?.length);

  const nearbyAreas = getNearbyLocationSlugs(area.slug)
    .map((slug) => resolveLocationArea(slug))
    .filter(Boolean);

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
          <h2 className="text-xl text-slate-300 font-medium max-w-3xl leading-relaxed">
            {area.heroSub}
          </h2>
          {isDeliveryShowcase && (
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded-xl font-black text-lg transition shadow-lg ring-2 ring-amber-400/40"
            >
              <PackageOpen className="w-5 h-5" />
              Shop Products
            </Link>
          )}
        </div>
      </header>

      {isDeliveryShowcase && (
        <section className="bg-amber-500 border-b-4 border-amber-600 shadow-lg">
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-amber-900 mb-1">
                Ready to Buy
              </p>
              <p className="text-xl md:text-2xl font-black text-slate-950 leading-tight">
                Shop In-Stock Container Offices &amp; Storage Units
              </p>
              <p className="text-slate-900 font-semibold mt-2 text-sm md:text-base">
                See pricing online and buy direct — we deliver to your jobsite.
              </p>
            </div>
            <Link
              href="/shop"
              className="shrink-0 inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-black text-lg transition shadow-xl"
            >
              <PackageOpen className="w-5 h-5" />
              Shop Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      )}

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-20 space-y-12">
        <nav aria-label="Breadcrumb" className="text-sm font-semibold text-slate-500 -mt-4">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-amber-600 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/locations" className="hover:text-amber-600 transition-colors">
                Locations
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-800">
              {area.city}, {area.state}
            </li>
          </ol>
        </nav>

        {area.localUniqueIntro && (
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
            <h2 className="text-2xl font-black text-slate-950 mb-4">
              Shipping Container Offices &amp; Storage in {area.city}
            </h2>
            <p className="text-slate-700 text-lg leading-relaxed">{area.localUniqueIntro}</p>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-black text-slate-950 mb-6">
            Verified Delivery Photos in {area.city}, {area.state}
          </h2>
          <div className={gallery.length > 1 ? "grid grid-cols-1 gap-6" : ""}>
            {gallery.map((image) => (
              <figure
                key={image.src}
                className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover"
                />
              </figure>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
          <h2 className="text-2xl font-black text-slate-950 mb-6">{industryHeading}</h2>
          <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">
            {area.localIndustryFocus}
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10 space-y-4">
          <h2 className="text-2xl font-black text-slate-950">{deliveryHeading}</h2>
          <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">
            {area.localDeliveryLogistics}
          </p>
          <p className="text-slate-900 font-bold text-lg leading-relaxed">
            Primary {area.city} Delivery Routes: {area.localHighways}
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
          <h2 className="text-2xl font-black text-slate-950 mb-6">{climateHeading}</h2>
          <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">
            {area.localClimateSpecs}
          </p>
        </section>

        {area.buildModifications && (
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
            <h2 className="text-2xl font-black text-slate-950 mb-8">
              {area.buildModifications.heading}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {area.buildModifications.groups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-lg font-black text-slate-950 mb-4">{group.title}</h3>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-slate-700 text-base leading-relaxed"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {area.localShopRentalsParagraph && (
          <section className="bg-amber-50 rounded-2xl border border-amber-200 shadow-sm p-8 md:p-10">
            <h2 className="text-xl font-black text-slate-950 mb-4">
              Buy, Rent, or Store on Your {area.city} Jobsite
            </h2>
            <p className="text-slate-800 text-lg leading-relaxed">
              {area.localShopRentalsParagraph}{" "}
              <Link href="/shop" className="font-bold text-amber-700 hover:text-amber-800 underline">
                Shop offices
              </Link>
              ,{" "}
              <Link href="/raw" className="font-bold text-amber-700 hover:text-amber-800 underline">
                raw storage containers
              </Link>
              , and{" "}
              <Link href="/rentals" className="font-bold text-amber-700 hover:text-amber-800 underline">
                rentals
              </Link>
              .
            </p>
          </section>
        )}

        {nearbyAreas.length > 0 && (
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
            <h2 className="text-2xl font-black text-slate-950 mb-4">Nearby Service Areas</h2>
            <p className="text-slate-600 mb-4">
              We also deliver shipping container offices and storage containers to communities
              around {area.city}:
            </p>
            <ul className="flex flex-wrap gap-3">
              {nearbyAreas.map((neighbor) => (
                <li key={neighbor.slug}>
                  <Link
                    href={`/locations/${normalizeLocationSlug(neighbor.slug)}`}
                    className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-800 hover:border-amber-400 hover:text-amber-700 transition-colors"
                  >
                    {neighbor.city}, {neighbor.state}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10 space-y-10">
          <p className="text-slate-600 leading-relaxed">
            Shop product pages are the source of truth. Standard finished office builds follow the specs below.
          </p>
          <div>
            <h2 className="text-xl font-black text-slate-950 mb-4">20&apos; standard office</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {OFFICE_20_STANDARD_SPECS.map((spec) => (
                <li
                  key={spec}
                  className="flex items-start gap-2 text-slate-700 text-base leading-relaxed"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-950 mb-4">40&apos; standard office</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {OFFICE_40_STANDARD_SPECS.map((spec) => (
                <li
                  key={spec}
                  className="flex items-start gap-2 text-slate-700 text-base leading-relaxed"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
          <div className="flex-1 flex flex-col gap-3">
            <Link
              href="/shop"
              className={`inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded-lg font-black transition-colors ${
                isDeliveryShowcase ? "text-lg shadow-lg ring-2 ring-amber-400/50" : ""
              }`}
            >
              <PackageOpen className="w-5 h-5" />
              {isDeliveryShowcase ? "Shop Products" : "View Available Units"}
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
