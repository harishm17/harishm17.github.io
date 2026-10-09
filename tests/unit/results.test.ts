import { describe, expect, it } from 'vitest';
import { BAND_IDS, bandResults, getResult, results } from '../../src/data/results';
import { barPercent, spokenChange } from '../../src/lib/results';

describe('barPercent', () => {
  it('scales to a percentage of max, one decimal', () => {
    expect(barPercent(79, 80)).toBe(98.8);
    expect(barPercent(24, 80)).toBe(30);
    expect(barPercent(0.68, 1)).toBe(68);
  });
  it('clamps to 0..100', () => {
    expect(barPercent(120, 100)).toBe(100);
    expect(barPercent(-1, 100)).toBe(0);
  });
  it('rejects a non-positive max', () => {
    expect(() => barPercent(1, 0)).toThrow(/max must be > 0/);
  });
});

describe('spokenChange', () => {
  it('says "cut from" when the value fell and "up from" when it rose', () => {
    expect(spokenChange(getResult('missed-tables'))).toBe('cut from 79 to 24');
    expect(spokenChange(getResult('catalog-recall'))).toBe('up from 0.54 to 0.68');
  });
  it('says "unchanged at" when equal', () => {
    expect(spokenChange({ before: { value: 1, text: '1' }, after: { value: 1, text: '1' } })).toBe('unchanged at 1');
  });
});

describe('results data', () => {
  it('has unique ids', () => {
    expect(new Set(results.map((r) => r.id)).size).toBe(results.length);
  });
  it.each(results.map((r) => [r.id, r] as const))('%s improved in its stated direction', (_id, r) => {
    if (r.direction === 'lower') expect(r.after.value).toBeLessThan(r.before.value);
    else expect(r.after.value).toBeGreaterThan(r.before.value);
  });
  it.each(results.map((r) => [r.id, r] as const))('%s text matches its value and fits its scale', (_id, r) => {
    expect(parseFloat(r.before.text)).toBe(r.before.value);
    expect(parseFloat(r.after.text)).toBe(r.after.value);
    expect(r.max).toBeGreaterThanOrEqual(Math.max(r.before.value, r.after.value));
  });
  it('the home band is exactly the three Purgo retrieval results, in order', () => {
    expect([...BAND_IDS]).toEqual(['missed-tables', 'wrong-tables', 'catalog-recall']);
    expect(bandResults().map((r) => r.id)).toEqual([...BAND_IDS]);
  });
  it('the cost result is never in the band and carries its own display text', () => {
    expect(BAND_IDS).not.toContain('stage-cost');
    expect(getResult('stage-cost').display).toBe('7.6× lower');
  });
  it('throws on an unknown id', () => {
    expect(() => getResult('nope')).toThrow(/Unknown result id: nope/);
  });
});
