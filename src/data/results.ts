export interface Value {
  value: number;
  text: string;
}

export type Direction = 'lower' | 'higher';

export interface Result {
  id: string;
  /** Row label in tables and the band. */
  short: string;
  before: Value;
  after: Value;
  /** Which way is better; tests check every result moved that way. */
  direction: Direction;
  /** Bar scale maximum; bars start at zero. */
  max: number;
  /** Text under the right end of the bar scale. */
  scaleLabel: string;
  /** Sample size and caveat shown with the number. */
  sample: string;
  /** Row-header second line in write-up tables when it differs from the band sample. */
  tableSample?: string;
  /** Replaces the before/after pair where a ratio reads better, e.g. "7.6× lower". */
  display?: string;
  /** Screen-reader text when `display` is used. */
  spoken?: string;
}

export const results: readonly Result[] = [
  {
    id: 'missed-tables',
    short: 'Missed source tables',
    before: { value: 79, text: '79' },
    after: { value: 24, text: '24' },
    direction: 'lower',
    max: 80,
    scaleLabel: '80',
    sample: '103-ticket benchmark',
  },
  {
    id: 'wrong-tables',
    short: 'Wrong tables in the agent’s context',
    before: { value: 8.6, text: '8.6%' },
    after: { value: 5.3, text: '5.3%' },
    direction: 'lower',
    max: 10,
    scaleLabel: '10%',
    sample: '95 tickets, one run; recall unchanged',
  },
  {
    id: 'catalog-recall',
    short: 'Catalog search recall@10',
    before: { value: 0.54, text: '0.54' },
    after: { value: 0.68, text: '0.68' },
    direction: 'higher',
    max: 1,
    scaleLabel: '1.0',
    sample: '4.0 s to 0.18 s per query; 188 real queries, expected tables from real tickets',
    tableSample: '188 real queries, expected tables from real tickets',
  },
  {
    id: 'catalog-latency',
    short: 'Catalog search mean latency',
    before: { value: 4.0, text: '4.0 s' },
    after: { value: 0.18, text: '0.18 s' },
    direction: 'lower',
    max: 4,
    scaleLabel: '4 s',
    sample: '188 real queries',
  },
  {
    id: 'stage-cost',
    short: 'Cost of two agent stages, relative',
    before: { value: 1, text: '1.00' },
    after: { value: 0.13, text: '0.13' },
    direction: 'lower',
    max: 1,
    scaleLabel: '1.0',
    sample: '5 runs × 102 tickets; a small share of a full run’s cost',
    display: '7.6× lower',
    spoken: '7.6 times lower',
  },
];

export const BAND_IDS = ['missed-tables', 'wrong-tables', 'catalog-recall'] as const;

export function getResult(id: string): Result {
  const r = results.find((x) => x.id === id);
  if (!r) throw new Error(`Unknown result id: ${id}`);
  return r;
}

export function bandResults(): Result[] {
  return BAND_IDS.map(getResult);
}
