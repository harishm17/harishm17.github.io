// Checks every external link in dist/. LinkedIn and Codeforces block bots (999/403): reported for a manual check.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const MANUAL = [/^https:\/\/(www\.)?linkedin\.com\//, /^https:\/\/codeforces\.com\//];

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
  });
}

const urls = new Set();
for (const file of htmlFiles('dist')) {
  if (file.includes('box-backup')) continue;
  for (const m of readFileSync(file, 'utf8').matchAll(/<a\b[^>]*href="(https?:\/\/[^"]+)"/g)) {
    const url = m[1].replaceAll('&amp;', '&');
    if (!/^https:\/\/(?:www\.)?(?:harishmanoharan\.com|harishm17\.github\.io)/.test(url)) urls.add(url);
  }
}

let failed = 0;
for (const url of [...urls].sort()) {
  let status;
  try {
    const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (link check)' } });
    status = res.status;
  } catch (err) {
    status = `error: ${err.message}`;
  }
  const ok = typeof status === 'number' && status < 400;
  const manual = MANUAL.some((re) => re.test(url));
  const label = ok ? 'ok    ' : manual ? 'MANUAL' : 'FAIL  ';
  if (!ok && !manual) failed++;
  console.log(`${label} ${status} ${url}`);
}
if (failed) {
  console.error(`${failed} external link(s) failed`);
  process.exit(1);
}
