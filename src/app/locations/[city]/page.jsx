import { notFound } from "next/navigation";
import ServiceAreaLanding from "@/components/ServiceAreaLanding";
import {
  getAllLocationSlugs,
  normalizeLocationSlug,
  resolveLocationArea,
} from "@/lib/locationSlugs";

export const dynamicParams = true;

export async function generateStaticParams() {
  return getAllLocationSlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const area = resolveLocationArea(city);
  if (!area) return { title: "Service Area Not Found" };

  const canonicalSlug = normalizeLocationSlug(area.slug);

  return {
    title: `${area.heroHeadline} | Southern Container Solutions`,
    description: area.heroSub,
    alternates: {
      canonical: `https://southerncontainersolutions.com/locations/${canonicalSlug}`,
    },
  };
}

export default async function LocationPage({ params }) {
  const { city } = await params;
  const area = resolveLocationArea(city);

  if (!area) notFound();

  return <ServiceAreaLanding area={area} />;
}
