/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  typescript: {
    // Don't fail the build on type errors (warnings still show in logs)
    ignoreBuildErrors: true,
  },
  eslint: {
    // Don't fail the build on lint errors
    ignoreDuringBuilds: true,
  },
};
module.exports = nextConfig;
