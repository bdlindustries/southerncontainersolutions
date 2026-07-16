/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;
