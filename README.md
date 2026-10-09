# harishm17.github.io

Personal site of Harish Manoharan. Static [Astro](https://astro.build) site, no client JavaScript, deployed to GitHub Pages by GitHub Actions.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (Node 22.12 or newer) |
| `npm run dev` | Local dev server |
| `npm run build` | Type-check (`astro check`) and build to `dist/` |
| `npm test` | Unit and component tests |
| `npm run test:dist` | Checks over the built HTML (run after `build`) |
| `npm run test:e2e` | Browser tests: accessibility (axe), layout widths, first screen, keyboard, redirects |
| `npm run validate:html` | HTML validation of content pages |
| `npm run check:links` | Internal link check over `dist/` |
| `npm run check:external` | External link check |
| `npm run lighthouse` | Lighthouse on the home page and the main case study |
| `npm run screenshots` | Full-page screenshots of every page at five widths into `test-results/screens/` (after `build`) |
| `npm run og` | Regenerate share images in `public/og/` (after editing a title or headline, or publishing a draft; drafts get no image) |
| `npm run verify` | Build plus every automated check |

## Where things live

- Numbers and rows: `src/data/results.ts`, `src/data/work.ts`, `src/data/site.ts`. Each number is written once.
- Write-ups: `src/content/work/*.mdx`. Set `draft: true` to keep one unpublished; links to it and its share image disappear. Preview drafts with `SHOW_DRAFTS=1 npm run dev`. To publish one, set `draft: false`, run `npm run og` and commit the new image.
- Every number used in a write-up's prose must be in `src/data/results.ts` or listed in that file's `numbers` frontmatter; `npm test` fails otherwise.
- Some content checks read a term list kept outside the repo (`.private/never-public.json`, gitignored, or the file named by `NEVER_PUBLIC_FILE`). Without it those tests are reported as skipped.

## Deploy

Pushing to `main` builds and deploys through `.github/workflows/deploy.yml`. Pull requests to `main` build without deploying.

### First launch (once; Pages is still on the legacy branch source)

Launch only after Harish has reviewed the built site (`npx astro preview --host` and the screenshots from `npm run screenshots`) and given the go-ahead.

1. Make sure the PR's build check is green.
2. Watch the live site: `while :; do date +%T; curl -s -o /dev/null -w '%{http_code}\n' https://harishm17.github.io/; sleep 10; done`
3. Switch Pages to Actions: `gh api -X PUT repos/harishm17/harishm17.github.io/pages -f build_type=workflow`. Then confirm `/` still returns 200 with the old content; if it does not, go straight to step 4 and merge.
4. Merge with a merge commit: `gh pr merge <n> --merge`, then `gh run watch`.
5. Check: every page returns 200, old URLs land on their new pages, `/box-backup/` is unchanged, PDFs open, `npx linkinator https://harishm17.github.io/ --recurse --check-fragments`, and the LinkedIn Post Inspector preview.
6. If the site is in Google Search Console, submit `sitemap-index.xml`.

If the deploy fails while the old site is still served, fix forward on `main`. Never switch back to the legacy source while `main` contains the Astro source.

### Rollback (only if the live site is broken), in this order

1. `git revert -m 1 <merge-sha>` on a branch, merged to `main` (no force-push).
2. `gh api -X PUT repos/harishm17/harishm17.github.io/pages -f build_type=legacy -f 'source[branch]=main' -f 'source[path]=/'`
3. `gh api -X POST repos/harishm17/harishm17.github.io/pages/builds`
4. Wait for `gh api repos/harishm17/harishm17.github.io/pages/builds/latest` to show `built`, then check `/`, `/experience`, `/box-backup/`, `/HarishManoharan.pdf`.

## Kept on purpose

`public/box-backup/index.html` is the privacy policy for a personal Google OAuth app; it must stay byte-for-byte unchanged (a test checks its hash).
