/**
 * Disclaimer copy the site must never show (Harish, 2026-10-09). The never-public rules are followed, not
 * stated: no line saying what is withheld, anonymized or shared with permission, no provenance hedge on the
 * author's own claims, and no copy about the page itself. Caveats about the results (sample sizes, one run,
 * no held-out set, development sample) stay; none of these patterns match them.
 *
 * Used by the built-page copy lint (tests/dist/pages.test.ts) and by the MDX check
 * (tests/unit/content.test.ts), which also covers drafts that are not built.
 */
export const DISCLAIMERS: readonly RegExp[] = [
  // What is withheld or kept confidential.
  /no code\b/i,
  /customer details?/i,
  /prompts? or customer/i,
  /confidential/i,
  /\bwithheld\b/i,
  /\bredacted\b/i,
  /\banonymi[sz]/i,
  /with(?:out)? (?:purgo.s )?permission/i,
  /left out of this/i,
  /names? (?:are |were )?left out/i,
  /come only from/i,
  // Provenance hedges on the author's own claims.
  /self-reported/i,
  /per my notes/i,
  // Copy about the page itself.
  /below you.ll find/i,
  /\b(?:sections?|tables?|run \d+) below\b/i,
  /\bI.ll add [^.]* here\b/i,
];
