import Link from "next/link";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export const SEO_RESOURCES = [
  {
    category: "Cost, Value, & Buying Decisions",
    articles: [
      {
        id: "container-conversion-costs",
        title: "Container Conversion Costs",
        desc: "Learn typical price ranges and what factors affect the total cost.",
        content: () => (
          <div className="space-y-8 text-lg text-slate-700 leading-relaxed">
            <p className="text-xl text-slate-600 font-medium leading-relaxed">
              Container conversion costs vary widely depending on size, layout, features, and finish level. A basic conversion can be relatively affordable, while a fully finished container office or custom build can rival the cost of traditional structures.
            </p>
            <h3 className="text-3xl font-black text-slate-950 mt-12 mb-6 border-b border-slate-200 pb-4">Average Cost Tiers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
                <h4 className="font-black text-slate-950 text-xl mb-1">Basic Build</h4>
                <div className="text-amber-600 font-black text-2xl mb-4">$10,000 - $18,000</div>
                <p className="text-sm">Minimal build-out, basic insulation, limited electrical.</p>
              </div>
              <div className="bg-slate-950 text-white border border-slate-800 p-6 rounded-xl shadow-xl relative transform md:-translate-y-2">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-xs font-black uppercase px-3 py-1 rounded-full">Most Common</div>
                <h4 className="font-black text-white text-xl mb-1">Mid-Level Office</h4>
                <div className="text-amber-500 font-black text-2xl mb-4">$18,000 - $30,000</div>
                <p className="text-sm text-slate-300">Fully insulated, finished interior, electrical, HVAC.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
                <h4 className="font-black text-slate-950 text-xl mb-1">High-End Custom</h4>
                <div className="text-amber-600 font-black text-2xl mb-4">$40,000 - $60,000+</div>
                <p className="text-sm">Premium finishes, complex layouts, plumbing.</p>
              </div>
            </div>
            <div className="mt-12 bg-slate-950 text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h4 className="text-2xl font-black mb-2">Ready to get an exact price?</h4>
                <p className="text-slate-400">View our standard models with transparent pricing.</p>
              </div>
              <div className="flex-shrink-0">
                <Link href="/shop" className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded font-black transition-colors w-full inline-block text-center">Shop Inventory</Link>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "pros-cons-conversions",
        title: "Pros and Cons of Container Conversions",
        desc: "A balanced look at the advantages and limitations of shipping container builds.",
        content: () => (
          <div className="space-y-8 text-lg text-slate-700 leading-relaxed">
            <h3 className="text-3xl font-black text-slate-950 mt-12 mb-6 border-b border-slate-200 pb-4 text-green-700 flex items-center">
              <CheckCircle2 className="w-8 h-8 mr-3" /> The Pros
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-950 text-xl mb-3">Durable Steel Construction</h4>
                <p className="text-sm mb-4">Built from structural Cor-Ten steel designed to withstand harsh oceanic environments.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-950 text-xl mb-3">Faster Build Times</h4>
                <p className="text-sm mb-4">Built off-site in controlled facilities and delivered as finished units.</p>
              </div>
            </div>
            <h3 className="text-3xl font-black text-slate-950 mt-12 mb-6 border-b border-slate-200 pb-4 text-red-700 flex items-center">
              <AlertTriangle className="w-8 h-8 mr-3" /> The Cons
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-red-100 p-6 rounded-xl">
                <h4 className="font-bold text-slate-950 text-xl mb-3">Higher Upfront Cost</h4>
                <p className="text-sm">Often cost more upfront than simple wood-framed sheds or unfinished structures.</p>
              </div>
              <div className="border border-red-100 p-6 rounded-xl">
                <h4 className="font-bold text-slate-950 text-xl mb-3">Limited Width</h4>
                <p className="text-sm">Fixed 8-foot external width restricts certain architectural applications.</p>
              </div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    category: "Build Process and Logistics",
    articles: [
      {
        id: "how-conversions-are-built",
        title: "How Container Conversions Are Built",
        desc: "A step-by-step overview of the professional manufacturing process.",
        content: () => (
          <div className="space-y-8 text-lg text-slate-700 leading-relaxed">
            <h3 className="text-3xl font-black text-slate-950 mt-12 mb-8 border-b border-slate-200 pb-4">The Manufacturing Process</h3>
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row md:items-start border-l-4 border-amber-500 pl-6">
                <div className="bg-amber-100 text-amber-600 font-black text-2xl w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0 mb-4 md:mb-0 md:mr-6">1</div>
                <div><h4 className="text-2xl font-black text-slate-950 mb-2">Selecting the Steel</h4><p>We select the appropriate grade (One-Trip or WWT) based on the project.</p></div>
              </div>
              <div className="flex flex-col md:flex-row md:items-start border-l-4 border-amber-500 pl-6">
                <div className="bg-amber-100 text-amber-600 font-black text-2xl w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0 mb-4 md:mb-0 md:mr-6">2</div>
                <div><h4 className="text-2xl font-black text-slate-950 mb-2">Structural Modifications & Reinforcement</h4><p>We weld heavy-duty steel tube framing around every opening to maintain strength.</p></div>
              </div>
              <div className="flex flex-col md:flex-row md:items-start border-l-4 border-amber-500 pl-6">
                <div className="bg-amber-100 text-amber-600 font-black text-2xl w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0 mb-4 md:mb-0 md:mr-6">3</div>
                <div><h4 className="text-2xl font-black text-slate-950 mb-2">Climate Engineering & Insulation</h4><p>Commercial-grade insulation creates a perfect thermal break.</p></div>
              </div>
            </div>
          </div>
        )
      }
    ]
  }
];
