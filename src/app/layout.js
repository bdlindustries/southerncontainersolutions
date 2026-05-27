import { Inter } from 'next/font/google';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Southern Container Solutions | Custom Shipping Container Offices",
  description: "Premium shipping container modifications and mobile offices. Custom 20' and 40' container conversions serving the Northshore and Gulf Coast.",
  keywords: ["shipping container office", "container conversion", "mobile office", "Covington", "Mandeville", "Slidell", "Madisonville", "Hammond"],
  openGraph: {
    title: "Southern Container Solutions | Custom Container Offices",
    description: "Premium 20' and 40' shipping container offices and modifications. Built tough. Ready to deploy.",
    url: "https://southerncontainersolutions.com/",
    siteName: "Southern Container Solutions",
    type: "website",
  }
};

export default function RootLayout({ children }) {
  const localSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Southern Container Solutions",
    "url": "https://southerncontainersolutions.com/",
    "telephone": "+1-985-250-0708",
    "description": "Premium shipping container modifications and custom mobile offices.",
    "areaServed": [
      "Covington, LA",
      "Mandeville, LA",
      "Slidell, LA",
      "Madisonville, LA",
      "Abita Springs, LA",
      "Hammond, LA",
      "Ponchatoula, LA",
      "Folsom, LA",
      "Pearl River, LA",
      "Lacombe, LA"
    ],
    "priceRange": "$$"
  };

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
              'phone_conversion_number': '9852500708'
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
