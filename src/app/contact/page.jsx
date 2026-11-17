import { Mail, MapPin, Phone } from "lucide-react";
import { pageOpenGraph } from "@/lib/pageOpenGraph";
import DeliveryQuoteForm from "@/app/delivery/DeliveryQuoteForm";

export const metadata = {
  title: "Contact Southern Container Solutions | Covington, LA",
  description:
    "Call (985) 251-2316 or email info@southerncontainersolutions.com. Request a quote for container offices, delivery, and custom builds.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: pageOpenGraph("/contact", {
    title: "Contact Southern Container Solutions | Covington, LA",
    description:
      "Call (985) 251-2316 or email info@southerncontainersolutions.com. Request a quote for container offices, delivery, and custom builds.",
  }),
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Get a delivery quote, ask about inventory, or talk through a custom build. We respond to every form submission.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <ContactInfo />

          <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200">
            <DeliveryQuoteForm />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Direct</h2>
        <ul className="space-y-5 text-slate-800">
          <li className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p>
              <span className="block text-xs font-bold text-slate-500 uppercase">Phone</span>
              <a href="tel:985-251-2316" className="font-bold hover:text-amber-700">
                (985) 251-2316
              </a>
            </p>
          </li>
          <li className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p>
              <span className="block text-xs font-bold text-slate-500 uppercase">Email</span>
              <a
                href="mailto:info@southerncontainersolutions.com"
                className="font-bold break-all hover:text-amber-700"
              >
                info@southerncontainersolutions.com
              </a>
            </p>
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p>
              <span className="block text-xs font-bold text-slate-500 uppercase">Location</span>
              <span className="font-bold">Covington, LA</span>
            </p>
          </li>
        </ul>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">
        Prefer the phone? Call during business hours. For freight estimates, include your delivery address or ZIP in the form.
      </p>
    </div>
  );
}