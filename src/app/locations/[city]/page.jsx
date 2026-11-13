import { notFound } from "next/navigation";
import ServiceAreaLanding from "@/components/ServiceAreaLanding";
import { buildOfficeContainerProductJsonLd } from "@/lib/serviceAreaDefaults";
import {
  getAllLocationSlugs,
  isKnownLocationSlug,
  normalizeLocationSlug,
  resolveLocationArea,
} from "@/lib/locationSlugs";
import { pageOpenGraph } from "@/lib/pageOpenGraph";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllLocationSlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  if (!isKnownLocationSlug(city)) {
    return { title: "Service Area Not Found" };
  }
  const area = resolveLocationArea(city);
  if (!area) return { title: "Service Area Not Found" };

  const canonicalSlug = normalizeLocationSlug(area.slug);

  const path = `/locations/${canonicalSlug}`;

  return {
    title: `${area.heroHeadline} | Southern Container Solutions`,
    description: area.heroSub,
    alternates: {
      canonical: path,
    },
    openGraph: pageOpenGraph(path, {
      title: `${area.heroHeadline} | Southern Container Solutions`,
      description: area.heroSub,
    }),
  };
}

export default async function LocationPage({ params }) {
  const { city } = await params;
  if (!isKnownLocationSlug(city)) notFound();
  const area = resolveLocationArea(city);
  if (!area) notFound();

  const productJsonLd = buildOfficeContainerProductJsonLd(area.city);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ServiceAreaLanding area={area} />
    </>
  );
}
