import Link from "next/link";
import { ArrowRight, MapPin, Truck, PackageOpen } from "lucide-react";

export default function ServiceAreaLanding({ area }) {
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
            {area.h1}
          </h1>
          <p className="text-xl text-slate-300 font-medium max-w-3xl leading-relaxed">
            {area.hook}
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-20 space-y-12">
        {area.image && (
          <figure className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <img
              src={area.image}
              alt={area.imageAlt ?? `${area.city}, ${area.state} jobsite office container`}
              className="w-full h-auto object-cover"
            />
          </figure>
        )}

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
          <h2 className="text-sm font-black text-amber-600 uppercase tracking-widest mb-4">
            Built for Your Jobsite
          </h2>
          <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">
            {area.industryFocus}
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
          <div className="flex items-center gap-2 mb-4">
            <Truck className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-black text-slate-950 uppercase tracking-widest">
              Delivery &amp; Logistics
            </h2>
          </div>
          <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">
            {area.logistics}
          </p>
        </section>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/shop"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded-lg font-black transition-colors"
          >
            <PackageOpen className="w-5 h-5" />
            View Available Units
          </Link>
          <Link
            href="/delivery"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-black transition-colors"
          >
            Request Delivery Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
