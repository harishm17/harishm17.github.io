// Screenshots every content page at five widths into test-results/screens/ for review by eye.
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';

const PORT = 4323;
const WIDTHS = [390, 720, 768, 1024, 1440];
const xml = readFileSync('dist/sitemap-0.xml', 'utf8');
const pages = [...xml.matchAll(/<loc>https?:\/\/[^/<]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]).concat('/404.html');

mkdirSync('test-results/screens', { recursive: true });
// --ignore-lock keeps preview in the foreground (Astro 7 daemonizes it when it detects an AI agent);
// detached gives it its own process group so the finally block stops npx and the astro server together.
const preview = spawn('npx', ['astro', 'preview', '--port', String(PORT), '--ignore-lock'], { stdio: 'ignore', detached: true });
try {
  for (let i = 0; i < 60; i++) {
    try { await fetch(`http://localhost:${PORT}/`); break; } catch { await new Promise((r) => setTimeout(r, 500)); }
  }
  const browser = await chromium.launch({ channel: 'chrome' });
  for (const path of pages) {
    for (const width of WIDTHS) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto(`http://localhost:${PORT}${path}`);
      await page.evaluate(() => document.fonts.ready);
      const name = `${path.replaceAll('/', '_').replace(/^_|_$/g, '') || 'home'}-${width}.png`;
      await page.screenshot({ path: `test-results/screens/${name}`, fullPage: true });
      await page.close();
    }
  }
  await browser.close();
} finally {
  process.kill(-preview.pid, 'SIGTERM');
}
