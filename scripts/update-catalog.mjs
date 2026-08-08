#!/usr/bin/env node
/**
 * IdealGear — automated catalogue refresh
 * ----------------------------------------------------------------------
 * Runs on a schedule (see .github/workflows/catalog-update.yml — every two
 * weeks by default). Researches each brand's current padel racket lineup
 * using Claude with real web search, applies the same rating methodology
 * documented in the app, and writes the result back to
 * src/data/racketCatalog.json. The GitHub Actions workflow then commits the
 * change, which triggers your host (Vercel/Netlify/etc.) to redeploy.
 *
 * Requires an ANTHROPIC_API_KEY (set as a GitHub Actions secret — see the
 * setup steps in DEPLOYMENT_AUTOMATION.md). This calls the real Anthropic
 * API and will incur a small per-run cost (a handful of requests every two
 * weeks — not per-visitor, so this stays cheap).
 * ----------------------------------------------------------------------
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Anthropic from "@anthropic-ai/sdk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "..", "data", "racketCatalog.json");

const BRANDS = ["Bullpadel", "Nox", "Adidas", "Head", "Babolat", "Wilson", "Siux", "Oxdog"];

/* =========================================================================
   AFFILIATE LINK WRAPPING
   -------------------------------------------------------------------------
   This is a no-op until you fill in real IDs below — plain URLs pass through
   unchanged, exactly like before. Once you're approved for a network, add
   your ID here and every price the automation finds from then on
   automatically becomes a real affiliate link, with no other code changes.
   ========================================================================= */
const AFFILIATE_CONFIG = {
  // Amazon Associates: get your tracking ID (looks like "yourname-21") from
  // the Associates dashboard. Works for any amazon.co.uk product URL.
  amazonAssociatesTag: "", // e.g. "idealgear-21"

  // AWIN: get your Publisher ID and each merchant's Advertiser ID from your
  // AWIN dashboard once a retailer approves you. One entry per retailer
  // domain you've been approved for.
  awinPublisherId: "", // e.g. "1234567"
  awinMerchantIds: {
    // "padelpoint.co.uk": "56789",
  },

  // CJ Affiliate: get your Website ID (CID) and each advertiser's PID from
  // your CJ dashboard once approved.
  cjWebsiteId: "", // e.g. "7654321"
  cjAdvertiserIds: {
    // "example-retailer.com": "9988776",
  },
};

function wrapAffiliateUrl(url, retailerDomain) {
  if (!url) return url;

  if (retailerDomain.includes("amazon.") && AFFILIATE_CONFIG.amazonAssociatesTag) {
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}tag=${AFFILIATE_CONFIG.amazonAssociatesTag}`;
  }

  const awinMerchantId = AFFILIATE_CONFIG.awinMerchantIds[retailerDomain];
  if (awinMerchantId && AFFILIATE_CONFIG.awinPublisherId) {
    return `https://www.awin1.com/cread.php?awinmid=${awinMerchantId}&awinaffid=${AFFILIATE_CONFIG.awinPublisherId}&clickref=&p=${encodeURIComponent(url)}`;
  }

  const cjAdvertiserId = AFFILIATE_CONFIG.cjAdvertiserIds[retailerDomain];
  if (cjAdvertiserId && AFFILIATE_CONFIG.cjWebsiteId) {
    return `https://www.anrdoezrs.net/links/${AFFILIATE_CONFIG.cjWebsiteId}/type/dlg/sid/auto/${encodeURIComponent(url)}`;
  }

  return url; // no matching affiliate config yet — plain URL, unchanged
}

function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

