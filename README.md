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
| `npm run favicons` | Regenerate the "HM" icons in `public/` (`favicon.svg`, `favicon.ico`, `favicon-192.png`, `apple-touch-icon.png`) from `scripts/favicons.mjs` |
| `npm run photo` | Regenerate `public/harish-manoharan.jpg`, the square photo that structured data points at, after replacing `src/assets/harish-manoharan.jpg` |
| `npm run verify` | Build plus every automated check |

## Where things live

- Numbers and rows: `src/data/results.ts`, `src/data/work.ts`, `src/data/site.ts`. Each number is written once.
- Write-ups: `src/content/work/*.mdx`. Set `draft: true` to keep one unpublished; links to it and its share image disappear. Preview drafts with `SHOW_DRAFTS=1 npm run dev`. To publish one, set `draft: false`, run `npm run og` and commit the new image.
- Every number used in a write-up's prose must be in `src/data/results.ts` or listed in that file's `numbers` frontmatter; `npm test` fails otherwise.
- Name, handle, profile links, lede and meta description: `src/data/site.ts`. JSON-LD for every page: `src/lib/structured-data.ts` (home: WebSite and Person; About: ProfilePage; write-ups: Article; all share one Person `@id`). `profiles` in `site.ts` is both the Person's `sameAs` and the `rel="me"` links; list only accounts that are his and that the site links.
- `site.updated.date` is the last real edit to the home, About or Work page. It sets the footer month, the sitemap `lastmod` for those pages and the About page's `dateModified`. Bump it with real content edits only; a write-up's `lastmod` comes from its own `updated` field.
- Search engine files that must keep their URLs: the favicons, `public/harish-manoharan.jpg`, and the IndexNow key file `public/<key>.txt` (the deploy job pings IndexNow with it after each deploy; its key is in `.github/workflows/deploy.yml`).
- Some content checks read a term list kept outside the repo (`.private/never-public.json`, gitignored, or the file named by `NEVER_PUBLIC_FILE`). Without it those tests are reported as skipped.

## Deploy

Pushing to `main` builds and deploys through `.github/workflows/deploy.yml`. Pull requests to `main` build without deploying.

### First launch (once; Pages is still on the legacy branch source)

Launch only after Harish has reviewed the built site (`npx astro preview --host` and the screenshots from `npm run screenshots`) and given the go-ahead.

1. Make sure the PR's build check is green.
2. Watch the live site: `while :; do date +%T; curl -s -o /dev/null -w '%{http_code}\n' https://harishm17.github.io/; sleep 10; done`
3. Switch Pages to Actions: `gh api -X PUT repos/harishm17/harishm17.github.io/pages -f build_type=workflow`. Then confirm `/` still returns 200 with the old content; if it does not, go straight to step 4 and merge.
4. Merge with a merge commit: `gh pr merge <n> --merge`, then `gh run watch`.
5. Point Pages at the custom domain (DNS at Porkbun must already return GitHub's A/AAAA records for `harishmanoharan.com` and a `www` CNAME to `harishm17.github.io`): `gh api -X PUT repos/harishm17/harishm17.github.io/pages -f cname=harishmanoharan.com`. Wait until `gh api repos/harishm17/harishm17.github.io/pages --jq .https_certificate.state` shows `approved`, then `gh api -X PUT repos/harishm17/harishm17.github.io/pages -F https_enforced=true`. From then on `harishm17.github.io` redirects to `https://harishmanoharan.com`.
6. Check: every page returns 200, old URLs (including `harishm17.github.io/...`) land on their new pages, `/box-backup/` is unchanged, PDFs open, `npx linkinator https://harishmanoharan.com/ --recurse --check-fragments`, and the LinkedIn Post Inspector preview.
7. Search engines: in Google Search Console (Domain property `harishmanoharan.com`, verified by the DNS TXT record; keep that record) submit `https://harishmanoharan.com/sitemap-index.xml` and request indexing of `/`, `/about/` and `/work/`. Then import the site into Bing Webmaster Tools from Search Console.

If the deploy fails while the old site is still served, fix forward on `main`. Never switch back to the legacy source while `main` contains the Astro source.

### Rollback (only if the live site is broken), in this order

1. `git revert -m 1 <merge-sha>` on a branch, merged to `main` (no force-push).
2. `gh api -X PUT repos/harishm17/harishm17.github.io/pages -f build_type=legacy -f 'source[branch]=main' -f 'source[path]=/'`
3. `gh api -X POST repos/harishm17/harishm17.github.io/pages/builds`
4. Wait for `gh api repos/harishm17/harishm17.github.io/pages/builds/latest` to show `built`, then check `/`, `/experience`, `/box-backup/`, `/HarishManoharan.pdf`.

## Kept on purpose

`public/box-backup/index.html` is the privacy policy for a personal Google OAuth app; it must stay byte-for-byte unchanged (a test checks its hash).
