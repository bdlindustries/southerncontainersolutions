/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
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
