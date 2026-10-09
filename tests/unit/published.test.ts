import { describe, expect, it } from 'vitest';
import { isPublished, workHref } from '../../src/lib/published';

describe('isPublished', () => {
  it('publishes non-drafts and hides drafts', () => {
    expect(isPublished(false, {})).toBe(true);
    expect(isPublished(undefined, {})).toBe(true);
    expect(isPublished(true, {})).toBe(false);
  });
  it('shows drafts when SHOW_DRAFTS=1', () => {
    expect(isPublished(true, { SHOW_DRAFTS: '1' })).toBe(true);
  });
});

describe('workHref', () => {
  const published = new Set(['agent-retrieval']);
  it('links published pages, with an optional anchor', () => {
    expect(workHref(published, 'agent-retrieval')).toBe('/work/agent-retrieval/');
    expect(workHref(published, 'agent-retrieval', 'cost')).toBe('/work/agent-retrieval/#cost');
  });
  it('returns undefined for drafts and rows without a page', () => {
    expect(workHref(published, 'a11y-stem')).toBeUndefined();
    expect(workHref(published, undefined)).toBeUndefined();
  });
});
