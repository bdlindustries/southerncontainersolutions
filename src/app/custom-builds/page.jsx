"use client";
import { useState } from "react";
import Link from "next/link";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { AlertTriangle, CheckCircle2, BookOpen, ArrowRight } from "lucide-react";
import { db } from "@/lib/firebase";
import { sendSiteLeadEmail } from "@/lib/leads";

export default function CustomBuildsPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', details: '', size: '20ft' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'scs_leads'), {
        ...formData,
        formType: 'custom-build-quote',
        submittedAt: serverTimestamp(),
      });
      await sendSiteLeadEmail('Southern Container Solutions - Custom build quote', {
        formType: 'custom-build-quote',
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        size: formData.size,
        details: formData.details.trim(),
      });
      setStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen py-20 text-white animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">Need a modification? We can help.</h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Need an extra window, custom door placement, a half bath, or an electrical upgrade? We handle straightforward modifications to our standard units to fit your exact needs. Describe your project, and we&apos;ll provide a firm quote.
          </p>
          <div className="space-y-8">
            <div className="flex">
              <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center flex-shrink-0 mr-4 border border-slate-800"><span className="font-black text-amber-500">1</span></div>
              <div><h4 className="text-xl font-bold mb-2">Submit Your Needs</h4><p className="text-slate-400">Tell us what you need added or changed from our standard layouts. We review requests daily.</p></div>
            </div>
            <div className="flex">
              <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center flex-shrink-0 mr-4 border border-slate-800"><span className="font-black text-amber-500">2</span></div>
              <div><h4 className="text-xl font-bold mb-2">Quote & Timeline</h4><p className="text-slate-400">We provide a straightforward, firm price quote and a realistic timeline for your build.</p></div>
            </div>
            <div className="flex">
              <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center flex-shrink-0 mr-4 border border-slate-800"><span className="font-black text-amber-500">3</span></div>
              <div><h4 className="text-xl font-bold mb-2">Fabrication</h4><p className="text-slate-400">Your unit is modified at our Covington facility, inspected, and shipped directly to your site.</p></div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-8 md:p-10 border border-slate-800 shadow-2xl relative">
          {status === 'success' ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-3xl font-black mb-2">Request Received</h3>
              <p className="text-slate-400">Our team will review your specs and contact you shortly.</p>
            </div>
          ) : status === 'error' ? (
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-3xl font-black mb-2">Submission Failed</h3>
              <p className="text-slate-400 mb-6">Something went wrong. Please try again or call us directly.</p>
              <button onClick={() => setStatus('idle')} className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded font-black transition-colors">Try Again</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-2xl font-black mb-6 border-b border-slate-800 pb-4">Request a Quote</h3>
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
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email</label>
                <input required type="email" className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Container Size</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, size: e.target.value})}>
                  <option value="20ft">20-Foot Container</option>
                  <option value="40ft">40-Foot Container</option>
                  <option value="unsure">Not Sure Yet</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project Details</label>
                <textarea required rows={4} className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500" onChange={e => setFormData({...formData, details: e.target.value})}></textarea>
              </div>
              <button disabled={status === 'submitting'} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-4 rounded font-black text-lg transition-colors flex justify-center items-center">
                {status === 'submitting' ? 'Submitting...' : 'Submit Specs'}
              </button>
            </form>
          )}
        </div>

        <section className="mt-20 pt-16 border-t border-slate-800 col-span-full">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Related Expert Guides</h3>
          <Link
            href="/resources/container-condensation"
            className="group flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-amber-500/40 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-400 transition-colors">
                <BookOpen className="w-6 h-6 text-slate-950" />
              </div>
              <span className="text-lg md:text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                How We Permanently Stop Container Condensation
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0 ml-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
