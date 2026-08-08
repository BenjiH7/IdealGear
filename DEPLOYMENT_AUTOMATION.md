# IdealGear — Automatic Catalogue Updates (Setup Guide)

This makes the racket catalogue refresh itself every two weeks, with no
manual prompting, once the site is deployed. It works by shipping two files
alongside your website code:

- `scripts/update-catalog.mjs` — researches each brand's current lineup
  using Claude with real web search, and updates the data file.
- `.github/workflows/catalog-update.yml` — tells GitHub to run that script
  automatically every two weeks.

The website itself (`data/racketCatalog.json`) is now a separate data
file from the app code, so the automation only ever touches that one file —
it can't accidentally break your UI.

## What "automatic" actually means here

Once set up, this genuinely requires **zero manual steps** going forward —
GitHub runs the research on schedule, commits the result, and if your host
auto-deploys on push (Vercel, Netlify, Cloudflare Pages, GitHub Pages with
Actions all do this by default), the live site updates itself too.

## One-time setup (do this once, when you launch)

1. **Put the project on GitHub.** If it isn't already, create a repository
   and push the whole IdealGear project to it (the `.github` folder must be
   at the repo root for GitHub to see the workflow).
2. **Get an Anthropic API key.** Sign up at console.anthropic.com and create
   an API key. This is separate from a claude.ai subscription — it's billed
   per API call, and at "a few requests every two weeks" the cost here is
   small (nowhere near the cost of a live per-visitor AI backend).
3. **Add the key as a GitHub secret**: in your repo, go to
   Settings → Secrets and variables → Actions → New repository secret. Name
   it `ANTHROPIC_API_KEY` and paste the key. GitHub encrypts this — it's
   never visible in logs or code.
4. **Connect hosting with auto-deploy**: if you host on Vercel or Netlify,
   connect the GitHub repo in their dashboard once — both auto-redeploy on
   every push by default, no extra config needed.
5. **Done.** The workflow runs on its own from here. You can also trigger it
   manually any time from the repo's "Actions" tab → "Refresh racket
   catalogue" → "Run workflow", without waiting for the schedule.

## What happens on each run

- Researches all 8 brands for new models not already in the catalogue, and
  flags (without deleting) any existing model that looks discontinued.
- **Refreshes the price of every racket already in the catalogue** — checks
  2-3 known UK retailers per racket and keeps whichever has the lowest
  current in-stock price, so "best price we found" stays genuinely current
  rather than freezing at whatever it was when added.
- Applies the same power/control/beginnerFit/advancedFit methodology
  documented in the app for any newly added racket — not free-form guessing.
- Updates the "last reviewed" date shown in the site footer.

## Affiliate links — how to activate them

By default every URL the automation finds is a plain product link, exactly
like before. To make them real affiliate links, open
`scripts/update-catalog.mjs` and fill in the `AFFILIATE_CONFIG` object near
the top with IDs from whichever network(s) approve you:

- **Amazon Associates**: just your tracking tag (e.g. `"idealgear-21"`) —
  works automatically for any amazon.co.uk link the script finds.
- **AWIN**: your publisher ID, plus each retailer's advertiser/merchant ID
  (found in your AWIN dashboard once that specific retailer approves you).
- **CJ Affiliate**: your website ID (CID), plus each advertiser's PID.

Once any of these are filled in, every price check from then on
automatically wraps the winning URL as a tracked affiliate link — no other
code changes needed, and nothing is wrapped for a network you haven't been
approved for yet, so you'll never end up with a broken affiliate link
pointing at a program you're not actually part of.

**Note**: getting approved for these programs is a business step (apply on
their site, wait for review) — that part can't be automated. See the
earlier conversation for which specific padel retailers run programs
(Padel Nuestro, Padel Market, Racquet Depot, CJ Affiliate, AWIN all came up
in that research).

## What this does NOT do automatically

- **It won't get you affiliate approval.** You still have to apply to each
  network yourself — see the "Affiliate links" section above.
- **It won't delete discontinued rackets.** Review the "flagged as possibly
  discontinued" list in the workflow's run log periodically and remove them
  by hand (or ask Claude to do it) when you're confident they're really gone.
- **It doesn't guarantee it finds a price for every racket every run** — if
  a search comes back inconclusive for a specific racket, that one simply
  keeps its previous price/URL until the next run finds one, rather than
  overwriting good data with a guess.

## Cost estimate

Roughly 8 requests to research new models, plus 1 request per racket to
refresh its price (currently ~47 rackets) = about 55 requests per run.
At 2 runs a month, that's roughly 110 requests a month — still small change
compared to running an AI call on every visitor's questionnaire submission,
which is exactly why this "batch research twice a month" approach is the
cheap option compared to a live AI backend. As the catalogue grows, this
scales linearly with racket count, so it's worth checking your Anthropic
API usage after the first couple of runs to confirm the cost is where you
expect.
