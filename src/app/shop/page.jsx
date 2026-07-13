import Link from "next/link";
import { Zap, ChevronRight, PackageOpen, ShieldCheck, Thermometer, BookOpen, ArrowRight } from "lucide-react";
import { listingImageUrls, getProductPathSlug } from "@/lib/data";
import { getLiveInventory } from "@/lib/firebase";

export const metadata = {
  title: "Mobile Offices & Containerized Offices for Sale | Southern Container Solutions",
  description:
    "Buy climate controlled, secure portable office buildings and containerized offices for mega projects. Turn key mobile offices built in Louisiana, delivered nationwide.",
  alternates: {
    canonical: "https://yourdomain.com/shop",
  },
};

export default async function ShopPage() {
  const inventory = await getLiveInventory();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <header className="bg-slate-950 py-16 md:py-24 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 text-slate-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
            <PackageOpen className="w-4 h-4 text-amber-500" />
            <span>Turn Key Mobile Offices</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 max-w-4xl">
            Mobile Offices & Containerized Offices
          </h1>
          <p className="text-xl text-slate-300 font-medium max-w-3xl leading-relaxed">
            Purchase climate controlled portable office buildings engineered for commercial jobsites and mega projects. Transparent pricing on finished containerized offices, ready for nationwide delivery.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        {/* B2B specs */}
        <section className="mb-20">
          <h2 className="text-3xl font-black text-slate-950 mb-4">Built for Commercial Procurement</h2>
          <p className="text-slate-600 text-lg max-w-3xl mb-10 leading-relaxed">
            Our mobile offices and portable office buildings are containerized offices, not flimsy modular wood trailers. Every unit is spec&apos;d for active construction and industrial operations across the Gulf South.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-3">Vault Like Security</h3>
              <p className="text-slate-600 leading-relaxed">
                Corten steel containerized offices with deadbolts and window security bars. A secure alternative to breakable modular wood jobsite trailers.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center mb-6">
                <Thermometer className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-3">Closed Cell Spray Foam</h3>
              <p className="text-slate-600 leading-relaxed">
                Seamless closed cell spray foam insulation creates a 100% thermal barrier for extreme Southern heat. No fiberglass, no container rain, no rot.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center mb-6">
                <PackageOpen className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-3">Commercial Grade PVC</h3>
              <p className="text-slate-600 leading-relaxed">
                Moisture resistant commercial grade PVC paneling throughout. Professional finish that survives dirty jobsites and pressure washing.
              </p>
            </div>
          </div>
        </section>

        {/* Turn-Key Inventory */}
        <section className="mb-20">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-950 mb-2">Turn Key Inventory</h2>
            <p className="text-slate-600 text-lg max-w-3xl">
              Browse mobile offices, containerized offices, and portable office buildings with transparent pricing. Select a unit for full specs and purchase request.
            </p>
          </div>

          <div className="space-y-8">
            {inventory.map((product) => {
              const imgUrl = listingImageUrls(product)[0];
              return (
                <div key={product.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row hover:shadow-md transition-shadow">
                  <div className="w-full lg:w-2/5 relative lg:min-w-[min(100%,380px)] p-4 lg:p-6 bg-slate-100">
                    <div className="absolute top-6 left-6 z-20 bg-slate-950/90 text-white px-3 py-1.5 text-xs font-bold rounded flex items-center shadow-lg">
                      <Zap className="w-3 h-3 text-amber-400 mr-1.5 shrink-0" /> {product.availability}
                    </div>
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={product.title}
                        className="w-full h-64 lg:h-full object-cover rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-64 lg:h-full flex items-center justify-center bg-slate-200 rounded-xl">
                        <PackageOpen className="w-12 h-12 text-slate-400" />
                      </div>
                    )}
                  </div>

                  <div className="w-full lg:w-3/5 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <span className="text-xs font-black text-amber-600 uppercase tracking-widest">Containerized Office</span>
                          <h2 className="text-3xl font-black text-slate-950 mb-2 md:mb-0 pr-4">{product.title}</h2>
                        </div>
                        <div className="text-left md:text-right shrink-0">
                          <span className="text-3xl font-black text-amber-600 block">{product.priceStr}</span>
                          <span className="text-xs text-slate-500 font-bold uppercase">+ Freight</span>
                        </div>
                      </div>
                      <p className="text-slate-600 text-lg mb-6 leading-relaxed">{product.description}</p>
                    </div>

                    <div className="flex gap-3 pt-6 border-t border-slate-100">
                      <Link href={`/shop/${getProductPathSlug(product)}`} className="flex-1 bg-slate-950 hover:bg-slate-800 text-white py-4 rounded-lg font-black text-sm transition-colors flex items-center justify-center gap-2">
                        View Mobile Office Specs <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SEO internal link */}
        <section className="border-t border-slate-200 pt-16">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Related Expert Guide</h3>
          <Link
            href="/resources/container-condensation"
            className="group flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-amber-500/40 transition-all"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
                <BookOpen className="w-6 h-6 text-amber-500 group-hover:text-slate-950 transition-colors" />
              </div>
              <span className="text-lg md:text-xl font-black text-slate-950 group-hover:text-amber-600 transition-colors">
                How We Permanently Stop Container Condensation
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all shrink-0 ml-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
