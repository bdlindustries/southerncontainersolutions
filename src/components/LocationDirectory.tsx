import Link from "next/link";
import { MapPin } from "lucide-react";
import { getLocationDirectory, getLocationHref } from "@/lib/locationDirectory";

export default function LocationDirectory() {
  const regions = getLocationDirectory();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
      {regions.map((region) => (
        <section
          key={region.state}
          className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="bg-slate-950 px-6 py-4 border-b-4 border-amber-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <h2 className="text-lg font-black text-white tracking-tight">{region.stateName}</h2>
              <span className="ml-auto text-xs font-bold text-slate-400 uppercase tracking-widest">
                {region.state}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {region.sections.map((section) => (
              <div key={section.label}>
                <h3 className="text-xs font-black text-amber-600 uppercase tracking-widest mb-3">
                  {section.label}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {section.areas.map((area) => (
                    <li key={area.slug}>
                      <Link
                        href={getLocationHref(area)}
                        className="group flex items-center rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5 text-sm font-bold text-slate-800 transition-all hover:border-amber-500/40 hover:bg-amber-50 hover:text-amber-700"
                      >
                        <span className="truncate">
                          {area.city}
                          <span className="text-slate-400 font-medium">, {area.state}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
