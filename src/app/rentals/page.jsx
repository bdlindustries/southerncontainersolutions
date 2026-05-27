import React from 'react';
import Link from 'next/link';
import { HardHat, FileText, Truck, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Mobile Offices & Portable Office Buildings for Rent | Big Rentals',
  description: 'Rent heavy-duty steel mobile offices and portable office buildings. A secure alternative to standard United Rentals trailers.',
  alternates: {
    canonical: 'https://yourdomain.com/rentals'
  }
};

export default function RentalsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-slate-950 py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500 via-slate-950 to-slate-950"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold text-sm mb-8">
            <ShieldCheck className="w-4 h-4"/> Fleet Managed by Big Rentals
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            Heavy-Duty <span className="text-amber-500">Mobile Offices</span> &<br />Portable Buildings
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-10 leading-relaxed">
            Stop renting flimsy wooden trailers that get broken into. Our Corten steel containerized offices provide vault-like security for commercial jobsites across the South.
          </p>
          <a href="https://big.rentbigger.com/covington-la/mobile-offices?sortBy=relevance&sortDirection=desc&categoryIds=4&pageSize=30&keyword=&locationIds=1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded font-black text-lg transition-all shadow-[0_4px_14px_0_rgba(245,158,11,0.39)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.23)] hover:-translate-y-0.5">
            View Live Rental Inventory <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>

      {/* Procurement / B2B Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 -mt-12 relative z-20">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center">
              <FileText className="w-10 h-10 text-amber-500" />
            </div>
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-2xl font-black text-slate-950 mb-4">Seamless Commercial Procurement</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              We know how industrial site logistics work. We bypass the corporate red tape you get with massive rental chains so you can get your command center on the dirt tomorrow.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <li className="flex items-center text-slate-700 font-bold"><ShieldCheck className="w-5 h-5 text-amber-500 mr-2" /> Purchase Orders (POs) Accepted</li>
              <li className="flex items-center text-slate-700 font-bold"><FileText className="w-5 h-5 text-amber-500 mr-2" /> Net-30 Billing for Approved Accounts</li>
              <li className="flex items-center text-slate-700 font-bold"><Truck className="w-5 h-5 text-amber-500 mr-2" /> Rapid Heavy-Duty Delivery</li>
              <li className="flex items-center text-slate-700 font-bold"><HardHat className="w-5 h-5 text-amber-500 mr-2" /> OSHA Compliant Steps & Ramps</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SEO Internal Link Funnel */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <div className="bg-slate-900 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
          <div>
            <div className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-2">Related Expert Guide</div>
            <h3 className="text-xl font-black text-white">Why Mega-Projects Choose Container Command Centers</h3>
          </div>
          <Link href="/resources/industrial-jobsite-offices" className="whitespace-nowrap bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded font-bold transition-colors flex items-center">
            Read Full Specs <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
