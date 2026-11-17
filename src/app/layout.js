import { Inter } from 'next/font/google';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getLocalBusinessSchema } from '@/lib/localBusinessSchema';
import { SITE_URL } from '@/lib/siteUrl';
import { defaultOpenGraph, defaultTwitter } from '@/lib/defaultSocialMetadata';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Southern Container Solutions",
    template: "%s",
  },
  description:
    "Shipping container offices and modifications built in Covington, Louisiana and delivered across the Gulf South.",
  keywords: ["shipping container office", "container conversion", "mobile office", "Covington", "Mandeville", "Slidell", "Madisonville", "Hammond"],
  openGraph: defaultOpenGraph,
  twitter: defaultTwitter,
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
  },
};

export default function RootLayout({ children }) {
  const localSchema = getLocalBusinessSchema();

  return (
    <html lang="en">
      <head>
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=AW-18133402943" 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18133402943');
            gtag('config', 'G-6ZK38729KP');
            gtag('config', 'AW-18133402943/fsnfCJasoqYcEL-K18ZD', {
              'phone_conversion_number': '9852512316'
            });
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-slate-50 text-slate-900 flex flex-col min-h-screen selection:bg-amber-500 selection:text-slate-950`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
