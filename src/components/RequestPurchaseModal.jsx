"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { AlertTriangle, FileText, X } from "lucide-react";
import { db } from "@/lib/firebase";
import { sendSiteLeadEmail } from "@/lib/leads";

export const PURCHASE_SUCCESS_MESSAGE =
  "We received your purchase request. We are calculating the exact freight cost to your ZIP code and will send over your final invoice shortly. If everything looks good, you can easily pay via wire transfer or ACH.";

const SITE_CONDITIONS = [
  "Hard Gravel/Concrete",
  "Packed Dirt",
  "Grass/Field",
];

const INITIAL_FORM = {
  name: "",
  company: "",
  email: "",
  phone: "",
  zip: "",
  siteConditions: SITE_CONDITIONS[0],
};

export default function RequestPurchaseModal({ open, onClose, onSuccess, product }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!open) return;
    setForm(INITIAL_FORM);
    setStatus("idle");
  }, [open, product?.id]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape" && status !== "submitting") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, status]);

  if (!open || !product) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    const formData = {
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      zip: form.zip.trim(),
      siteConditions: form.siteConditions,
      productId: product.id,
      productTitle: product.title,
      productPrice: product.priceStr || "",
    };

    try {
      await addDoc(collection(db, "scs_leads"), {
        ...formData,
        formType: "purchase-request",
        submittedAt: serverTimestamp(),
      });
      await sendSiteLeadEmail("Southern Container Solutions - Purchase request", {
        formType: "purchase-request",
        name: formData.name,
        company: formData.company || "—",
        email: formData.email,
        phone: formData.phone,
        deliveryZip: formData.zip,
        siteConditions: formData.siteConditions,
        product: formData.productTitle,
        productId: formData.productId,
        price: formData.productPrice,
      });
      setForm(INITIAL_FORM);
      setStatus("idle");
      onClose();
      onSuccess?.();
    } catch (err) {
      console.error("Purchase request error:", err);
      setStatus("error");
    }
  };

  const inputCls =
    "w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-amber-500 transition-colors";
  const labelCls = "block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2";

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={status === "submitting" ? undefined : onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="purchase-modal-title"
        className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-t-2xl sm:rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-800 bg-slate-900 px-6 py-5">
          <div>
            <p className="text-xs font-black text-amber-500 uppercase tracking-widest mb-1">Request Purchase</p>
            <h2 id="purchase-modal-title" className="text-xl font-black text-white leading-tight">
              {product.title}
            </h2>
            {product.priceStr && (
              <p className="text-sm font-bold text-slate-400 mt-1">
                {product.priceStr} <span className="text-slate-500">+ freight</span>
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={status === "submitting"}
            className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-50"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-6">
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Submit your details and we will quote exact freight to your delivery ZIP before issuing a final invoice.
          </p>

          {status === "error" && (
            <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-300">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>Something went wrong. Please try again or call us at (985) 251-2356.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelCls}>First &amp; Last Name *</label>
              <input
                required
                type="text"
                autoComplete="name"
                className={inputCls}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>

            <div>
              <label className={labelCls}>Company Name</label>
              <input
                type="text"
                autoComplete="organization"
                className={inputCls}
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Email Address *</label>
                <input
                  required
                  type="email"
                  autoComplete="email"
                  className={inputCls}
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div>
                <label className={labelCls}>Phone Number *</label>
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  className={inputCls}
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className={labelCls}>Delivery ZIP Code *</label>
              <input
                required
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                className={inputCls}
                value={form.zip}
                onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))}
              />
            </div>

            <div>
              <label className={labelCls}>Site Conditions *</label>
              <select
                required
                className={inputCls}
                value={form.siteConditions}
                onChange={(e) => setForm((f) => ({ ...f, siteConditions: e.target.value }))}
              >
                {SITE_CONDITIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-950 py-4 rounded-lg font-black text-base transition-colors"
            >
              <FileText className="w-5 h-5" />
              {status === "submitting" ? "Submitting..." : "Submit Purchase Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
