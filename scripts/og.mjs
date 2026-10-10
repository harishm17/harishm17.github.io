// Renders 1200x630 share images into public/og/. Run `npm run og` after changing a title or headline, and
// after publishing a draft: a write-up's card is skipped while its MDX has `draft: true`.
import { chromium } from '@playwright/test';
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse as parseYaml } from 'yaml';

const FONT = pathToFileURL(
  resolve('node_modules/@fontsource-variable/schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2'),
).href;

const MISSED = { label: 'Missed source tables, 103-ticket benchmark', before: '79', after: '24', b: 98.8, a: 30 };

const CARDS = [
  { file: 'home-2026-10.png', kicker: 'Harish Manoharan', title: 'Software engineer at Purgo AI, working on agents, retrieval and LLM evaluation.', line: 'M.S. Computer Science, UT Dallas · M.Tech Data Science, IIT Madras' },
  { file: 'agent-retrieval-2026-10.png', slug: 'agent-retrieval', kicker: 'Harish Manoharan · Purgo AI', title: 'Finding the tables an agent misses', result: MISSED },
  { file: 'llm-evaluation-2026-10.png', slug: 'llm-evaluation', kicker: 'Harish Manoharan · Purgo AI', title: 'Testing LLMs and Databricks platforms for regulated use', line: 'Qualification tests with evidence an auditor can read' },
  { file: 'a11y-stem-2026-10.png', slug: 'a11y-stem', kicker: 'Harish Manoharan', title: 'Making equations in course PDFs readable by screen readers', line: 'a11y-stem, in progress' },
];

function isDraft(slug) {
  const front = readFileSync(`src/content/work/${slug}.mdx`, 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  return parseYaml(front).draft === true;
}

const ARROW = '<svg width="44" height="26" viewBox="0 0 17 10"><path d="M0 5H15.5M11.5 1L15.5 5L11.5 9" fill="none" stroke="#5c5c5c" stroke-width="1.25"/></svg>';

function html(card) {
  const bottom = card.result
    ? `<div class="result"><div class="fig"><span class="was">${card.result.before}</span>${ARROW}<span class="now">${card.result.after}</span></div>
       <div class="bars"><span style="width:${card.result.b}%"></span><span style="width:${card.result.a}%"></span></div>
       <div class="label">${card.result.label}</div></div>`
    : `<div class="line">${card.line}</div>`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face { font-family: 'SG'; src: url('${FONT}') format('woff2'); font-weight: 400 900; }
    html, body { margin: 0; width: 1200px; height: 630px; background: #fff; color: #121212; font-family: 'SG', sans-serif; }
    .card { box-sizing: border-box; width: 1200px; height: 630px; padding: 64px 80px; display: flex; flex-direction: column; justify-content: space-between; }
    .kicker { font-size: 28px; font-weight: 650; }
    .title { font-size: 60px; line-height: 1.08; font-weight: 650; letter-spacing: -0.02em; max-width: 1000px; }
    .line { font-size: 30px; color: #5c5c5c; }
    .fig { display: flex; align-items: center; gap: 6px; font-size: 56px; line-height: 1; }
    .was { font-weight: 400; } .now { font-weight: 650; }
    .bars { width: 520px; margin-top: 14px; display: grid; row-gap: 6px; border-left: 2px solid #121212; padding: 3px 0; }
    .bars span { display: block; height: 0; border-top: 14px solid #8a8a8a; }
    .bars span + span { border-top-color: #b93a0e; }
    .label { margin-top: 12px; font-size: 26px; color: #5c5c5c; }
  </style></head><body><div class="card"><div class="kicker">${card.kicker}</div><div class="title">${card.title}</div>${bottom}</div></body></html>`;
}

mkdirSync('public/og', { recursive: true });
mkdirSync('test-results', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const card of CARDS) {
  if (card.slug && isDraft(card.slug)) {
    console.log(`skipped ${card.file}: ${card.slug} is a draft`);
    continue;
  }
  // Load from a file:// page so the file:// font is allowed (setContent's about:blank cannot load it).
  const tmp = resolve(`test-results/og-${card.file}.html`);
  writeFileSync(tmp, html(card));
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const family = await page.evaluate(() => document.fonts.check('60px SG'));
  if (!family) throw new Error(`Schibsted Grotesk did not load for ${card.file}`);
  const out = `public/og/${card.file}`;
  await page.screenshot({ path: out, type: 'png' });
  console.log(out, Math.round(statSync(out).size / 1024), 'KB');
}
await browser.close();
