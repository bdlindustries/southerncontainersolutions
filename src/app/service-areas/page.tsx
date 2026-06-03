import Link from "next/link";
import { MapPin } from "lucide-react";
import { serviceAreas } from "@/lib/data/serviceAreas";

export const metadata = {
  title: "Areas We Serve | Southern Container Solutions",
  description:
    "Southern Container Solutions delivers heavy-duty, ground-level office containers to commercial construction, maritime, and petrochemical sites across the Gulf Coast.",
  alternates: {
    canonical: "https://www.southerncontainersolutions.com/service-areas",
  },
};

export default function ServiceAreasHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 animate-in fade-in duration-300">
      <header className="bg-slate-950 py-16 md:py-20 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 text-slate-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>Gulf Coast Coverage</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            Areas We Serve
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-3xl leading-relaxed">
            Southern Container Solutions delivers heavy-duty, ground-level office containers to
            commercial construction, maritime, and petrochemical sites across the Gulf Coast. Browse
            our service areas below for local delivery logistics, jobsite specs, and turnkey mobile
            office options in your market.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceAreas.map((area) => (
            <Link
              key={area.slug}
              href={`/service-areas/${area.slug}`}
              className="group flex items-center justify-center min-h-[5rem] bg-white border border-slate-200 rounded-xl p-6 shadow-sm transition-all hover:bg-gray-50 hover:border-amber-500/50 hover:shadow-md"
            >
              <span className="text-lg font-black text-slate-950 group-hover:text-amber-600 transition-colors text-center">
                {area.city}, {area.state}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
