import Link from "next/link";
import { MapPin, Phone, Mail, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col mb-6">
            <h2 className="text-2xl font-black text-white tracking-tighter leading-none m-0">SOUTHERN</h2>
            <span className="text-[10px] font-bold text-amber-600 tracking-[0.2em] uppercase leading-none mt-1">Container Solutions</span>
          </div>
          <p className="text-sm max-w-sm mb-6 leading-relaxed">
            Premium container offices engineered for durability. Built in Covington, Louisiana, delivered nationwide.
          </p>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">A BDL Industries Company</span>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Navigation</h4>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link href="/shop" className="hover:text-amber-500 transition-colors">Finished Offices</Link></li>
            <li><Link href="/raw" className="hover:text-amber-500 transition-colors">Raw Containers</Link></li>
            <li><Link href="/rentals" className="hover:text-amber-500 transition-colors">Rentals</Link></li>
            <li><Link href="/custom-builds" className="hover:text-amber-500 transition-colors">Custom Builds</Link></li>
            <li><Link href="/delivery" className="hover:text-amber-500 transition-colors">Delivery Info</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Service Areas</h4>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link href="/locations/covington-la" className="hover:text-amber-500 transition-colors">Covington, LA</Link></li>
            <li><Link href="/locations/beaumont-tx" className="hover:text-amber-500 transition-colors">Beaumont, TX</Link></li>
            <li><Link href="/locations/jackson-ms" className="hover:text-amber-500 transition-colors">Jackson, MS</Link></li>
            <li><Link href="/locations/columbus-ms" className="hover:text-amber-500 transition-colors">Columbus, MS</Link></li>
          </ul>
        </div>

        <div id="contact">
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0" />
              <span className="font-medium">Covington, LA</span>
            </li>
            <li className="flex items-center font-medium">
              <Phone className="w-5 h-5 mr-3 text-amber-500" /> (985) 250-0708
            </li>
            <li className="flex items-center font-medium break-all">
              <Mail className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0" /> info@southerncontainersolutions.com
            </li>
          </ul>
          <Link
            href="/admin"
            className="mt-8 inline-flex items-center gap-2 text-slate-400 hover:text-amber-500 text-xs font-bold uppercase tracking-widest transition-colors border border-slate-700 hover:border-amber-500/60 rounded-lg px-4 py-2"
          >
            <Lock className="w-3.5 h-3.5" /> Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
