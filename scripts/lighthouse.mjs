// Lighthouse (mobile) on two pages against `astro preview`; fails below 0.95 in any of the four gated categories.
import { spawn, execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';

const PORT = 4322;
const PAGES = ['/', '/work/agent-retrieval/'];
const GATED = ['performance', 'accessibility', 'best-practices', 'seo'];
const tmp = `${homedir()}/.cache/site-verify`;
mkdirSync(tmp, { recursive: true });

// --ignore-lock keeps preview in the foreground (Astro 7 daemonizes it when it detects an AI agent);
// detached gives it its own process group so the finally block stops npx and the astro server together.
const preview = spawn('npx', ['astro', 'preview', '--port', String(PORT), '--ignore-lock'], { stdio: 'ignore', detached: true });
try {
  for (let i = 0; i < 60; i++) {
    try { await fetch(`http://localhost:${PORT}/`); break; } catch { await new Promise((r) => setTimeout(r, 500)); }
  }
  let failed = false;
  for (const path of PAGES) {
    const out = `${tmp}/lh-${path.replaceAll('/', '_') || 'home'}.json`;
    execFileSync('npx', ['lighthouse', `http://localhost:${PORT}${path}`, '--form-factor=mobile', '--output=json', `--output-path=${out}`, '--quiet', '--chrome-flags=--headless=new'], {
      env: { ...process.env, CHROME_PATH: '/opt/google/chrome/chrome', TMPDIR: tmp },
      stdio: 'inherit',
    });
    const report = JSON.parse(readFileSync(out, 'utf8'));
    for (const cat of GATED) {
      const score = report.categories[cat].score;
      console.log(`${path} ${cat}: ${score}`);
      if (score < 0.95) failed = true;
    }
  }
  if (failed) process.exitCode = 1;
} finally {
  process.kill(-preview.pid, 'SIGTERM');
}
