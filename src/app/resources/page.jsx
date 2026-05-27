import React from 'react';
import Link from 'next/link';
import { PackageOpen, ArrowRight, Droplets, Map, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Shipping Container Resources & Guides | Southern Container Solutions',
  description: 'Expert guides on shipping container offices, custom builds, delivery requirements, and insulation in the Gulf South.'
};

export default function ResourcesPage() {
  const articles = [
    {
      title: 'Stop Shipping Container Condensation: The Only Insulation Method That Works',
      description: 'Learn why shipping containers sweat, why fiberglass insulation fails in metal buildings, and how to permanently stop container rain.',
      href: '/resources/container-condensation',
      icon: Droplets,
      category: 'Build Specs'
    },
    {
      title: 'How to Prep Ground for Shipping Container Delivery',
      description: 'A step by step guide on foundation requirements (crushed concrete pads, railroad ties, gravel) and truck turning radiuses.',
      href: '/resources/site-prep-delivery',
      icon: Map,
      category: 'Logistics'
    },
    {
      title: 'Mega Project Jobsite Offices: Container Specs for Data Centers & Industrial Sites',
      description: 'Why mega projects in Texas and Louisiana are replacing modular trailers with secure, climate controlled shipping container command centers.',
      href: '/resources/industrial-jobsite-offices',
      icon: ShieldCheck,
      category: 'Industrial B2B'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <PackageOpen className="w-8 h-8 text-amber-500"/>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tight mb-6">Expert Resources</h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed">
            Technical guides, build specs, and logistical playbooks from the leaders in Gulf South container conversions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => {
            const Icon = article.icon;
            return (
              <Link className="group bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl transition-all flex flex-col h-full relative overflow-hidden" href={article.href} key={index}>
                <div className="mb-6 flex items-center justify-between relative z-10">
                  <div className="w-12 h-12 bg-slate-100 group-hover:bg-amber-100 rounded-xl flex items-center justify-center transition-colors">
                    <Icon className="w-6 h-6 text-slate-900 group-hover:text-amber-600"/>
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{article.category}</span>
                </div>
                
                <h2 className="text-xl font-black text-slate-950 mb-4 group-hover:text-amber-600 transition-colors relative z-10">
                  {article.title}
                </h2>
                
                <p className="text-slate-600 mb-8 flex-grow relative z-10 font-medium">
                  {article.description}
                </p>
                
                <div className="mt-auto flex items-center text-slate-950 font-black text-sm group-hover:text-amber-600 transition-colors relative z-10">
                  Read Guide <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"/>
                </div>
                
                
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-amber-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-0 blur-2xl"></div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
