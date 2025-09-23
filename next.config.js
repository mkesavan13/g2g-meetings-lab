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
  
  // Static export configuration for GitHub Pages
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Set base path for GitHub Pages (if deploying to a repository)
  // Uncomment and modify if your repo name is not your GitHub username
  // basePath: '/your-repo-name',
  
  // Ensure trailing slash is false for better GitHub Pages compatibility
  trailingSlash: false,
}

module.exports = withPWA(nextConfig)
