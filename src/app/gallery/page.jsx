import { pageOpenGraph } from "@/lib/pageOpenGraph";
import { GALLERY_IMAGES } from "@/lib/galleryImages";

export const metadata = {
  title: "Build & Delivery Gallery | Southern Container Solutions",
  description:
    "Photos from real container office and climate storage deliveries across Louisiana and the Gulf South.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: pageOpenGraph("/gallery", {
    title: "Build & Delivery Gallery | Southern Container Solutions",
    description:
      "Photos from real container office and climate storage deliveries across Louisiana and the Gulf South.",
  }),
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-slate-950 py-16 md:py-20 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Build &amp; Delivery Gallery
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
            Real jobsite photos from finished office and climate storage units we have built and delivered.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((image) => (
            <figure
              key={image.src}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-56 object-cover"
                loading="lazy"
              />
              {image.caption && (
                <figcaption className="px-4 py-3 text-sm font-medium text-slate-600 border-t border-slate-100">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}