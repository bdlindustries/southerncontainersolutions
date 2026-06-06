import { HardHat, BookOpen } from "lucide-react";

export const metadata = {
  title: "About Us | Southern Container Solutions",
  description: "Premium container offices engineered for durability. Built in Covington, Louisiana, delivered nationwide.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 animate-in fade-in duration-300">
      <div className="bg-slate-950 text-white py-24 px-4 text-center">
        <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase">Who We Are</h2>
        <p className="text-xl text-amber-500 font-bold max-w-2xl mx-auto">
          Your project stays simple. Your cost stays upfront. Your container shows up ready to work.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 -mt-10 relative z-10">
        <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-slate-100">
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Southern Container Solutions builds dependable, purpose built container offices and custom conversions for businesses, contractors, and property owners across the U.S. Our focus is simple: <span className="font-bold text-slate-950">deliver high value units with honest pricing, solid workmanship, and fast turnaround.</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="flex">
              <HardHat className="w-10 h-10 text-amber-500 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-black text-slate-950 text-lg mb-2">Engineered for Durability</h4>
                <p className="text-sm text-slate-600">Every unit has insulated walls, reliable electrical systems, quality HVAC, clean finishes, and secure steel construction. We design units that hold up and stay functional for years.</p>
              </div>
            </div>
            <div className="flex">
              <BookOpen className="w-10 h-10 text-amber-500 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-black text-slate-950 text-lg mb-2">Transparent Process</h4>
                <p className="text-sm text-slate-600">Buying a container office shouldn&apos;t require endless quoting or hard to find pricing. Every unit is listed clearly, and you can request to purchase with transparent next steps.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-2xl font-black text-slate-950 mb-2">Need a custom modification?</h3>
              <p className="text-slate-600 text-sm mb-4 md:mb-0">Our Louisiana facility handles complex builds daily.</p>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-bold text-slate-900">Covington, LA</span>
              <a href="tel:9852512356" className="text-amber-600 font-bold hover:underline">(985) 251-2356</a>
              <a href="mailto:info@southerncontainersolutions.com" className="text-slate-500 text-sm hover:text-slate-900">info@southerncontainersolutions.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
