# IdealGear — Launch Guide

Everything needed to go from "working in Claude" to "live, presentable,
accurate, and findable on Google" — in the order that actually works, since
several steps block others.

---

## Phase 1 — Infrastructure (do this first; nothing else works without it)

1. **Buy a domain.** Any registrar is fine (Namecheap, Google Domains'
   successor, etc.).
2. **Put the project on GitHub.** Create a repository, push the whole
   `nextjs/` project to it (the `.github` folder must be at the repo root
   for GitHub to see the automation workflow).
3. **Choose hosting and connect it to GitHub.** Vercel is the natural fit
   for Next.js specifically (made by the same team, zero-config deploys) —
   Netlify and Cloudflare Pages also support Next.js. Any of these
   auto-deploy on every push once connected, which the catalogue-automation
   pipeline depends on.
4. ~~Migrate to Next.js~~ — **done.** The project is now a real Next.js
   App Router site: the homepage, all 9 guide pages, and the 3 legal pages
   are genuine static/server-rendered routes with real per-page metadata and
   JSON-LD baked into the HTML — not a single-page app switching screens
   client-side. Run `npm install` then `npm run build` to confirm it builds
   cleanly before your first deploy.
5. **Fill in the placeholder domain** in three places, once you have a real
   one: `app/layout.jsx` (`metadataBase`), `app/sitemap.js`, `app/robots.js`
   (all currently say `your-domain-here.com`).
6. **Add a real favicon and Open Graph share image** — `app/layout.jsx`
   already references `/favicon.ico` and `/og-image.png`; both need to
   actually exist in `/public` before launch, or those tags point at
   nothing.

## Phase 2 — Data accuracy (before real visitors see it)

5. **Run the catalogue automation once manually** (see
   `DEPLOYMENT_AUTOMATION.md`) so real, current prices are in place from day
   one, rather than launching on the estimated placeholder prices.
6. **Spot-check a sample of results yourself** — run the questionnaire as a
   few different fictional players and sanity-check the recommendations feel
   right, the same way the 12-profile automated test does, but with human
   judgement on the actual wording and picks.
7. **Decide on affiliate link timing** — see Phase 5. Don't apply yet; note
   this here as a placeholder step in the sequence.

## Phase 3 — Legal & trust (required before real traffic)

8. **Fill in the placeholders** in the Privacy Policy, Terms of Use, and
   Affiliate Disclosure pages just added to the app (launch date, contact
   email, and — once approved — which specific affiliate programs you're
   part of).
9. **Have the legal pages reviewed** — these are a reasonable starting
   draft, not legal advice. A solicitor, or a service like Termly or
   iubenda, should check them before launch, especially the Privacy Policy
   once real analytics/cookies are added.
10. **Cookie banner** is already built and wired in — just confirm it
    persists correctly (via localStorage) once deployed.
11. **Add a Contact/About page** — even a simple one. Small trust signal,
    and gives you a real place to put the contact email referenced in the
    legal pages.

## Phase 4 — SEO technical setup (needs Phase 1 done first)

12. ~~Add robots.txt/sitemap.xml~~ — **done**, and now generated dynamically
    (`app/sitemap.js`, `app/robots.js`) from the real route list instead of
    a static template, so they can't go stale as pages are added. Just
    confirm the domain placeholder was updated in Phase 1, step 5.
13. **Submit the sitemap to Google Search Console** — create a free account,
    verify domain ownership, submit `sitemap.xml`. This is what actually
    gets you into Google's index; nothing else in this list substitutes for
    it.
14. **Add the real favicon and Open Graph image** — see Phase 1, step 6; the
    metadata tags are already wired up in `app/layout.jsx`, they just need
    the actual image files.
15. **Expand the guide-page content.** The 9 guide pages are now genuinely
    crawlable (Phase 1 fixed that), but still fairly thin content-wise —
    competitive ranking for terms like "best padel racket for beginners"
    typically needs more substantive copy per page than what's there now.
    This is worth doing now, since it'll actually be indexed.
16. ~~JSON-LD structured data~~ — **done**, and now rendered server-side
    directly into each guide page's HTML (`app/guides/[topic]/page.jsx`),
    not injected by client-side JavaScript.

## Phase 5 — Affiliate links (needs a live site first)

17. **Apply to affiliate programs** — now that the site is live with real
    URL, real content, and the legal/disclosure pages in place. Revisit the
    earlier research: AWIN, CJ Affiliate, Amazon Associates, and the
    padel-specific programs (Padel Nuestro, Padel Market, Racquet Depot).
18. **Note on Amazon Associates specifically**: it requires your first
    qualifying sale within 180 days of approval or the account can be
    closed — so don't apply until you expect at least some real traffic
    soon after.
19. **Once approved**, add your IDs to `AFFILIATE_CONFIG` in
    `scripts/update-catalog.mjs` (see `DEPLOYMENT_AUTOMATION.md`) — every
    price the automation finds from then on becomes a real affiliate link
    automatically.

## Phase 6 — Ongoing (after launch)


20. **Set up analytics** — even a privacy-friendly, cookie-light option like
    Plausible or Fathom, so you can see whether any of this is working.
21. **Backlinks** — genuinely can't be automated. Padel forums, local club
    partnerships, coach recommendations, and guest posts on padel sites are
    the realistic route here, and this is typically the slowest-moving part
    of SEO.
22. **Keep the catalogue-refresh automation running** (already set up) and
    check the Actions log periodically for anything flagged as possibly
    discontinued.
23. **Revisit rankings and traffic monthly** via Search Console, and adjust
    guide-page content based on what search terms are actually bringing
    people in.

---

## Quick reference — what's already done vs. what's a decision for you

**Already built, ready to use:**
- Full Next.js App Router migration — real, individually-crawlable routes
  for the homepage, all 9 guides, sample recommendation, and 3 legal pages
- Privacy Policy, Terms of Use, Affiliate Disclosure pages
- Cookie consent banner (persisted via localStorage)
- Dynamically generated `robots.txt` and `sitemap.xml` (from the real route
  list, not a static template)
- Server-rendered JSON-LD structured data on every guide page
- Automated catalogue refresh (new models + price updates every 2 weeks)
- Affiliate-link wrapping (activates the moment you add real IDs)

**Needs your decision, not code:**
- Domain and hosting provider choice
- When to apply for affiliate programs (Phase 5, after real traffic exists)

**Needs manual/ongoing effort, can't be fully automated:**
- Legal review of the policy pages
- Backlink building
- Content expansion on guide pages
