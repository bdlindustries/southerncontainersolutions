import { AlertTriangle, ShieldCheck, Truck, Video } from "lucide-react";
import { getDeliveryPageSettings } from "@/lib/firebase";
import { getYoutubeEmbedUrl } from "@/lib/youtube";
import DeliveryQuoteForm from "./DeliveryQuoteForm";

export default async function DeliveryPage() {
  const settings = await getDeliveryPageSettings();
  const youtubeEmbedUrl = getYoutubeEmbedUrl(settings.youtubeUrl);

  return (
    <div className="min-h-screen bg-white py-16 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16 items-center">
          <div>
            <h2 className="text-5xl font-black text-slate-950 mb-6 uppercase tracking-tight">Delivery Made Simple</h2>
            <p className="text-slate-600 text-xl leading-relaxed mb-6">
              We ship containers anywhere in the continental United States. Delivery cost is paid directly to a third party trucking company. We coordinate everything on your behalf.
            </p>
            <div className="inline-flex items-center bg-slate-100 text-slate-900 px-4 py-2 rounded-lg font-bold">
              <ShieldCheck className="w-5 h-5 text-amber-500 mr-2" /> No Markups. No Surprises.
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96">
            <img
              src="/delivery-container-office.png"
              alt="Modified office container on a flatbed trailer, ready for delivery"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white font-bold flex items-center">
              <Truck className="w-5 h-5 mr-2 text-amber-500" /> Tilt bed delivery to your site
            </div>
          </div>
        </div>

        {youtubeEmbedUrl && (
          <div className="mb-16 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Video className="w-5 h-5 text-amber-500" />
              <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tight">See How Delivery Works</h3>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-950">
              <iframe
                src={youtubeEmbedUrl}
                title="Delivery walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-black text-slate-950 mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-amber-500" /> Site Requirements
            </h3>
            <ul className="space-y-6">
              <li className="flex flex-col">
                <span className="font-bold text-slate-900">1. Level Ground</span>
                <span className="text-slate-600 text-sm mt-1">Ground must be reasonably level to ensure doors open and close properly.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-slate-900">2. Clearance Space</span>
                <span className="text-slate-600 text-sm mt-1">Trucks need up to 100ft of straight clearance to slide a 40ft container off a tilt bed trailer.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-slate-900">3. Overhead Clearance</span>
                <span className="text-slate-600 text-sm mt-1">Ensure no low hanging power lines or tree branches obstruct the drop zone.</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <DeliveryQuoteForm />
          </div>
        </div>
      </div>
    </div>
  );
}
