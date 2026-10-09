import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { extname } from 'node:path';
import { describe, expect, it } from 'vitest';
import { describeName, loadPrivateTerms } from '../private-terms';

const terms = loadPrivateTerms();

// Lockfile integrity hashes are random base64, so short numbers turn up in them by chance.
const SKIP_FILES = new Set(['package-lock.json']);
const BINARY = new Set(['.pdf', '.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.ico', '.woff', '.woff2']);

describe.skipIf(!terms)(describeName('repo files', terms), () => {
  it('no tracked or new text file contains one (tests, scripts and the README are public too)', () => {
    const files = execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], { encoding: 'utf8' })
      .split('\0')
      .filter((f) => f && !SKIP_FILES.has(f) && !BINARY.has(extname(f).toLowerCase()) && existsSync(f));
    expect(files.length).toBeGreaterThan(50);
    const hits: string[] = [];
    for (const f of files) {
      const buf = readFileSync(f);
      if (buf.includes(0)) continue;
      const s = buf.toString('utf8');
      for (const t of terms!.everywhere) if (t.found(s)) hits.push(`${f}: ${t.label}`);
    }
    expect(hits).toEqual([]);
  });
});
