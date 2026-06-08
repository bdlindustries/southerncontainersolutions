/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // /contact has no page — send quote intent to the custom-build form
      {
        source: '/contact',
        destination: '/custom-builds',
        permanent: true,
      },

      // Price shoppers → quote form
      {
        source: '/container-conversion-cost',
        destination: '/custom-builds',
        permanent: true,
      },

      // Off-topic or comparison content → homepage (shop + custom-build CTAs)
      {
        source: '/shipping-container-tiny-homes',
        destination: '/',
        permanent: true,
      },
      {
        source: '/container-office-vs-shed',
        destination: '/',
        permanent: true,
      },

      // Office-related legacy articles → shop or quote paths
      {
        source: '/container-office-interior-options',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/how-container-conversions-are-built',
        destination: '/custom-builds',
        permanent: true,
      },
      {
        source: '/shipping-container-office-uses',
        destination: '/shop',
        permanent: true,
      },

      // Old location landing pages → matching service area (shop + delivery CTAs)
      {
        source: '/locations/:slug.html',
        destination: '/service-areas/:slug',
        permanent: true,
      },
      {
        source: '/locations/:slug',
        destination: '/service-areas/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
