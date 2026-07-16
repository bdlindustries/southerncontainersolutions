import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Map, PackageOpen, Truck } from 'lucide-react';

export const metadata = {
  title: 'Shipping Container Site Prep & Delivery Requirements in Louisiana',
  description: 'Learn how to prepare your ground for a shipping container, truck turning radiuses, and why leveling is critical on soft Gulf South soil.',
  alternates: {
    canonical: 'https://yourdomain.com/resources/site-prep-delivery'
  }
};

export default function SitePrepArticle() {
  return (
    <div className="min-h-screen bg-white">
      
      <div className="bg-slate-950 py-16 md:py-24 border-b-4 border-amber-500">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <Link className="inline-flex items-center text-amber-500 hover:text-amber-400 font-bold text-sm mb-8 transition-colors" href="/resources">
            <ArrowLeft className="w-4 h-4 mr-2"/> Back to Resources
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
            Site Prep & Delivery: How to Receive a Shipping Container Without Wrecking Your Property
          </h1>
          <div className="flex items-center gap-4 text-slate-400 text-sm font-medium border-t border-slate-800 pt-6">
            <div className="flex items-center gap-2">
              <PackageOpen className="w-5 h-5 text-amber-500"/>
              <span>Southern Container Solutions</span>
            </div>
            <span>•</span>
            <span>6 min read</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16">
        
        
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 mb-12 shadow-sm">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Quick Answers For Buyers</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-950 mb-2">How much space does the delivery truck need?</h3>
              <p className="text-slate-700 leading-relaxed">For a 20 foot container, we need at least 60 feet of straight clearance. For a 40 foot container, we require a minimum of 100 to 120 feet of straight line clearance to allow the tilt bed trailer to safely slide the unit into place.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-950 mb-2">Can I put a shipping container directly on the grass?</h3>
              <p className="text-slate-700 leading-relaxed">It is highly discouraged, especially in the Gulf South. Putting a container directly on grass traps moisture against the steel undercarriage, accelerating rust. It also guarantees the container will sink unevenly into the mud over time, causing the heavy steel doors to jam.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-950 mb-2">What is the best foundation for a container?</h3>
              <p className="text-slate-700 leading-relaxed">The most cost effective and reliable foundation is a compacted crushed concrete or limestone pad, or railroad ties positioned at the four corner castings. The goal is to elevate the container at least 4 to 6 inches off the ground to allow for airflow and drainage.</p>
            </div>
          </div>
        </div>

        
        <article className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-h2:text-3xl prose-h3:text-2xl prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 prose-img:rounded-xl">
          <h2>The Logistics of Heavy Delivery</h2>
          <p>
            Buying a container is the easy part. Getting a 9,000 pound steel box safely onto your property requires careful planning. We deliver using heavy duty tilt bed trailers. These trucks require a massive turning radius and significant overhead clearance (at least 14 to 16 feet) to avoid catching power lines or tree branches when the bed tilts up.
          </p>
          <p>
            If your site is too tight for a tilt bed truck to maneuver, the container cannot simply be dropped. In these tight access scenarios, you will need a commercial heavy duty forklift or crane on site to lift and place the unit. We regularly coordinate heavy equipment logistics to ensure precision placement on difficult commercial sites.
          </p>
          <p>
            <em>Note: Our delivery fleet strictly adheres to the <a href="http://wwwsp.dotd.la.gov/Inside_LaDOTD/Divisions/Engineering/Commercial_Vehicle/Pages/default.aspx" target="_blank" rel="noopener noreferrer">Louisiana DOTD Commercial Vehicle weight and routing regulations</a> to ensure legal and safe transport to your site.</em>
          </p>

          <h2>Fighting the Louisiana Clay</h2>
          <p>
            In St. Tammany Parish and across the Interstate 12 corridor, our biggest enemy is the high water table and soft clay. A container dropped directly onto wet Louisiana soil will sink. 
          </p>
          <p>
            When a container settles unevenly, the steel frame twists slightly, a process known as &quot;racking.&quot; Because the doors weigh hundreds of pounds and have incredibly tight tolerances, even a quarter inch of twist in the frame will make the locking bars permanently jam.
          </p>

          <h3>How to Build a Proper Pad</h3>
          <p>
            You do not necessarily need a poured concrete slab, but you do need elevation and drainage. We recommend the following methods:
          </p>
          <ul>
            <li><strong>Railroad Ties:</strong> Placing treated railroad ties under the front and rear corner castings (the strongest points of the container).</li>
            <li><strong>Crushed Concrete/Limestone:</strong> A leveled, 6 inch compacted pad of crushed limestone provides excellent drainage and prevents the container from sinking.</li>
            <li><strong>Concrete Piers:</strong> Pouring sonotube concrete piers at the four corners for a permanent, perfectly level foundation.</li>
          </ul>

          <h3>Local Delivery Terrain Considerations</h3>
          <p>
            Every region presents unique logistical challenges. For tight, zero-lot-line urban builds in <a href="/locations/metairie-la">Metairie</a>, our ground-level containers bypass the need for sprawling trailer ramps. If you are setting up on the soft, unpaved clay of the Northshore in <a href="/locations/covington-la">Covington</a> or managing heavy civil dirt-work in <a href="/locations/shreveport-la">Shreveport</a>, our tilt-bed delivery ensures your office is dropped perfectly without sinking into the mud. We also run heavy transport directly to Golden Triangle staging sites like <a href="/locations/beaumont-tx">Beaumont</a>.
          </p>

          <hr className="my-12 border-slate-200" />

          <div className="bg-slate-950 rounded-2xl p-8 text-center not-prose">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-slate-950"/>
            </div>
            <h3 className="text-2xl font-black text-white mb-4">Need a Container Dropped on Your Site?</h3>
            <p className="text-slate-400 mb-8">Whether you need raw storage or a temporary commercial rental, we handle the logistics from our yard to your pad.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded font-black transition-colors" href="/raw">
                Shop Raw Storage
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
