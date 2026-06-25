import { notFound } from "next/navigation";
import ServiceAreaLanding from "@/components/ServiceAreaLanding";
import { getServiceAreaBySlug } from "@/lib/data/serviceAreas";

const SLUG = "geismar-la";

export const metadata = {
  title:
    "Custom Shipping Container Offices & Modifications in Geismar, LA | Southern Container Solutions",
  description:
    "Custom shipping container offices and modifications for Geismar, LA chemical plants, refineries, and heavy industrial turnarounds. Climate-controlled 20' and 40' units delivered ground-level in Ascension Parish.",
  alternates: {
    canonical: "https://www.southerncontainersolutions.com/geismar-la",
  },
};

export default function GeismarLaPage() {
  const area = getServiceAreaBySlug(SLUG);
  if (!area) notFound();
  return <ServiceAreaLanding area={area} />;
}
