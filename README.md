# IdealGear (Next.js)

The production-ready version of IdealGear, migrated from the original
single-page Claude preview into a real Next.js App Router project. This is
what fixes the SEO gap flagged during development: guide pages, the
homepage, and legal pages are now genuine server-rendered routes with real
metadata and JSON-LD in the HTML response, not client-side screen switches.

## Structure

- `app/` — every route. `page.jsx` = homepage, `questionnaire/` = the
  interactive flow (client-rendered, deliberately not indexed),
  `guides/[topic]/` = the 9 SEO guide pages (statically generated),
  `sample-recommendation/`, `privacy-policy/`, `terms-of-use/`,
  `affiliate-disclosure/` = static content pages, `sitemap.js` / `robots.js`
  = dynamically generated from the real route list.
- `components/` — shared UI. Anything with `"use client"` at the top uses
  interactivity (state, click handlers) and can only be used inside a
  client-rendered part of the tree; everything else is a plain Server
  Component.
- `lib/engine.js` — the entire recommendation engine (scoring, budget
  filtering, reason generation) as pure functions, imported by both the
  guide pages (server-side) and the questionnaire (client-side).
- `data/racketCatalog.json` — the racket data. This is the only file the
  automation script touches — see `DEPLOYMENT_AUTOMATION.md`.
- `scripts/update-catalog.mjs` + `.github/workflows/catalog-update.yml` —
  the self-updating catalogue pipeline, unchanged in behaviour from before,
  just repointed at the new file location.

## Running locally

```
npm install
npm run dev
```

Then open http://localhost:3000.

## Before deploying

```
npm run build
```

Run this locally first to catch any errors before pushing — Vercel/Netlify
will also run this on every deploy, but it's faster to catch problems here.

See `LAUNCH_GUIDE.md` for the full, ordered checklist to take this from
"builds locally" to "live and findable on Google."
