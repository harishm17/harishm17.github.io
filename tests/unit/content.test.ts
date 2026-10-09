import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse as parseYaml } from 'yaml';

const DIR = 'src/content/work';
const files = readdirSync(DIR).filter((f) => f.endsWith('.mdx'));
// Integers with optional thousands commas and decimals: "3,712", "0.965", "50,000". Trailing commas are not eaten.
const NUM = /\d+(?:,\d{3})*(?:\.\d+)?/g;
const dataNumbers = new Set(readFileSync('src/data/results.ts', 'utf8').match(NUM) ?? []);
const BANNED = [/passionate/i, /leverag/i, /cutting-edge/i, /seamless/i, /\brobust\b/i, /\bdelve/i, /showcase/i, /\bjourney\b/i, /at the intersection of/i, /every change/i];
// Other never-public terms are checked against the private list in private-terms.test.ts.
const NEVER = ['PR #', '—', '→'];

function split(file: string) {
  const raw = readFileSync(`${DIR}/${file}`, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file} has no frontmatter`);
  return { data: parseYaml(m[1]) as Record<string, unknown>, body: m[2] };
}

describe.each(files)('%s', (file) => {
  const { data, body } = split(file);
  const prose = body
    .split('\n')
    .filter((line) => !/^\s*(import|export)\s/.test(line))
    .join('\n')
    .replace(/\]\([^)]*\)/g, ']') // link targets (URLs) are not prose numbers
    .replace(/<\/?[A-Za-z][A-Za-z0-9]*/g, '<') // tag names are not prose numbers (the "2" in <h2 id="...">)
    .replace(/a11y/g, 'a-y'); // nor is the project name a11y-stem (the "11")

  it('declares every number its prose uses', () => {
    const declared = new Set((data.numbers as string[] | undefined) ?? []);
    const undeclared = [...new Set(prose.match(NUM) ?? [])].filter((n) => !dataNumbers.has(n) && !declared.has(n));
    expect(undeclared).toEqual([]);
  });

  it('declares no number it does not use', () => {
    const used = new Set(prose.match(NUM) ?? []);
    const unused = ((data.numbers as string[] | undefined) ?? []).filter((n) => !used.has(n));
    expect(unused).toEqual([]);
  });

  it('has no Markdown pipe tables (use DataTable)', () => {
    expect(body.split('\n').filter((line) => line.trimStart().startsWith('|'))).toEqual([]);
  });

  it('uses no banned words, PR numbers, em dashes or arrows', () => {
    for (const re of BANNED) expect(body).not.toMatch(re);
    for (const bad of NEVER) expect(body).not.toContain(bad);
  });

  it('has a description that fits search snippets', () => {
    expect(String(data.description).length).toBeLessThanOrEqual(160);
  });
});
