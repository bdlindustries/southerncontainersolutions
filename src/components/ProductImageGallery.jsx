"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, PackageOpen } from "lucide-react";

export default function ProductImageGallery({ images = [], title = "Product" }) {
  const urls = images.filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!urls.length) {
    return (
      <div className="w-full aspect-[4/3] flex items-center justify-center bg-slate-200 rounded-xl border border-slate-200">
        <PackageOpen className="w-16 h-16 text-slate-400" />
      </div>
    );
  }

  const safeIndex = Math.min(activeIndex, urls.length - 1);
  const hasMultiple = urls.length > 1;

  const goTo = (index) => {
    if (index < 0) setActiveIndex(urls.length - 1);
    else if (index >= urls.length) setActiveIndex(0);
    else setActiveIndex(index);
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <img
          src={urls[safeIndex]}
          alt={`${title}, photo ${safeIndex + 1} of ${urls.length}`}
          className="w-full h-auto rounded-xl border border-slate-200"
          referrerPolicy="no-referrer"
        />

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={() => goTo(safeIndex - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/75 hover:bg-slate-950 text-white flex items-center justify-center transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(safeIndex + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/75 hover:bg-slate-950 text-white flex items-center justify-center transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 right-3 bg-slate-950/75 text-white text-xs font-bold px-2.5 py-1 rounded-md">
              {safeIndex + 1} / {urls.length}
            </div>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {urls.map((src, idx) => (
            <button
              key={`${src}-${idx}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                idx === safeIndex
                  ? "border-amber-500 ring-2 ring-amber-500/30"
                  : "border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-400"
              }`}
              aria-label={`View photo ${idx + 1}`}
              aria-current={idx === safeIndex ? "true" : undefined}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
