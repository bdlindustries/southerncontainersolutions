/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/shop',
        permanent: true,
      },

      // Legacy lead / info URLs → shop
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

      // Mississippi Gulf Coast city landing pages
      {
        source: '/service-areas/gulfport-ms',
        destination: '/gulfport-ms',
        permanent: true,
      },
      {
        source: '/service-areas/pascagoula-ms',
        destination: '/pascagoula-ms',
        permanent: true,
      },
      {
        source: '/locations/gulfport-ms.html',
        destination: '/gulfport-ms',
        permanent: true,
      },
      {
        source: '/locations/pascagoula-ms.html',
        destination: '/pascagoula-ms',
        permanent: true,
      },
      {
        source: '/locations/gulfport-ms',
        destination: '/gulfport-ms',
        permanent: true,
      },
      {
        source: '/locations/pascagoula-ms',
        destination: '/pascagoula-ms',
        permanent: true,
      },

      // Alabama & Louisiana Gulf Coast city landing pages
      {
        source: '/service-areas/mobile-al',
        destination: '/mobile-al',
        permanent: true,
      },
      {
        source: '/service-areas/morgan-city-la',
        destination: '/morgan-city-la',
        permanent: true,
      },
      {
        source: '/service-areas/geismar-la',
        destination: '/geismar-la',
        permanent: true,
      },
      {
        source: '/locations/mobile-al.html',
        destination: '/mobile-al',
        permanent: true,
      },
      {
        source: '/locations/morgan-city-la.html',
        destination: '/morgan-city-la',
        permanent: true,
      },
      {
        source: '/locations/geismar-la.html',
        destination: '/geismar-la',
        permanent: true,
      },
      {
        source: '/locations/mobile-al',
        destination: '/mobile-al',
        permanent: true,
      },
      {
        source: '/locations/morgan-city-la',
        destination: '/morgan-city-la',
        permanent: true,
      },
      {
        source: '/locations/geismar-la',
        destination: '/geismar-la',
        permanent: true,
      },

      // Old static location landing pages → shop
      {
        source: '/locations/:slug.html',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/locations/:slug',
        destination: '/shop',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
