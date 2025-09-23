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
  
  // Static export configuration for GitHub Pages (only in production)
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    // Disable image optimization for static export
    images: {
      unoptimized: true,
    },
    basePath: '/ai-assist-lab',
    assetPrefix: '/ai-assist-lab',
  }),
  
  // Environment variables for GitHub Pages deployment
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NODE_ENV === 'production' ? '/ai-assist-lab' : '',
  },
  
  // Ensure trailing slash is false for better GitHub Pages compatibility
  trailingSlash: false,
}

module.exports = withPWA(nextConfig)
