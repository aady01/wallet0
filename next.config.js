/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  // Disable static generation for client-side only pages
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
