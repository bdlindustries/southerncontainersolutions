"use client";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { AlertTriangle, CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import { db } from "@/lib/firebase";
import { sendSiteLeadEmail } from "@/lib/leads";

export default function DeliveryPage() {
  const [formData, setFormData] = useState({ email: '', product: '', address: '', type: 'Commercial', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'scs_leads'), {
        ...formData,
        formType: 'delivery-quote',
        submittedAt: serverTimestamp(),
      });
      await sendSiteLeadEmail('Southern Container Solutions - Delivery quote', {
        formType: 'delivery-quote',
        email: formData.email.trim(),
        product: formData.product.trim(),
        address: formData.address.trim(),
        type: formData.type,
        message: formData.message.trim(),
      });
      setStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white py-16 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16 items-center">
          <div>
            <h2 className="text-5xl font-black text-slate-950 mb-6 uppercase tracking-tight">Delivery Made Simple</h2>
            <p className="text-slate-600 text-xl leading-relaxed mb-6">
              We ship containers anywhere in the continental United States. Delivery cost is paid directly to a third party trucking company. We coordinate everything on your behalf.
            </p>
            <div className="inline-flex items-center bg-slate-100 text-slate-900 px-4 py-2 rounded-lg font-bold">
              <ShieldCheck className="w-5 h-5 text-amber-500 mr-2" /> No Markups. No Surprises.
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96">
            <img
              src="/delivery-container-office.png"
              alt="Modified office container on a flatbed trailer, ready for delivery"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white font-bold flex items-center">
              <Truck className="w-5 h-5 mr-2 text-amber-500" /> Tilt bed delivery to your site
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-black text-slate-950 mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-amber-500" /> Site Requirements
            </h3>
            <ul className="space-y-6">
              <li className="flex flex-col">
                <span className="font-bold text-slate-900">1. Level Ground</span>
                <span className="text-slate-600 text-sm mt-1">Ground must be reasonably level to ensure doors open and close properly.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-slate-900">2. Clearance Space</span>
                <span className="text-slate-600 text-sm mt-1">Trucks need up to 100ft of straight clearance to slide a 40ft container off a tilt bed trailer.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-slate-900">3. Overhead Clearance</span>
                <span className="text-slate-600 text-sm mt-1">Ensure no low hanging power lines or tree branches obstruct the drop zone.</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            {status === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Quote Request Sent</h3>
                <p className="text-slate-600">We will calculate freight and contact you shortly.</p>
              </div>
            ) : status === 'error' ? (
              <div className="text-center py-12">
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Submission Failed</h3>
                <p className="text-slate-600 mb-6">Something went wrong. Please try again or call us directly.</p>
                <button onClick={() => setStatus('idle')} className="bg-slate-950 hover:bg-slate-800 text-white px-6 py-3 rounded font-bold transition-colors">Try Again</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-black mb-4">Request a Delivery Quote</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email (Required)</label>
                    <input required type="email" className="w-full bg-slate-50 border border-slate-300 rounded p-3 focus:border-amber-500 outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Product Interested In</label>
                    <select className="w-full bg-slate-50 border border-slate-300 rounded p-3 focus:border-amber-500 outline-none" onChange={e => setFormData({...formData, product: e.target.value})}>
                      <option>20&apos; Standard Office</option>
                      <option>40&apos; Combo Unit</option>
                      <option>Custom Build</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Delivery Address / Zip Code</label>
                  <input required type="text" className="w-full bg-slate-50 border border-slate-300 rounded p-3 focus:border-amber-500 outline-none" onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="locType" value="Commercial" defaultChecked className="text-amber-500 focus:ring-amber-500" onChange={e => setFormData({...formData, type: e.target.value})} />
                    <span className="font-bold text-sm">Commercial Address</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="locType" value="Residential" className="text-amber-500 focus:ring-amber-500" onChange={e => setFormData({...formData, type: e.target.value})} />
                    <span className="font-bold text-sm">Residential Address</span>
                  </label>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Message / Site Details</label>
                  <textarea rows={3} className="w-full bg-slate-50 border border-slate-300 rounded p-3 focus:border-amber-500 outline-none" onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                </div>
                <button type="submit" disabled={status === 'submitting'} className="bg-slate-950 hover:bg-slate-800 disabled:opacity-60 text-white px-8 py-4 rounded font-bold transition-colors">
                  {status === 'submitting' ? 'Submitting...' : 'Send Delivery Info'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
