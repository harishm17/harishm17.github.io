import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Terms that must never appear on the site or anywhere in this repo (spec section 5, "Never public").
 * The repo is public and a guard list names what it guards, so the list is not committed. It is read from
 * `.private/never-public.json` (gitignored) or from the file named by NEVER_PUBLIC_FILE. Without the file
 * the checks that use it are skipped; CI only builds, so it never needs the list.
 *
 * File format: { "everywhere": string[], "about": string[] }. An entry written as "/source/flags" is a
 * regular expression; any other entry is a case-sensitive substring. "everywhere" applies to every tracked
 * text file and every built page; "about" applies to the visible text of /about/ only.
 */
export const PRIVATE_TERMS_FILE = resolve(process.env.NEVER_PUBLIC_FILE || '.private/never-public.json');

export interface Term {
  label: string;
  found: (s: string) => boolean;
}

export interface PrivateTerms {
  everywhere: Term[];
  about: Term[];
}

function toTerm(entry: string): Term {
  const m = entry.match(/^\/(.+)\/([a-z]*)$/s);
  if (m) {
    const re = new RegExp(m[1], m[2].replace('g', ''));
    return { label: entry, found: (s) => re.test(s) };
  }
  return { label: JSON.stringify(entry), found: (s) => s.includes(entry) };
}

function toTerms(value: unknown, key: string): Term[] {
  if (!Array.isArray(value) || value.length === 0 || !value.every((v) => typeof v === 'string' && v.length > 0)) {
    throw new Error(`${PRIVATE_TERMS_FILE}: "${key}" must be a non-empty array of strings`);
  }
  return value.map(toTerm);
}

export function loadPrivateTerms(): PrivateTerms | null {
  if (!existsSync(PRIVATE_TERMS_FILE)) return null;
  const raw = JSON.parse(readFileSync(PRIVATE_TERMS_FILE, 'utf8')) as Record<string, unknown>;
  return { everywhere: toTerms(raw.everywhere, 'everywhere'), about: toTerms(raw.about, 'about') };
}

export function describeName(what: string, terms: PrivateTerms | null): string {
  return terms ? `private never-public terms: ${what}` : `private never-public terms: ${what} (skipped, no ${PRIVATE_TERMS_FILE})`;
}
