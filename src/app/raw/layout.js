import { pageOpenGraph } from "@/lib/pageOpenGraph";
import RawFaqJsonLd from "@/components/RawFaqJsonLd";

export const metadata = {
  title: "Storage Containers for Sale | Southern Container Solutions",
  description:
    "Buy wind- and water-tight storage containers and Conex boxes for jobsite laydown. 20' and 40' Corten steel units sourced for the Gulf South with delivery quotes by zip.",
  alternates: {
    canonical: "/raw",
  },
  openGraph: pageOpenGraph("/raw", {
    title: "Storage Containers for Sale | Southern Container Solutions",
    description:
      "Buy wind- and water-tight storage containers and Conex boxes for jobsite laydown. 20' and 40' Corten steel units sourced for the Gulf South with delivery quotes by zip.",
  }),
};

export default function RawLayout({ children }) {
  return (
    <>
      <RawFaqJsonLd />
      {children}
    </>
  );
}