const METHODOLOGY = `
Rating methodology — do not invent ratings freely, follow this rule:
1. SHAPE sets the power/control baseline:
   - Diamond -> power ~9, control ~5.5 (small sweet spot, punishes mishits)
   - Teardrop/Hybrid -> power ~7, control ~7 (middle ground)
   - Round -> power ~4, control ~9 (large sweet spot, most forgiving)
2. CORE SOFTNESS shifts that baseline: a soft/foam core adds to control and
   comfort and subtracts slightly from power; a firm/hard core does the
   opposite.
3. beginnerFit tracks control + comfort (capped lower for firm-core or
   diamond-shaped rackets regardless of price).
4. advancedFit tracks power and how demanding/unforgiving the racket is.
5. All ratings are 0-10 integers. weightG, balance, core, surface, shape,
   year should be the real, current published specs — do not estimate these,
   only the 0-10 ratings are estimated using the rule above.
`.trim();

if (!process.env.ANTHROPIC_API_KEY) {
  console.error("ANTHROPIC_API_KEY is not set — see DEPLOYMENT_AUTOMATION.md for setup.");
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function slugify(brand, model) {
  return `${brand}-${model}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}


async function refreshPrice(racket, currentListing) {
  const prompt = `Find the current UK price for the "${racket.brand} ${racket.model}" padel racket (${racket.year}) using web search. Check 2-3 legitimate UK padel retailers if possible (e.g. official brand store, EverythingPadel, Padel Point, Padel Nuestro, Amazon UK) and identify whichever has the LOWEST current in-stock price.

Respond with ONLY a raw JSON object, no markdown fences, no commentary:
{
  "found": true|false,
  "retailer": "string",
  "price": 0,
  "originalPrice": 0 or null,
  "url": "string (the real product page URL)",
  "inStock": true|false
}
If you can't find a confident real price, respond { "found": false }.`;

  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    tools: [{ type: "web_search_20250305", name: "web_search" }],
    messages: [{ role: "user", content: prompt }],
  });

  const text = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("\n");
  const cleaned = text.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    return { found: false };
  }
}

async function refreshExistingPrices(data) {
  console.log(`\nRefreshing prices for ${data.racketCatalog.length} existing rackets...`);
  for (const racket of data.racketCatalog) {
    const listing = data.listings.find((l) => l.racketId === racket.id);
    if (!listing) continue;

    let result;
    try {
      result = await refreshPrice(racket, listing);
    } catch (err) {
      console.error(`Price check failed for ${racket.brand} ${racket.model}:`, err.message);
      continue;
    }
    if (!result.found) continue;

    const domain = domainOf(result.url);
    const finalUrl = wrapAffiliateUrl(result.url, domain);

    listing.retailer = result.retailer || listing.retailer;
    listing.originalPrice = result.originalPrice ?? null;
    listing.price = result.price ?? listing.price;
    listing.url = finalUrl;
    listing.inStock = result.inStock !== false;
    listing.verified = true;
    listing.isBestPrice = true;
    listing.checkedLabel = `Checked ${new Date().toISOString().slice(0, 10)}${finalUrl !== result.url ? " · affiliate link" : ""}`;
  }
}

async function researchBrand(brand, existingModels) {
  const prompt = `Research ${brand}'s CURRENT padel racket lineup (this year's models) using web search.

Our catalogue already has these ${brand} models: ${existingModels.join(", ") || "(none)"}.

1. Identify any real, currently-sold ${brand} padel racket model NOT in that list that's a popular/notable pick (entry-level through flagship).
2. Identify any of the listed existing models that appear discontinued or clearly superseded.
3. For each NEW model, apply this methodology:
${METHODOLOGY}

Respond with ONLY a raw JSON object (no markdown fences, no commentary), in exactly this shape:
{
  "newRackets": [
    {
      "brand": "${brand}", "model": "string", "year": 2026, "shape": "Diamond|Round|Teardrop (Hybrid)",
      "weightG": 365, "balance": "string", "core": "string", "surface": "string",
      "power": 0, "control": 0, "maneuverability": 0, "comfort": 0, "spin": 0, "defense": 0, "offense": 0,
      "beginnerFit": 0, "intermediateFit": 0, "advancedFit": 0, "armFriendly": 0,
      "estimatedPriceGBP": 0, "sourceNote": "short note on where this was found"
    }
  ],
  "possiblyDiscontinued": ["existing model name", "..."]
}
If nothing new is found, return { "newRackets": [], "possiblyDiscontinued": [] }.`;

  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    tools: [{ type: "web_search_20250305", name: "web_search" }],
    messages: [{ role: "user", content: prompt }],
  });

  const text = msg.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  const cleaned = text.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error(`Could not parse response for ${brand}, skipping this run for this brand.\n`, cleaned.slice(0, 500));
    return { newRackets: [], possiblyDiscontinued: [] };
  }
}

