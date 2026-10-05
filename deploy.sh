#!/usr/bin/env bash
set -e
# Build and deploy for GitHub Pages (prebuilt files in repo root).
# Keeps index.html, 404.html, and assets/ in sync with the current build.
# Use index.source.html (entry: src/main.jsx) so Vite actually rebuilds from source;
# otherwise root index.html would point at an old bundle and the build would not recompile.

cp index.source.html index.html
npm run build

cp dist/index.html .
rm -rf assets
cp -r dist/assets .

# Copy public assets to root so they're reachable on GitHub Pages
[ -f dist/photo.JPG ] && cp dist/photo.JPG .
[ -f dist/favicon.svg ] && cp dist/favicon.svg .
[ -f dist/robots.txt ] && cp dist/robots.txt .
[ -f dist/sitemap.xml ] && cp dist/sitemap.xml .
[ -f dist/og-image.png ] && cp dist/og-image.png .

# 404.html is the SPA fallback for unknown paths; keep it identical to index.html
# so its metadata and asset hashes never go stale.
cp index.html 404.html

# GitHub Pages serves /about from about.html with HTTP 200. Without these copies,
# every inner route falls through to 404.html and returns HTTP 404 to crawlers.
for route in about experience research projects hobbies certifications leadership skills contact; do
  cp index.html "$route.html"
done

echo "Deploy done. Commit and push index.html, 404.html, and assets/ to publish."
