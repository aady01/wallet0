/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    // Remove serverActions if not needed or configure it properly
  },
};

module.exports = nextConfig;
