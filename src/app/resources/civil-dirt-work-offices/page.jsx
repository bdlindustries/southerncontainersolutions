import React from 'react';
import Link from 'next/link';
import { ArrowLeft, PackageOpen, Shovel } from 'lucide-react';

export const metadata = {
  title: 'Civil Dirt Work Offices: Container Specs for Unpaved Jobsites | Southern Container Solutions',
  description: 'How moisture resistant PVC interiors and closed cell spray foam make container offices the best choice for heavy civil, distribution, and unpaved construction sites.',
  alternates: {
    canonical: 'https://yourdomain.com/resources/civil-dirt-work-offices'
  }
};

export default function CivilDirtWorkOfficesArticle() {
  return (
    <div className="min-h-screen bg-white">

      <div className="bg-slate-950 py-16 md:py-24 border-b-4 border-amber-500">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <Link className="inline-flex items-center text-amber-500 hover:text-amber-400 font-bold text-sm mb-8 transition-colors" href="/resources">
            <ArrowLeft className="w-4 h-4 mr-2"/> Back to Resources
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
            Managing Dust and Heat on Unpaved Heavy Civil Construction Sites
          </h1>
          <div className="flex items-center gap-4 text-slate-400 text-sm font-medium border-t border-slate-800 pt-6">
            <div className="flex items-center gap-2">
              <PackageOpen className="w-5 h-5 text-amber-500"/>
              <span>Southern Container Solutions</span>
            </div>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16">

        <article className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-h2:text-3xl prose-h3:text-2xl prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 prose-img:rounded-xl">
          <h2>Managing Dust and Heat on Unpaved Heavy Civil Construction Sites</h2>
          <p>
            Heavy civil engineering projects distribution center builds and major infrastructure expansions share a common enemy: unpaved terrain. Managing a project in the middle of a massive dirt pad means dealing with relentless dust heavy mud and brutal summer heat.
          </p>
          <h3>The Maintenance Nightmare of Traditional Mobile Offices</h3>
          <p>
            When crews constantly track mud and dust into a standard office trailer, the residential grade drywall and cheap paneling quickly absorb the grime and moisture. The poorly insulated walls fail to hold the air conditioning causing the HVAC unit to run endlessly and burn out while your site managers sweat over their blueprints.
          </p>
          <h3>Built for the Dirt</h3>
          <p>
            Our commercial container offices are engineered for raw jobsite conditions. We finish the interiors with smooth moisture resistant PVC wall and ceiling panels. Instead of scrubbing drywall, your crew can easily wipe down or even pressure wash the interior. We utilize 2 inch closed cell spray foam insulation to create an impenetrable thermal break allowing the dedicated 12,000 BTU LG mini split to maintain perfect climate control regardless of the outside temperature.
          </p>
          <h3>Delivered to the Toughest Inland Projects</h3>
          <p>
            Our heavy duty tilt bed trucks deliver these units directly to unpaved sites without sinking off blocks. From heavy distribution builds in <a href="/locations/hammond-la">Hammond</a> and <a href="/locations/shreveport-la">Shreveport</a>, to major commercial expansions in <a href="/locations/denham-springs-la">Denham Springs</a> and <a href="/locations/gonzales-la">Gonzales</a>, we provide remote operations centers that thrive in the dirt.
          </p>

          <hr className="my-12 border-slate-200" />

          <div className="bg-slate-950 rounded-2xl p-8 text-center not-prose">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shovel className="w-8 h-8 text-slate-950"/>
            </div>
            <h3 className="text-2xl font-black text-white mb-4">Staging on an Unpaved Dirt Pad?</h3>
            <p className="text-slate-400 mb-8">We deliver climate controlled container offices built to handle dust, mud, and inland heat.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded font-black transition-colors" href="/shop">
                View Turn Key Offices
              </Link>
              <Link className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded font-bold transition-colors" href="/rentals">
                View Commercial Rentals
              </Link>
            </div>
          </div>
        </article>

      </div>
    </div>
  );
}
