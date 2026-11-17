import Link from "next/link";
import { pageOpenGraph } from "@/lib/pageOpenGraph";

export const metadata = {
  title: "Terms of Use | Southern Container Solutions",
  description: "Terms of use for southerncontainersolutions.com, including quote forms and site content.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: pageOpenGraph("/terms"),
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-slate-950 py-14 border-b-4 border-amber-500">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-black text-white">Terms of Use</h1>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16 prose prose-slate prose-headings:font-black">
        <p className="lead text-slate-600">
          By using southerncontainersolutions.com, you agree to these terms. If you do not agree, please do not use the
          site.
        </p>

        <h2>Website purpose</h2>
        <p>
          This site provides information about shipping container offices, storage units, rentals, delivery, and related
          services offered by Southern Container Solutions. Product specifications, pricing, and availability are subject
          to change without notice until confirmed in writing.
        </p>

        <h2>Quotes and forms</h2>
        <p>
          Submitting a quote or contact form does not create a binding contract. We may follow up by phone or email to
          confirm specifications, freight, taxes, and payment terms. You agree that contact information you provide is
          accurate and that you are authorized to request quotes for the project described.
        </p>

        <h2>No warranty on site content</h2>
        <p>
          Site content is provided for general information. While we strive for accuracy, we do not guarantee that every
          description, image, or technical detail is error-free. Published shop specifications govern finished product
          builds unless a custom scope is agreed in writing.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, Southern Container Solutions is not liable for indirect or consequential
          damages arising from use of this website. Our liability for any claim related to site use is limited to the
          amount you paid us for the specific transaction giving rise to the claim, if any.
        </p>

        <h2>External links</h2>
        <p>
          Links to third-party sites (including rental partners or carriers) are provided for convenience. We are not
          responsible for their content or policies.
        </p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of the State of Louisiana, without regard to conflict-of-law rules.</p>

        <h2>Contact</h2>
        <p>
          <a href="mailto:info@southerncontainersolutions.com">info@southerncontainersolutions.com</a> ·{" "}
          <a href="tel:985-251-2316">(985) 251-2316</a> · <Link href="/privacy">Privacy Policy</Link>
        </p>

        <p className="text-sm text-slate-500">Last updated: November 16, 2025</p>
      </article>
    </div>
  );
}