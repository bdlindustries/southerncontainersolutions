import { notFound } from "next/navigation";
import ServiceAreaLanding from "@/components/ServiceAreaLanding";
import { getServiceAreaBySlug } from "@/lib/data/serviceAreas";

const SLUG = "mobile-al";

export const metadata = {
  title:
    "Custom Shipping Container Offices & Modifications in Mobile, AL | Southern Container Solutions",
  description:
    "Custom shipping container offices for Mobile, AL maritime, port operations, shipbuilding, and coastal industrial jobsites. Heavy-duty 20' and 40' units built and modified in Louisiana.",
  alternates: {
    canonical: "https://www.southerncontainersolutions.com/mobile-al",
  },
};

export default function MobileAlPage() {
  const area = getServiceAreaBySlug(SLUG);
  if (!area) notFound();
  return <ServiceAreaLanding area={area} />;
}
