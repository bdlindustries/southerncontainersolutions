import { MapPin } from "lucide-react";
import LocationDirectory from "@/components/LocationDirectory";

export const metadata = {
  title: "Service Areas | Southern Container Solutions",
  description:
    "Southern Container Solutions delivers heavy-duty, ground-level office containers to commercial construction, maritime, and petrochemical sites across the Gulf Coast.",
  alternates: {
    canonical: "https://southerncontainersolutions.com/locations",
  },
};

export default function LocationsHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 animate-in fade-in duration-300">
      <header className="bg-slate-950 py-16 md:py-20 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 text-slate-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>Gulf South Coverage</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            Service Areas
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-3xl leading-relaxed">
            Southern Container Solutions delivers heavy-duty, ground-level office containers to
            commercial construction, maritime, and petrochemical sites across the Gulf Coast.
            Select your market below for local delivery logistics, jobsite specs, and turnkey mobile
            office options.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <LocationDirectory />
      </div>
    </div>
  );
}
