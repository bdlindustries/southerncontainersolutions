import { notFound } from "next/navigation";
import ServiceAreaLanding from "@/components/ServiceAreaLanding";
import {
  getAllServiceAreaSlugs,
  getServiceAreaBySlug,
} from "@/lib/data/serviceAreas";

export async function generateStaticParams() {
  return getAllServiceAreaSlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const area = getServiceAreaBySlug(city);
  if (!area) return { title: "Service Area Not Found" };

  return {
    title: `${area.h1} | Southern Container Solutions`,
    description: area.hook,
    alternates: {
      canonical: `https://southerncontainersolutions.com/locations/${area.slug}`,
    },
  };
}

export default async function LocationPage({ params }) {
  const { city } = await params;
  const area = getServiceAreaBySlug(city);

  if (!area) notFound();

  return <ServiceAreaLanding area={area} />;
}
