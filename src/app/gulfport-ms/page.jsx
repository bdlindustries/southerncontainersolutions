import { notFound } from "next/navigation";
import ServiceAreaLanding from "@/components/ServiceAreaLanding";
import { getServiceAreaBySlug } from "@/lib/data/serviceAreas";

const SLUG = "gulfport-ms";

export const metadata = {
  title:
    "Custom Shipping Container Offices & Modifications in Gulfport, MS | Southern Container Solutions",
  description:
    "Custom shipping container offices and modifications for Gulfport, MS contractors, port operations, and Gulf Coast jobsites. Climate-controlled 20' and 40' units built in Louisiana and delivered ground-level.",
  alternates: {
    canonical: "https://www.southerncontainersolutions.com/gulfport-ms",
  },
};

export default function GulfportMsPage() {
  const area = getServiceAreaBySlug(SLUG);
  if (!area) notFound();
  return <ServiceAreaLanding area={area} />;
}
