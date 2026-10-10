import { describe, expect, it } from 'vitest';
import { getResult, results } from '../../src/data/results';

describe('results data', () => {
  it('has unique ids', () => {
    expect(new Set(results.map((r) => r.id)).size).toBe(results.length);
  });
  it.each(results.map((r) => [r.id, r] as const))('%s improved in its stated direction', (_id, r) => {
    if (r.direction === 'lower') expect(r.after.value).toBeLessThan(r.before.value);
    else expect(r.after.value).toBeGreaterThan(r.before.value);
  });
  it.each(results.map((r) => [r.id, r] as const))('%s text matches its value', (_id, r) => {
    expect(parseFloat(r.before.text)).toBe(r.before.value);
    expect(parseFloat(r.after.text)).toBe(r.after.value);
  });
  it('the cost result carries its own display text', () => {
    expect(getResult('stage-cost').display).toBe('7.6× lower');
  });
  it('throws on an unknown id', () => {
    expect(() => getResult('nope')).toThrow(/Unknown result id: nope/);
  });
});
