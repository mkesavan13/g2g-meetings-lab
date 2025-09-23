# Deployment Guide

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

## 🚀 Automatic Deployment

### Setup Instructions

1. **Enable GitHub Pages** in your repository:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set Source to "GitHub Actions"

2. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Monitor deployment**:
   - Go to the "Actions" tab in your GitHub repository
   - Watch the deployment workflow run
   - Once complete, your site will be available at: `https://[username].github.io/[repository-name]`

### What happens during deployment:

1. ✅ Code is checked out
2. ✅ Node.js and Yarn are set up
3. ✅ Dependencies are installed
4. ✅ Next.js builds the static export to `./out`
5. ✅ Static files are deployed to GitHub Pages

## 🔧 Configuration Details

### Next.js Configuration
The project is configured for static export in `next.config.js`:
- `output: 'export'` - Enables static HTML export
- `images: { unoptimized: true }` - Disables image optimization for static hosting
- `trailingSlash: false` - Better GitHub Pages compatibility

### Repository Name Configuration
If your repository name is not your GitHub username, uncomment and update the `basePath` in `next.config.js`:

```javascript
// Uncomment and modify if your repo name is not your GitHub username
basePath: '/your-repo-name',
```

### Scripts Available
- `yarn dev` - Development server
- `yarn build` - Production build with static export
- `yarn export` - Alias for build (generates static files in `./out`)
- `yarn lint` - ESLint check

## 📁 Output Structure

After building, the static files are generated in the `./out` directory:
- `index.html` - Main page
- `offline.html` - Offline page
- `404.html` - Error page
- `_next/` - Next.js static assets
- `sw.js` - Service worker for PWA functionality

## 🌐 PWA Features

This app includes Progressive Web App features:
- Service Worker for offline functionality
- App manifest for installability
- Optimized caching strategy

## 🛠️ Manual Deployment

If you prefer manual deployment:

1. Build the project:
   ```bash
   yarn build
   ```

2. The `./out` directory contains all static files
3. Upload the contents of `./out` to any static hosting service

## 🔍 Troubleshooting

### Build Failures
- Check the Actions tab for detailed error logs
- Ensure all dependencies are properly listed in `package.json`
- Verify that the build passes locally with `yarn build`

### Routing Issues
- GitHub Pages serves files statically
- All routing is handled client-side by Next.js
- 404 errors are handled by the custom 404 page

### PWA Features
- Service Worker registration happens automatically
- Offline functionality is available after first visit
- App can be installed from browsers that support PWA installation
