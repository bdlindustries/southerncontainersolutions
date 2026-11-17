import Link from "next/link";
import { pageOpenGraph } from "@/lib/pageOpenGraph";

export const metadata = {
  title: "Privacy Policy | Southern Container Solutions",
  description:
    "How Southern Container Solutions collects, uses, and protects information submitted through our website and quote forms.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: pageOpenGraph("/privacy"),
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <LegalHeader title="Privacy Policy" />

      <article className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16 prose prose-slate prose-headings:font-black">
        <p className="lead text-slate-600">
          Southern Container Solutions (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates southerncontainersolutions.com. This policy
          explains what we collect when you use our site or submit a quote or contact form, and how we use that information.
        </p>

        <h2>Information we collect</h2>
        <p>
          When you submit a form on our website, we may collect your email address, delivery address or ZIP code, product
          interest, project details you provide in a message field, and whether the site is commercial or residential. We
          also collect standard server and analytics data (such as pages visited and referring URLs) through cookies and
          similar technologies used for site performance and advertising measurement.
        </p>

        <h2>How we use information</h2>
        <ul>
          <li>Respond to quote, delivery, and purchase inquiries</li>
          <li>Coordinate freight, delivery logistics, and sales follow-up</li>
          <li>Improve our website, inventory presentation, and customer service</li>
          <li>Measure marketing performance (including conversion tracking where enabled)</li>
        </ul>

        <h2>How we share information</h2>
        <p>
          We do not sell your personal information. We may share information with service providers that help us operate
          the website (hosting, email delivery, analytics) and with freight carriers or partners only as needed to fulfill
          your request. We may disclose information if required by law.
        </p>

        <h2>Data retention</h2>
        <p>
          We retain form submissions and related correspondence for as long as needed to complete your request, maintain
          business records, and comply with legal obligations.
        </p>

        <h2>Your choices</h2>
        <p>
          You may contact us to ask questions about information we have about you or to request correction of inaccurate
          contact details. You can also adjust browser settings to limit cookies; some site features may not work fully
          without them.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy:{" "}
          <a href="mailto:info@southerncontainersolutions.com">info@southerncontainersolutions.com</a> or{" "}
          <a href="tel:985-251-2316">(985) 251-2316</a>. See also our{" "}
          <Link href="/terms">Terms of Use</Link>.
        </p>

        <p className="text-sm text-slate-500">Last updated: November 16, 2025</p>
      </article>
    </div>
  );
}

function LegalHeader({ title }) {
  return (
    <header className="bg-slate-950 py-14 border-b-4 border-amber-500">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-black text-white">{title}</h1>
      </div>
    </header>
  );
}