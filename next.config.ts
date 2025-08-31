// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // <-- disables ESLint during build
  },
}

module.exports = nextConfig;
