import Link from "next/link";
import { ArrowRight, MapPin, Truck, PackageOpen, Thermometer, Shield } from "lucide-react";
import {
  getClimateControlContent,
  getImageAlt,
  getLocalDeliveryContent,
  getStateDisplayName,
} from "@/lib/serviceAreaLocalSeo";

export default function ServiceAreaLanding({ area }) {
  const localDeliveryContent = getLocalDeliveryContent(area);
  const climateControlContent = getClimateControlContent(area.city, area.state);
  const stateName = getStateDisplayName(area.state);
  const imageAlt = getImageAlt(area.city, area.state);

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
              alt={imageAlt}
              className="w-full h-auto object-cover"
            />
          </figure>
        )}

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-black text-amber-600 uppercase tracking-widest">
              Built for Your Jobsite
            </h2>
          </div>
          <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">
            {area.industryFocus}
          </p>
          <p className="text-slate-600 text-base leading-relaxed mt-6">
            Browse{" "}
            <Link href="/shop" className="text-amber-600 font-bold hover:text-amber-700">
              turnkey container offices
            </Link>{" "}
            with transparent pricing, or start a{" "}
            <Link href="/custom-builds" className="text-amber-600 font-bold hover:text-amber-700">
              custom build
            </Link>{" "}
            engineered for {area.city} petrochemical, maritime, and mega-project requirements.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
          <div className="flex items-center gap-2 mb-4">
            <Truck className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-black text-slate-950 uppercase tracking-widest">
              Local Delivery &amp; Logistics in {area.city}
            </h2>
          </div>
          <div className="text-slate-700 text-lg leading-relaxed space-y-6">
            {localDeliveryContent.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
          <div className="flex items-center gap-2 mb-4">
            <Thermometer className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-black text-slate-950 uppercase tracking-widest">
              Climate Control Specs for {stateName} Weather
            </h2>
          </div>
          <div className="text-slate-700 text-lg leading-relaxed space-y-6">
            {climateControlContent.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
          <p className="text-slate-600 text-base leading-relaxed mt-6">
            Learn more about moisture management in our{" "}
            <Link
              href="/resources/container-condensation"
              className="text-amber-600 font-bold hover:text-amber-700"
            >
              container condensation guide
            </Link>{" "}
            and{" "}
            <Link href="/resources/site-prep-delivery" className="text-amber-600 font-bold hover:text-amber-700">
              site prep for delivery
            </Link>
            .
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
