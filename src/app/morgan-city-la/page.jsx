import { notFound } from "next/navigation";
import ServiceAreaLanding from "@/components/ServiceAreaLanding";
import { getServiceAreaBySlug } from "@/lib/data/serviceAreas";

const SLUG = "morgan-city-la";

export const metadata = {
  title:
    "Commercial Jobsite Office Containers in Morgan City, LA | Southern Container Solutions",
  description:
    "Heavy-duty, marine-grade mobile offices for Morgan City, LA offshore fabrication, shipyards, and port logistics across St. Mary and Lower St. Martin Parishes.",
  alternates: {
    canonical: "https://www.southerncontainersolutions.com/morgan-city-la",
  },
};

export default function MorganCityLaPage() {
  const area = getServiceAreaBySlug(SLUG);
  if (!area) notFound();
  return <ServiceAreaLanding area={area} />;
}
