import Link from "next/link";
import { ShoppingCart, ChevronRight, PackageOpen } from "lucide-react";
import { listingImageUrls } from "@/lib/data";
import { getLiveInventory } from "@/lib/firebase";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const inventory = await getLiveInventory();

  return (
    <div className="animate-in fade-in duration-500">
      <header className="relative bg-slate-950 overflow-hidden min-h-[85vh] flex flex-col lg:flex-row lg:items-stretch">
        <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8 xl:px-12 py-14 lg:py-24 order-2 lg:order-1">
          <div className="max-w-3xl lg:max-w-xl xl:max-w-2xl mx-auto lg:mx-0 lg:ml-auto lg:mr-8 xl:mr-12">
            <div className="inline-flex items-center space-x-2 bg-slate-900/80 border border-slate-700 backdrop-blur-sm text-slate-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Commercial Grade. Built in Louisiana</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              Premium Modular Offices. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Transparent Pricing.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed font-medium">
              Stop waiting days for a quote. We engineer heavy duty container offices for job sites and businesses. See the price, buy direct, and get it delivered.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/shop" className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded font-black text-lg transition-all flex items-center justify-center hover:-translate-y-1">
                Shop Available Units <ShoppingCart className="ml-3 w-5 h-5" />
              </Link>
              <Link href="/custom-builds" className="bg-slate-900/50 hover:bg-slate-800 text-white border border-slate-600 px-8 py-4 rounded font-bold text-lg transition-all flex items-center justify-center backdrop-blur-md">
                Request Custom Build
              </Link>
            </div>
          </div>
        </div>

        <div className="relative w-full lg:w-[50%] xl:w-[48%] min-h-[260px] sm:min-h-[340px] lg:min-h-[85vh] order-1 lg:order-2 shrink-0 bg-slate-800">
          <img
            src="/hero-office-storage-combo.png"
            alt="40 foot container office and storage unit on a job site"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950 lg:bg-gradient-to-l lg:from-slate-950 lg:via-slate-950/25 lg:to-transparent"
            aria-hidden
          />
        </div>
      </header>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-slate-950 mb-4">Featured Inventory</h2>
              <p className="text-slate-600 text-lg font-medium">Standard configurations ready for production.</p>
            </div>
            <Link href="/shop" className="hidden md:flex text-amber-600 hover:text-amber-700 font-bold items-center">
              View All <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {inventory.slice(0, 2).map(product => {
              const imgUrl = listingImageUrls(product)[0];
              return (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                <div className="h-72 overflow-hidden relative bg-slate-100">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200">
                      <PackageOpen className="w-12 h-12 text-slate-400" />
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black text-slate-950">{product.title}</h3>
                    <span className="text-2xl font-black text-amber-600">{product.priceStr}</span>
                  </div>
                  <p className="text-slate-600 mb-6 font-medium line-clamp-2">{product.description}</p>
                  <Link href={`/shop/${product.id}`} className="w-full bg-slate-100 hover:bg-slate-950 text-slate-900 hover:text-white py-4 rounded font-bold transition-colors flex justify-center items-center">
                    View Specifications
                  </Link>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEO SILO DISTRIBUTION SECTION */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-black text-slate-950 mb-6">Container Solutions for Every Build</h2>
            <p className="text-xl text-slate-600 font-medium leading-relaxed">
              Whether you need raw storage, a temporary rental, or a custom engineered mobile workspace, we have the inventory and expertise to execute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-slate-950 rounded-xl flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform">
                <span className="text-amber-500 font-black text-xl">RAW</span>
              </div>
              <h3 className="text-2xl font-black text-slate-950 mb-4">Raw Containers</h3>
              <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                One trip and wind/water tight shipping containers perfect for agricultural storage, construction materials, or your own DIY build.
              </p>
              <Link href="/raw" className="inline-flex items-center text-slate-950 font-black group-hover:text-amber-600 transition-colors">
                View Raw Inventory <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:shadow-xl transition-all shadow-lg group transform md:-translate-y-4">
              <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform">
                <span className="text-slate-950 font-black text-xl">RNT</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Commercial Rentals</h3>
              <p className="text-slate-400 mb-8 leading-relaxed font-medium">
                Short and long term container office rentals for job sites, disaster recovery, and temporary operational expansions.
              </p>
              <Link href="/rentals" className="inline-flex items-center text-amber-500 font-black group-hover:text-amber-400 transition-colors">
                Explore Rentals <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-slate-950 rounded-xl flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform">
                <span className="text-amber-500 font-black text-xl">CST</span>
              </div>
              <h3 className="text-2xl font-black text-slate-950 mb-4">Custom Builds</h3>
              <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                Work directly with our fabrication team to engineer a container modified exactly to your operational blueprints and specs.
              </p>
              <Link href="/custom-builds" className="inline-flex items-center text-slate-950 font-black group-hover:text-amber-600 transition-colors">
                Start a Build <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
