import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Zap } from "lucide-react";
import { SEED_INVENTORY, getProductPathSlug, listingImageUrls } from "@/lib/data";
import { getLiveInventory, getProductBySlug } from "@/lib/firebase";
import { getYoutubeEmbedUrl } from "@/lib/youtube";
import ProductPurchaseActions from "@/components/ProductPurchaseActions";
import ProductImageGallery from "@/components/ProductImageGallery";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.title} | Southern Container Solutions`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const inventory = await getLiveInventory();
  const source = inventory.length ? inventory : SEED_INVENTORY;
  return source.map((product) => ({
    slug: getProductPathSlug(product),
  }));
}

export const dynamicParams = true;

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) notFound();

  const features = Array.isArray(product.listingFeatures) && product.listingFeatures.length > 0 
    ? product.listingFeatures 
    : product.features || [];

  const images = listingImageUrls(product);
  const youtubeEmbedUrl = getYoutubeEmbedUrl(product.youtubeUrl || product.videoUrl);

  return (
    <div className="min-h-screen bg-slate-50 py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <Link href="/shop" className="flex items-center gap-2 text-slate-600 hover:text-amber-600 font-bold mb-8 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          Back to catalog
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            <div className="lg:col-span-5 p-4 md:p-6 lg:p-8 bg-slate-100 border-b lg:border-b-0 lg:border-r border-slate-200">
              <div className="mb-4 inline-flex items-center gap-2 bg-slate-950 text-white px-3 py-1.5 text-xs font-bold rounded-lg">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                {product.availability}
              </div>
              <ProductImageGallery images={images} title={product.title} />
              {youtubeEmbedUrl && (
                <div className="mt-4">
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Video walkthrough</p>
                  <div className="aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-950">
                    <iframe
                      src={youtubeEmbedUrl}
                      title={`${product.title} video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-7 p-6 md:p-10 flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <h1 className="text-3xl md:text-4xl font-black text-slate-950 leading-tight">{product.title}</h1>
                <div className="sm:text-right shrink-0">
                  <span className="text-3xl md:text-4xl font-black text-amber-600 block">{product.priceStr}</span>
                  <span className="text-xs text-slate-500 font-bold uppercase">+ Freight</span>
                </div>
              </div>

              <p className="text-slate-600 text-lg leading-relaxed mb-8 whitespace-pre-line">
                {product.listingDescription || product.description}
              </p>

              <h2 className="text-sm font-black text-slate-950 uppercase tracking-widest border-b border-slate-200 pb-2 mb-4">
                Standard features
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mr-2 shrink-0 mt-0.5" />
                    <span className="whitespace-pre-line">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6 border-t border-slate-100">
                <ProductPurchaseActions
                  product={{
                    id: product.id,
                    title: product.title,
                    priceStr: product.priceStr,
                  }}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
