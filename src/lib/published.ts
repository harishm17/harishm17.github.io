/** A write-up is public unless it is a draft; SHOW_DRAFTS=1 shows drafts for local preview. */
export function isPublished(
  draft: boolean | undefined,
  env: Record<string, string | undefined> = process.env,
): boolean {
  return !draft || env.SHOW_DRAFTS === '1';
}

/** Link to a write-up (or a section of it) only if that write-up is published. */
export function workHref(published: ReadonlySet<string>, page?: string, anchor?: string): string | undefined {
  if (!page || !published.has(page)) return undefined;
  return `/work/${page}/${anchor ? `#${anchor}` : ''}`;
}
