import { notFound } from "next/navigation";
import ServiceAreaLanding from "@/components/ServiceAreaLanding";
import { getServiceAreaBySlug } from "@/lib/data/serviceAreas";

const SLUG = "pascagoula-ms";

export const metadata = {
  title:
    "Custom Shipping Container Offices & Modifications in Pascagoula, MS | Southern Container Solutions",
  description:
    "Custom shipping container offices and modifications for Pascagoula, MS shipyard, industrial, and construction sites. Heavy-duty 20' and 40' container workspaces delivered ground-level across Jackson County.",
  alternates: {
    canonical: "https://www.southerncontainersolutions.com/pascagoula-ms",
  },
};

export default function PascagoulaMsPage() {
  const area = getServiceAreaBySlug(SLUG);
  if (!area) notFound();
  return <ServiceAreaLanding area={area} />;
}
