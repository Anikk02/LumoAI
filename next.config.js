/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { dev }) {
    if (!dev) {
      config.devtool = false; // 🚨 CRITICAL
    }
    return config;
  },
  reactStrictMode: false
};

module.exports = nextConfig;