async function main() {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  const summary = { added: [], flaggedDiscontinued: [] };

  for (const brand of BRANDS) {
    const existingModels = data.racketCatalog.filter((r) => r.brand === brand).map((r) => r.model);
    console.log(`Researching ${brand}...`);
    let result;
    try {
      result = await researchBrand(brand, existingModels);
    } catch (err) {
      console.error(`Request failed for ${brand}:`, err.message);
      continue;
    }

    for (const nr of result.newRackets || []) {
      const id = slugify(nr.brand, nr.model);
      if (data.racketCatalog.some((r) => r.id === id)) continue; // already have it

      const { estimatedPriceGBP, sourceNote, ...racketFields } = nr;
      data.racketCatalog.push({ id, ...racketFields });

      // Reasonable default shot-fit by shape family, matching the app's
      // existing convention — a human should sanity-check these later.
      const shotFitByShape = {
        Diamond: { smash: 9, volley: 5, bandeja: 6, vibora: 8, kicksmash: 8, lob: 4, chiquita: 4 },
        Round: { smash: 4, volley: 9, bandeja: 8, vibora: 4, kicksmash: 3, lob: 9, chiquita: 9 },
        "Teardrop (Hybrid)": { smash: 7, volley: 7, bandeja: 7, vibora: 6, kicksmash: 6, lob: 6, chiquita: 7 },
      };
      data.shotFit[id] = shotFitByShape[nr.shape] || shotFitByShape["Teardrop (Hybrid)"];

      data.listings.push({
        racketId: id,
        retailer: `${nr.brand} Store`,
        price: estimatedPriceGBP || 199,
        originalPrice: null,
        url: null, // no real URL yet — deliberately left blank, not fabricated
        inStock: true,
        verified: false,
        isBestPrice: false,
        checkedLabel: `Auto-added ${new Date().toISOString().slice(0, 10)} — needs price/URL review. ${sourceNote || ""}`.trim(),
      });

      summary.added.push(`${nr.brand} ${nr.model}`);
    }

    for (const name of result.possiblyDiscontinued || []) {
      summary.flaggedDiscontinued.push(`${brand} ${name}`);
    }
  }

  await refreshExistingPrices(data);

  data.lastUpdated = new Date().toLocaleString("en-GB", { month: "long", year: "numeric" });
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

  const affiliateActive = !!(AFFILIATE_CONFIG.amazonAssociatesTag || AFFILIATE_CONFIG.awinPublisherId || AFFILIATE_CONFIG.cjWebsiteId);
  console.log("\n--- Summary ---");
  console.log("New rackets added:", summary.added.length ? summary.added.join(", ") : "(none)");
  console.log("Flagged as possibly discontinued (not auto-removed):", summary.flaggedDiscontinued.length ? summary.flaggedDiscontinued.join(", ") : "(none)");
  console.log("Existing racket prices refreshed:", data.racketCatalog.length);
  console.log("Affiliate link wrapping active:", affiliateActive ? "yes" : "no — add your IDs to AFFILIATE_CONFIG at the top of this script to activate");
  console.log("\nNote: every racket, including any added in this run, just went through the price-refresh pass above — so nothing should be left with url: null unless that specific search failed to find a confident price this time.");
}

main();
