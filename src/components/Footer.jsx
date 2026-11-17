import Link from "next/link";
import { Clock, MapPin, Phone, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  // TODO: Replace placeholder business hours with your published hours.
  const businessHours = "Mon–Fri, 8:00 AM – 5:00 PM CT";
  // TODO: Add your Facebook page URL.
  const facebookUrl = "https://www.facebook.com/";
  // TODO: Add your LinkedIn company URL.
  const linkedInUrl = "https://www.linkedin.com/";

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col mb-6">
            <h2 className="text-2xl font-black text-white tracking-tighter leading-none m-0">SOUTHERN</h2>
            <span className="text-[10px] font-bold text-amber-600 tracking-[0.2em] uppercase leading-none mt-1">
              Container Solutions
            </span>
          </div>
          <p className="text-sm max-w-sm mb-6 leading-relaxed">
            Premium container offices engineered for durability. Built in Covington, Louisiana, delivered nationwide.
          </p>
          <div className="flex items-start gap-3 text-sm mb-6">
            <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Hours</span>
              <span className="font-medium text-slate-300">{businessHours}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <a
              href={facebookUrl}
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-amber-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" aria-hidden />
              Facebook
            </a>
            <a
              href={linkedInUrl}
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-amber-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" aria-hidden />
              LinkedIn
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Navigation</h4>
          <ul className="space-y-3 text-sm font-medium">
            <li>
              <Link href="/shop" className="hover:text-amber-500 transition-colors">
                Shop Products
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-500 transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-amber-500 transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-amber-500 transition-colors">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/delivery" className="hover:text-amber-500 transition-colors">
                Delivery Info
              </Link>
            </li>
            <li>
              <Link href="/locations" className="hover:text-amber-500 transition-colors">
                Service Areas
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0" />
              <span className="font-medium">Covington, LA</span>
            </li>
            <li className="flex items-center font-medium">
              <Phone className="w-5 h-5 mr-3 text-amber-500" aria-hidden />
              <a href="tel:985-251-2316" className="hover:text-amber-500 transition-colors">
                (985) 251-2316
              </a>
            </li>
            <li className="flex items-center font-medium break-all">
              <Mail className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0" aria-hidden />
              <a href="mailto:info@southerncontainersolutions.com" className="hover:text-amber-500 transition-colors">
                info@southerncontainersolutions.com
              </a>
            </li>
          </ul>
          <ul className="mt-6 space-y-2 text-xs font-medium text-slate-500">
            <li>
              <Link href="/privacy" className="hover:text-amber-500 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-amber-500 transition-colors">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-900 py-6 text-center text-xs font-medium text-slate-500">
        © {year} Southern Container Solutions
      </div>
    </footer>
  );
}
