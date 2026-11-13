import { ROOT_CITY_REDIRECTS } from "./src/lib/rootCityRedirects.ts";
import { LEGACY_SHOP_REDIRECTS } from "./src/lib/productSlugFixes.ts";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
  const rootCityRedirects = ROOT_CITY_REDIRECTS.map(({ source, destination }) => ({
    source,
    destination,
    permanent: true,
  }));

  const legacyShopRedirects = LEGACY_SHOP_REDIRECTS.map(({ source, destination }) => ({
    source,
    destination,
    permanent: true,
  }));

    return [
      ...rootCityRedirects,
      ...legacyShopRedirects,
      // www → apex (non-www), all paths
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.southerncontainersolutions.com',
          },
        ],
        destination: 'https://southerncontainersolutions.com/:path*',
        permanent: true,
      },

      // Legacy lead / info URLs → shop
      {
        source: '/home',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/container-conversion-cost',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/shipping-container-tiny-homes',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/container-office-vs-shed',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/container-office-interior-options',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/how-container-conversions-are-built',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/shipping-container-office-uses',
        destination: '/shop',
        permanent: true,
      },

      // Legacy service-areas hub → locations hub
      {
        source: '/service-areas',
        destination: '/locations',
        permanent: true,
      },

      // Legacy /service-areas/:path* → clean /locations/:path*
      {
        source: '/service-areas/:path*',
        destination: '/locations/:path*',
        permanent: true,
      },

      // Legacy static .html location pages → clean /locations/:path*
      {
        source: '/locations/:path*.html',
        destination: '/locations/:path*',
        permanent: true,
      },
      {
        source: '/service-areas/:path*.html',
        destination: '/locations/:path*',
        permanent: true,
      },

      // Legacy filenames with dots → canonical slugs
      {
        source: '/locations/bay-st.-louis-ms',
        destination: '/locations/bay-st-louis-ms',
        permanent: true,
      },
      {
        source: '/locations/st.-francisville-la',
        destination: '/locations/st-francisville-la',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
