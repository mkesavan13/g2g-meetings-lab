const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/],
  publicExcludes: ['!noprecache/**/*']
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is stable in Next.js 14, no experimental flag needed
  reactStrictMode: true,
  // Configure output to docs folder for GitHub Pages
  output: 'export',
  distDir: 'docs',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = withPWA(nextConfig)
