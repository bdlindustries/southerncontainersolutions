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
