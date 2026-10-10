export interface Value {
  value: number;
  text: string;
}

export type Direction = 'lower' | 'higher';

export interface Result {
  id: string;
  /** Row label in write-up tables. */
  short: string;
  before: Value;
  after: Value;
  /** Which way is better; tests check every result moved that way. */
  direction: Direction;
  /** Sample size and caveat shown with the number. */
  sample: string;
  /** Replaces the before/after pair where a ratio reads better, e.g. "7.6× lower". */
  display?: string;
}

export const results: readonly Result[] = [
  {
    id: 'missed-tables',
    short: 'Missed source tables',
    before: { value: 79, text: '79' },
    after: { value: 24, text: '24' },
    direction: 'lower',
    sample: '103-ticket benchmark',
  },
  {
    id: 'wrong-tables',
    short: 'Wrong tables in the agent’s context',
    before: { value: 8.6, text: '8.6%' },
    after: { value: 5.3, text: '5.3%' },
    direction: 'lower',
    sample: '95 tickets, one run; recall unchanged',
  },
  {
    id: 'catalog-recall',
    short: 'Catalog search recall@10',
    before: { value: 0.54, text: '0.54' },
    after: { value: 0.68, text: '0.68' },
    direction: 'higher',
    sample: '188 real queries, expected tables from real tickets',
  },
  {
    id: 'catalog-latency',
    short: 'Catalog search mean latency',
    before: { value: 4.0, text: '4.0 s' },
    after: { value: 0.18, text: '0.18 s' },
    direction: 'lower',
    sample: '188 real queries',
  },
  {
    id: 'stage-cost',
    short: 'Cost of two agent stages, relative',
    before: { value: 1, text: '1.00' },
    after: { value: 0.132, text: '0.132' },
    direction: 'lower',
    sample: '5 runs × 102 tickets; a small share of a full run’s cost',
    display: '7.6× lower',
  },
];

export function getResult(id: string): Result {
  const r = results.find((x) => x.id === id);
  if (!r) throw new Error(`Unknown result id: ${id}`);
  return r;
}
