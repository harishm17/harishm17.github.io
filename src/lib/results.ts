import type { Value } from '../data/results';

/** Width of a bar as a percentage of `max`, clamped to 0..100 and rounded to one decimal. */
export function barPercent(value: number, max: number): number {
  if (!(max > 0)) throw new Error(`max must be > 0, got ${max}`);
  const pct = Math.round((value / max) * 1000) / 10;
  return Math.min(100, Math.max(0, pct));
}

/** What a screen reader hears for a before/after pair, e.g. "cut from 79 to 24". */
export function spokenChange(r: { before: Value; after: Value }): string {
  if (r.after.value < r.before.value) return `cut from ${r.before.text} to ${r.after.text}`;
  if (r.after.value > r.before.value) return `up from ${r.before.text} to ${r.after.text}`;
  return `unchanged at ${r.after.text}`;
}
