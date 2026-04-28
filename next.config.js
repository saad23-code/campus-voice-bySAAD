/** @type {import('next').NextConfig} */
const nextConfig = {
  // This tells Next.js it's okay to use external packages
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
