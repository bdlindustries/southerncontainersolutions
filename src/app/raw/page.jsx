"use client";
import { useState } from "react";
import Link from "next/link";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Lock,
  PackageOpen,
  Truck,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { sendSiteLeadEmail } from "@/lib/leads";

const AVAILABLE_INVENTORY = [
  {
    id: '20-wwt',
    size: "20'",
    grade: 'Wind & Watertight (WWT)',
    type: 'Portable Storage Unit / Conex Box',
    height: "Standard (8'6\")",
    note: 'Budget friendly jobsite dry storage',
  },
  {
    id: '20-one-trip',
    size: "20'",
    grade: 'One Trip Shipping Container',
    type: 'Premium Conex Box',
    height: "Standard (8'6\")",
    note: 'Near new condition, minimal cosmetic wear',
  },
  {
    id: '40-wwt',
    size: "40'",
    grade: 'Wind & Watertight (WWT)',
    type: 'Portable Storage Unit / Conex Box',
    height: "Standard or High Cube",
    note: 'High capacity laydown and equipment storage',
  },
  {
    id: '40-cwo',
    size: "40'",
    grade: 'Cargo Worthy (CWO)',
    type: 'Industrial Conex Box',
    height: "Standard (8'6\") or High Cube (9'6\")",
    note: 'Certified structural integrity for heavy loads',
  },
];

export default function RawContainersPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', zip: '', container: '20_WWT_STD' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'scs_leads'), {
        ...formData,
        formType: 'raw-container-quote',
        submittedAt: serverTimestamp(),
      });
      await sendSiteLeadEmail('Southern Container Solutions - Portable storage quote', {
        formType: 'raw-container-quote',
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        zip: formData.zip.trim(),
        container: formData.container,
      });
      setStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 animate-in fade-in duration-300">
      {/* Hero */}
      <header className="bg-slate-950 py-16 md:py-24 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 text-slate-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
            <PackageOpen className="w-4 h-4 text-amber-500" />
            <span>Industrial Jobsite Storage</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 max-w-4xl">
            Portable Storage Units & Conex Boxes
          </h1>
          <p className="text-xl text-slate-300 font-medium max-w-3xl leading-relaxed mb-6">
            Source heavy duty Corten steel conex boxes and One Trip Shipping Containers directly from Gulf South depots. Built for contractors who need secure, wind and water tight portable storage units on active jobsites.
          </p>
          <p className="text-slate-400 max-w-3xl leading-relaxed">
            Pricing fluctuates daily with depot supply. Request a quote below for today&apos;s exact freight and availability on 20&apos; and 40&apos; portable storage units.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        {/* Industrial specs */}
        <section className="mb-20">
          <h2 className="text-3xl font-black text-slate-950 mb-4">Industrial Storage Specs</h2>
          <p className="text-slate-600 text-lg max-w-3xl mb-10 leading-relaxed">
            Our portable storage units and conex boxes are spec&apos;d for commercial jobsites, not backyard DIY. Every unit is Corten steel, not thin modular siding.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-3">Secure Corten Steel</h3>
              <p className="text-slate-600 leading-relaxed">
                Structural Cor-Ten steel shells resist break ins and weather abuse on remote industrial sites. A true conex box, not a wood framed shed.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-3">Wind & Watertight (WWT)</h3>
              <p className="text-slate-600 leading-relaxed">
                WWT graded portable storage units are guaranteed not to leak. Keep materials, tools, and inventory dry through Louisiana rain and Gulf Coast humidity.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-3">Secure Lockboxes</h3>
              <p className="text-slate-600 leading-relaxed">
                Factory lockboxes and heavy duty locking bars protect high value jobsite equipment, copper, and tools when the site shuts down at night.
              </p>
            </div>
          </div>
        </section>

        {/* Available Inventory */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-950 mb-2">Available Inventory</h2>
              <p className="text-slate-600 font-medium">Representative portable storage units and conex boxes we source weekly.</p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-bold text-amber-600">
              <Truck className="w-4 h-4" /> Nationwide delivery available
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AVAILABLE_INVENTORY.map((unit) => (
              <div key={unit.id} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-black text-amber-600 uppercase tracking-widest">{unit.type}</span>
                    <h3 className="text-2xl font-black text-slate-950 mt-1">{unit.size} {unit.grade}</h3>
                  </div>
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                    <PackageOpen className="w-6 h-6 text-slate-500" />
                  </div>
                </div>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-2">{unit.height}</p>
                <p className="text-slate-600">{unit.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-sm font-bold flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            Exact unit condition and pricing confirmed at quote. Submit the form below for depot availability in your delivery zone.
          </div>
        </section>

        {/* Quote form */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-black text-slate-950 mb-4">Request a Conex Box Quote</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Tell us your jobsite zip and whether you need a 20&apos; or 40&apos; portable storage unit, WWT grade, Cargo Worthy, or a One Trip Shipping Container. We coordinate depot sourcing and third party delivery to your pad.
              </p>
              <ul className="space-y-3 text-slate-700 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" /> Portable Storage Units</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" /> Conex Boxes (20&apos; & 40&apos;)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" /> One Trip Shipping Containers</li>
              </ul>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 md:p-10 border border-slate-800 shadow-2xl">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-black text-white mb-2">Quote Requested</h3>
                  <p className="text-slate-400">We are checking depot availability and freight rates. We will contact you shortly.</p>
                </div>
              ) : status === 'error' ? (
                <div className="text-center py-12">
                  <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-black text-white mb-2">Submission Failed</h3>
                  <p className="text-slate-400 mb-6">Something went wrong. Please try again or call us directly.</p>
                  <button onClick={() => setStatus('idle')} className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded font-black transition-colors">Try Again</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-black text-white mb-2 border-b border-slate-800 pb-4">Check Availability & Pricing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                      <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone</label>
                      <input required type="tel" className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email</label>
                      <input required type="email" className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Delivery Zip Code</label>
                      <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" placeholder="Required for freight" onChange={e => setFormData({...formData, zip: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Portable Storage Unit Size & Grade</label>
                    <select className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, container: e.target.value})}>
                      <optgroup label="20 Foot Conex Boxes">
                        <option value="20_WWT_STD">20&apos; WWT Portable Storage Unit</option>
                        <option value="20_CWO_STD">20&apos; Cargo Worthy Conex Box</option>
                        <option value="20_ONE_STD">20&apos; One Trip Shipping Container</option>
                      </optgroup>
                      <optgroup label="40 Foot Conex Boxes">
                        <option value="40_WWT_STD">40&apos; WWT Portable Storage Unit</option>
                        <option value="40_CWO_STD">40&apos; Cargo Worthy Conex Box</option>
                        <option value="40_WWT_HC">40&apos; High Cube WWT</option>
                        <option value="40_ONE_HC">40&apos; One Trip Shipping Container</option>
                      </optgroup>
                    </select>
                  </div>
                  <button disabled={status === 'submitting'} className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-950 py-4 rounded font-black text-lg transition-colors">
                    {status === 'submitting' ? 'Submitting...' : 'Request Exact Quote'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* SEO internal link */}
        <section className="border-t border-slate-200 pt-16">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Related Expert Guide</h3>
          <Link
            href="/resources/site-prep-delivery"
            className="group flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-amber-500/40 transition-all"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
                <BookOpen className="w-6 h-6 text-amber-500 group-hover:text-slate-950 transition-colors" />
              </div>
              <span className="text-lg md:text-xl font-black text-slate-950 group-hover:text-amber-600 transition-colors">
                Read our Guide on Site Prep & Delivery Requirements
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all shrink-0 ml-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
