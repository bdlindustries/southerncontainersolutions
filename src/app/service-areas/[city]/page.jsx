import { notFound } from "next/navigation";
import ServiceAreaLanding from "@/components/ServiceAreaLanding";
import { buildOfficeContainerProductJsonLd } from "@/lib/serviceAreaDefaults";
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

  const canonicalPath = area.routePath ?? `/service-areas/${area.slug}`;

  return {
    title: `${area.heroHeadline} | Southern Container Solutions`,
    description: area.heroSub,
    alternates: {
      canonical: `https://www.southerncontainersolutions.com${canonicalPath}`,
    },
  };
}

export default async function ServiceAreaPage({ params }) {
  const { city } = await params;
  const area = getServiceAreaBySlug(city);

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
