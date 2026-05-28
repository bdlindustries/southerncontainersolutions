"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { sendSiteLeadEmail } from "@/lib/leads";

export default function DeliveryQuoteForm() {
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

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Quote Request Sent</h3>
        <p className="text-slate-600">We will calculate freight and contact you shortly.</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Submission Failed</h3>
        <p className="text-slate-600 mb-6">Something went wrong. Please try again or call us directly.</p>
        <button onClick={() => setStatus('idle')} className="bg-slate-950 hover:bg-slate-800 text-white px-6 py-3 rounded font-bold transition-colors">Try Again</button>
      </div>
    );
  }

  return (
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
  );
}
