"use client";

import { useState } from "react";
import { CheckCircle2, FileText } from "lucide-react";
import RequestPurchaseModal, { PURCHASE_SUCCESS_MESSAGE } from "./RequestPurchaseModal";

export default function ProductPurchaseActions({ product }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true);
  };

  return (
    <div className="space-y-4">
      {showSuccess && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-5 flex gap-3">
          <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
          <p className="text-slate-700 leading-relaxed">{PURCHASE_SUCCESS_MESSAGE}</p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-4 rounded-lg font-black text-lg transition-all text-center flex items-center justify-center gap-2 shadow-md"
      >
        Request Purchase <FileText className="w-5 h-5" />
      </button>

      <RequestPurchaseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
        product={product}
      />
    </div>
  );
}
