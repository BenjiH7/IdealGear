/* =========================================================================
   IdealGear — pure recommendation-engine logic (no React, no JSX).
   Extracted into its own module so it can be imported both by Server
   Components (guide pages, for static generation) and Client Components
   (the interactive questionnaire) without duplicating logic.
   ========================================================================= */

import racketData from "@/data/racketCatalog.json";

const CATALOG_LAST_UPDATED = racketData.lastUpdated;
const RACKET_CATALOG = racketData.racketCatalog;
const SHOT_FIT = racketData.shotFit; // still exported in case anything displays shot fit elsewhere; no longer used in scoring
const LISTINGS = racketData.listings;

// Spain, France, Germany, Netherlands and Italy all use EUR and are served by
// the same real EU-wide retailer data — so "region" has three real values
// (UK / EU / US), not seven, which matches how retailers and currency
// actually work rather than pretending every country needs separate data.
const COUNTRY_TO_REGION = {
  "United Kingdom": "UK",
  "Spain": "EU",
  "France": "EU",
  "Germany": "EU",
  "Netherlands": "EU",
  "Italy": "EU",
  "United States": "US",
};
function regionForCountry(country) {
  return COUNTRY_TO_REGION[country] || "UK"; // sensible default for "Other" / unanswered
}
const CURRENCY_SYMBOLS = { GBP: "£", EUR: "€", USD: "$" };

function getListing(racketId, region = "UK") {
  const entry = LISTINGS.find((l) => l.racketId === racketId);
  if (!entry) return undefined;
  const regionData = entry.regions?.[region] || entry.regions?.UK;
  if (!regionData) return undefined;
  return {
    racketId: entry.racketId,
    inStock: entry.inStock,
    isBestPrice: entry.isBestPrice,
    ...regionData,
    currencySymbol: CURRENCY_SYMBOLS[regionData.currency] || "£",
  };
}

/* ---------------------------- Questionnaire config ---------------------------- */

const BRANDS = ["No preference", "Bullpadel", "Nox", "Adidas", "Head", "Babolat", "Wilson", "Siux", "Oxdog", "Other"];

// Used only to route retailer links later — doesn't affect scoring today.
const COUNTRIES = ["United Kingdom", "Spain", "France", "Germany", "Netherlands", "Italy", "United States", "Other"];

// The 5-point scale for the "how aggressively do you play?" slider question.
// Index 0 = most defensive, 4 = most aggressive; used both to render the
// slider and to interpolate scoring in scoreDefensiveAggressive() below.
const AGGRESSION_SCALE = ["Very Defensive", "Fairly Defensive", "Balanced", "Aggressive", "Very Aggressive"];

// The final question lets the user hand-tune how much each of these aspects
// matters to THEM specifically, on top of everything else the engine already
// infers. Deliberately excludes price/budget (a hard filter, never a weighting)
// and level/skill-fit (always important regardless of stated preference —
// see getAdjustedWeights below, which never touches `level`).
const PRIORITY_ASPECTS = [
  { key: "power", label: "Being able to smash hard (power)" },
  { key: "control", label: "Control and consistency" },
  { key: "weight", label: "Racket weight / feel" },
  { key: "armComfort", label: "Arm comfort" },
];

const QUESTIONS = [
  { id: "level", title: "What level are you?", type: "single", options: ["Beginner", "Intermediate", "Advanced"], textLabel: "Optional: e.g. Playtomic score, how often you play, months of experience." },
  { id: "style", title: "Which best describes your game?", type: "single", options: ["Defensive", "Balanced", "Aggressive"], textLabel: "Optional: how do you normally play points? Right or left side? Do you smash often?" },
  { id: "improve", title: "What would you most like to improve?", type: "multi", options: ["Power", "Control", "Defence", "Manoeuvrability", "Spin", "Comfort"], textLabel: "Optional: anything else you'd like that isn't listed above." },
  { id: "controlPower", title: "Are you willing to sacrifice control for a more powerful racket?", type: "single", options: ["No", "Yes", "Somewhere in the middle"], optionHelp: { "No": "I value not making unforced errors, even without much power.", "Yes": "I prefer to smash and accept a racket that's harder to handle.", "Somewhere in the middle": "I want some control and some power." }, textLabel: "Optional: anything else about this trade-off." },
  { id: "currentRacket", title: "What racket do you currently use?", type: "text-only", textLabel: "Type the brand, model and year, e.g. \"Bullpadel Hack 2026\"." },
  { id: "currentLikes", title: "What do you like or dislike about your current racket?", type: "text-only", important: true, textLabel: "This really matters — e.g. \"I love the power but it's heavy and hard to defend with.\"" },
  { id: "budget", title: "What is your budget?", type: "budget" },
  { id: "aggression", title: "How aggressive do you play?", type: "slider", options: AGGRESSION_SCALE, textLabel: "Optional: anything about how aggressively you play." },
  { id: "armComfort", title: "How important is arm comfort to you?", type: "single", options: ["Not important", "Slightly important", "Important", "Very important"], textLabel: "Optional: any history of arm/elbow discomfort, or other reasons comfort matters? (Not medical advice — just helps us weight comfort-oriented rackets.)" },
  { id: "weight", title: "How do you prefer your racket to feel?", type: "single", options: ["Light and easy to swing", "Balanced", "Solid and heavy", "Indifferent"], textLabel: "Optional: anything else about feel or weight." },
  { id: "brands", title: "Do you have any brands you particularly like?", type: "brand" },
  { id: "modelAge", title: "Does having the newest model matter to you?", type: "single", options: ["I want the newest technology", "I don't mind an older model", "I'd prefer a discounted previous model"], textLabel: "Optional: tell us more." },
  { id: "country", title: "What country are you shopping from?", type: "single", options: COUNTRIES, textLabel: "Optional: if you don't see your country, tell us here and we'll prioritise it as we add retailers." },
  { id: "other", title: "Anything else you'd like IdealGear to know?", type: "text-only", textLabel: "Optional — anything at all." },
  {
    id: "priorities",
    title: "Last thing — rate how important each of these is to you",
    type: "priority-ratings",
    items: PRIORITY_ASPECTS,
    textLabel: "1 = not important, 10 = extremely important. This fine-tunes your matches on top of everything above — it won't override your skill level or budget, which always matter.",
  },
];

const TOTAL_STEPS = QUESTIONS.length;

/* ---------------------------- Free-text heuristics ---------------------------- */
// Deterministic keyword scan. Not real AI — transparent and explainable, which
// matters more for trust than sophistication at MVP stage. Can be swapped for
// a real model call later without changing anything downstream.

function scanText(...texts) {
  const t = texts.filter(Boolean).join(" ").toLowerCase();
  return {
    wantsMorePower: /more power|underpowered|no power|lacks power|weak(er)? smash/.test(t),
    wantsLessPower: /too powerful|too much power|hard to handle|overpowered/.test(t),
    wantsMoreControl: /more control|too many errors|unforced errors|erratic|inconsistent/.test(t),
    wantsMoreManeuver: /heavy|hard to move|slow to react|difficult to (move|position)|manoeuvrab|maneuvrab|can't get (it|the racket) (in|to) position/.test(t),
    wantsLighter: /too heavy|feels heavy|wrist|tired arm|fatigu/.test(t),
    wantsComfort: /elbow|tennis elbow|injury|sore|pain|comfort/.test(t),
    wantsDurability: /durab|crack|break(s|ing)?/.test(t),
    lovesCurrentPower: /love the power|great power|plenty of power/.test(t),
    struggleDefense: /struggle(s)? to defend|hard to defend|can't defend|weak defen/.test(t),
  };
}

/* ---------------------------- Scoring engine ---------------------------- */
// Budget and explicit brand deal-breakers are hard filters applied BEFORE
// scoring — price never carries a weighting of its own.
//
// The user-set "priorities" question (final step) then scales a subset of
// these weights up or down by up to 20% — see getAdjustedWeights(). Level
// (skill fit) is deliberately never adjustable: it always matters regardless
// of what the user says elsewhere.

const WEIGHTS = {
  level: 26,
  style: 18,
  improvementFit: 17,
  controlPower: 12,
  defensiveAggressive: 12,
  armComfort: 3,
  weight: 3,
  budgetValue: 4,
  brand: 3,
  modelAge: 2,
};

// Keys the final priority-ratings question is allowed to scale. Anything not
// listed here (level, improvementFit, budgetValue, brand, modelAge, style,
// defensiveAggressive) stays exactly as computed above, no matter what the
// user rates on the final question.
const ADJUSTABLE_WEIGHT_KEYS = ["controlPower", "weight", "armComfort"];
const MAX_WEIGHT_ADJUSTMENT = 0.20; // ±20%, per the brief

function priorityScale(rating) {
  if (typeof rating !== "number" || !Number.isFinite(rating)) return 1; // unanswered -> no change
  const clamped = Math.max(1, Math.min(10, rating));
  // 1 -> 0.80x, 5.5 -> 1.0x (neutral), 10 -> 1.20x, linear between.
  return 1 + ((clamped - 5.5) / 4.5) * MAX_WEIGHT_ADJUSTMENT;
}

function getAdjustedWeights(answers) {
  const p = answers?.priorities || {};
  const adjusted = { ...WEIGHTS };

  // Power & Control currently share one combined dimension (controlPower).
  // Scale it by how important the user says this trade-off is overall.
  if (typeof p.power === "number" || typeof p.control === "number") {
    const powerRating = typeof p.power === "number" ? p.power : 5.5;
    const controlRating = typeof p.control === "number" ? p.control : 5.5;
    adjusted.controlPower = WEIGHTS.controlPower * priorityScale((powerRating + controlRating) / 2);
  }
  if (typeof p.weight === "number") {
    adjusted.weight = WEIGHTS.weight * priorityScale(p.weight);
  }
  if (typeof p.armComfort === "number") {
    adjusted.armComfort = WEIGHTS.armComfort * priorityScale(p.armComfort);
  }
  return adjusted;
}

function passesHardFilters(racket, listing, answers) {
  if (!listing) return false;
  const { min, max, stretchOk } = answers.budget || {};
  if (typeof max === "number" && Number.isFinite(max)) {
    const ceiling = stretchOk === "Yes" ? max * 1.15 : max;
    if (listing.price > ceiling) return false;
  }
  if (typeof min === "number" && Number.isFinite(min) && listing.price < min * 0.85) return false; // slight leeway below min

  const brandInfo = answers.brands;
  if (brandInfo?.dealBreaker && brandInfo.selected?.length) {
    const allowed = brandInfo.selected.map((b) => b.toLowerCase());
    if (!allowed.includes(racket.brand.toLowerCase())) return false;
  }
  return true;
}

function scoreLevel(racket, level) {
  if (level === "Beginner") return racket.beginnerFit ?? 5;
  if (level === "Advanced") return racket.advancedFit ?? 5;
  return racket.intermediateFit ?? 5;
}

function scoreStyle(racket, style) {
  // Defensive players score higher on control/maneuverability/defense rackets.
  // Aggressive players score higher on power/offense rackets. Balanced blends both.
  if (style === "Defensive") return (racket.control * 0.4 + racket.maneuverability * 0.3 + racket.defense * 0.3);
  if (style === "Aggressive") return (racket.power * 0.5 + racket.offense * 0.5);
  return (racket.power * 0.25 + racket.control * 0.25 + racket.maneuverability * 0.25 + racket.defense * 0.25);
}

function scoreImprovementFit(racket, answers, flags) {
  const improve = answers.improve?.selected || [];
  let score = 0, count = 0;
  const bump = (val) => { score += val; count += 1; };

  if (improve.includes("Power") || flags.wantsMorePower) bump(racket.power);
  if (improve.includes("Control") || flags.wantsMoreControl) bump(racket.control);
  if (improve.includes("Defence") || flags.struggleDefense) bump(racket.defense);
  if (improve.includes("Manoeuvrability") || flags.wantsMoreManeuver || flags.wantsLighter) bump(racket.maneuverability);
  if (improve.includes("Spin")) bump(racket.spin);
  if (improve.includes("Comfort") || flags.wantsComfort) bump(racket.comfort);

  // Counter-signals from free text: if they liked their current racket's power
  // and it wasn't flagged as a problem, don't penalise power-heavy options.
  if (flags.wantsLessPower) { score -= racket.power * 0.5; count += 0.5; }

  if (count === 0) return 6; // neutral if nothing specific was said
  return Math.max(0, Math.min(10, score / count));
}

function scoreControlPower(racket, pref, priorities) {
  // If the user gave explicit 1-10 ratings on the final question, those are
  // a more precise signal than the earlier 3-option trade-off — use them to
  // blend control vs. power directly.
  const p = priorities || {};
  if (typeof p.power === "number" && typeof p.control === "number" && (p.power + p.control) > 0) {
    return (racket.control * p.control + racket.power * p.power) / (p.power + p.control);
  }
  if (pref === "No") return racket.control;
  if (pref === "Yes") return racket.power;
  return (racket.control + racket.power) / 2;
}

// Interpolates between a "pure defensive" blend and a "pure aggressive" blend
// across the 5-point AGGRESSION_SCALE, giving a more granular read on
// playing-style aggression than the coarse 3-option `style` question — the
// two are deliberately separate, independently-weighted signals.
function scoreDefensiveAggressive(racket, selected) {
  const idx = AGGRESSION_SCALE.indexOf(selected);
  if (idx === -1) return 6; // unanswered -> neutral
  const t = idx / (AGGRESSION_SCALE.length - 1); // 0 (very defensive) -> 1 (very aggressive)
  const defensiveScore = racket.control * 0.4 + racket.maneuverability * 0.3 + racket.defense * 0.3;
  const aggressiveScore = racket.power * 0.5 + racket.offense * 0.5;
  return defensiveScore * (1 - t) + aggressiveScore * t;
}

function scoreArmComfort(racket, level) {
  const base = racket.armFriendly ?? 5;
  if (level === "Very important") return base;
  if (level === "Important") return base * 0.9 + 0.5;
  if (level === "Slightly important") return base * 0.6 + 3;
  return 6; // not important -> near-neutral
}

function scoreWeight(racket, pref) {
  const wg = racket.weightG || 365;
  if (pref === "Light and easy to swing") return wg <= 355 ? 10 : wg <= 365 ? 6 : 2;
  if (pref === "Solid and heavy") return wg >= 368 ? 10 : wg >= 360 ? 6 : 2;
  if (pref === "Balanced") return wg > 356 && wg < 368 ? 10 : 6;
  return 7; // indifferent
}

function scoreBudgetValue(listing, budget) {
  if (!budget?.max) return 6;
  const ratio = listing.price / budget.max;
  if (ratio <= 1) return 10 - Math.abs(1 - ratio) * 4; // reward being comfortably within budget
  return Math.max(0, 10 - (ratio - 1) * 40); // penalise stretch pricing
}

function scoreBrand(racket, brandInfo) {
  if (!brandInfo?.selected?.length || brandInfo.selected.includes("No preference")) return 6;
  return brandInfo.selected.map((b) => b.toLowerCase()).includes(racket.brand.toLowerCase()) ? 10 : 5;
}

function scoreModelAge(racket, pref) {
  const isNew = racket.year >= 2025;
  if (pref === "I want the newest technology") return isNew ? 10 : 4;
  if (pref === "I'd prefer a discounted previous model") return isNew ? 4 : 10;
  return 7;
}

function buildRecommendations(answers) {
  const region = regionForCountry(answers.country?.selected);
  const flags = scanText(
    answers.style?.text, answers.improve?.text, answers.currentLikes?.text,
    answers.controlPower?.text, answers.other?.text
  );
  const adjustedWeights = getAdjustedWeights(answers);

  const scored = RACKET_CATALOG.map((racket) => {
    const listing = getListing(racket.id, region);
    if (!passesHardFilters(racket, listing, answers)) return null;

    const parts = {
      level: scoreLevel(racket, answers.level?.selected),
      style: scoreStyle(racket, answers.style?.selected),
      improvementFit: scoreImprovementFit(racket, answers, flags),
      controlPower: scoreControlPower(racket, answers.controlPower?.selected, answers.priorities),
      defensiveAggressive: scoreDefensiveAggressive(racket, answers.aggression?.selected),
      armComfort: scoreArmComfort(racket, answers.armComfort?.selected),
      weight: scoreWeight(racket, answers.weight?.selected),
      budgetValue: scoreBudgetValue(listing, answers.budget),
      brand: scoreBrand(racket, answers.brands),
      modelAge: scoreModelAge(racket, answers.modelAge?.selected),
    };

    let total = 0, weightSum = 0;
    Object.entries(adjustedWeights).forEach(([key, w]) => {
      total += (parts[key] ?? 0) * w;
      weightSum += w;
    });
    const matchPct = Math.round((total / (weightSum * 10)) * 100);

    return { racket, listing, matchPct, parts, flags };
  }).filter(Boolean);

  scored.sort((a, b) => b.matchPct - a.matchPct);
  return { results: scored.slice(0, 5), flags };
}

function levelReason(racket, level) {
  const beginnerFit = racket.beginnerFit ?? 5;
  const advancedFit = racket.advancedFit ?? 5;
  const intermediateFit = racket.intermediateFit ?? 5;
  const forgiving = beginnerFit >= 7;
  const demanding = beginnerFit <= 3 && advancedFit >= 8;
  const versatile = beginnerFit >= 6 && intermediateFit >= 6 && advancedFit >= 6;

  let base;
  if (demanding) base = "This is a more advanced, less forgiving racket — it has a small sweet spot and rewards precise, consistent technique rather than absorbing mishits";
  else if (forgiving) base = "This is a forgiving racket with a larger sweet spot, so off-centre hits are less punishing";
  else base = "This sits in the middle in terms of difficulty — not the most forgiving racket, but not a purely advanced tool either";

  let tail = "";
  if (versatile) tail = ", and it's versatile enough to work well whether you're a beginner, intermediate or advanced player.";
  else if (demanding) tail = ` — it isn't a good fit for beginners, but ${level === "Advanced" ? "as an advanced player you'll" : "a more advanced player would"} get the most from it.`;
  else if (forgiving && advancedFit <= 4) tail = ", which suits beginners and improvers well, though advanced players may find it limits their ceiling on power and spin.";
  else tail = ".";

  return base + tail;
}

function styleReason(racket, style) {
  const shape = (racket.shape || "").toLowerCase();
  const balance = (racket.balance || "").toLowerCase();
  if (style === "Aggressive" && racket.power >= 6) {
    return `Its ${shape} shape and ${balance} balance point weight toward the head, which generates extra pace on smashes and attacking shots to suit your aggressive game.`;
  }
  if (style === "Defensive" && racket.control >= 6) {
    return `Its ${shape} shape gives it a larger sweet spot and more predictable rebound, which helps you stay consistent and defend points reliably.`;
  }
  if (style === "Balanced") {
    return `It splits fairly evenly between power (${racket.power}/10) and control (${racket.control}/10) rather than leaning hard into one, which matches a balanced style that needs both.`;
  }
  return null;
}

function buildReasons(item, answers) {
  const { racket, listing, parts, flags } = item;
  const reasons = [];
  const level = answers.level?.selected;
  const style = answers.style?.selected;
  const improve = answers.improve?.selected || [];

  if (parts.level >= 5) reasons.push(levelReason(racket, level));
  const styleLine = parts.style >= 6 ? styleReason(racket, style) : null;
  if (styleLine) reasons.push(styleLine);

  if ((improve.includes("Power") || flags.wantsMorePower) && racket.power >= 6) {
    reasons.push(`You wanted more power — its ${(racket.balance || "").toLowerCase()} balance shifts weight toward the head, adding pop to your shots without you needing to swing harder.`);
  }
  if ((improve.includes("Control") || flags.wantsMoreControl) && racket.control >= 6) {
    reasons.push(`You wanted more control — its softer, more forgiving core keeps off-centre hits playable, which should cut down on unforced errors.`);
  }
  if ((improve.includes("Manoeuvrability") || flags.wantsMoreManeuver || flags.wantsLighter) && racket.maneuverability >= 6) {
    reasons.push(`You mentioned wanting more manoeuvrability — at ${racket.weightG}g with a ${(racket.balance || "").toLowerCase()} balance, it's quicker to bring into position at the net than a heavier, head-heavy racket.`);
  }
  if ((improve.includes("Defence") || flags.struggleDefense) && racket.defense >= 6) {
    reasons.push(`You said defence needs work — its larger sweet spot and control-first design make it easier to dig balls out under pressure.`);
  }
  if (improve.includes("Spin") && racket.spin >= 6) {
    reasons.push(`You wanted more spin — its surface texture and frame shape help the strings grip the ball longer through contact.`);
  }
  if ((improve.includes("Comfort") || flags.wantsComfort) && racket.comfort >= 6) {
    reasons.push(`Comfort mattered to you — its softer core absorbs more shock on off-centre hits, which is easier on the arm over a long match.`);
  }
  if (answers.armComfort?.selected === "Very important" && racket.armFriendly >= 7) {
    reasons.push(`Arm comfort was very important to you — this is one of the softer, more arm-friendly options in its category.`);
  }
  const budgetMax = answers.budget?.max;
  if (budgetMax && listing.price > budgetMax) {
    reasons.push(`It's £${listing.price}, slightly above your £${budgetMax} maximum, but you told us you'd consider spending slightly more for the right racket.`);
  }
  if (answers.brands?.selected?.length && !answers.brands.selected.includes("No preference") && answers.brands.selected.map(b=>b.toLowerCase()).includes(racket.brand.toLowerCase())) {
    reasons.push(`It's from ${racket.brand}, one of your preferred brands.`);
  }
  return reasons.slice(0, 5);
}

function buildBestFor(racket) {
  const fits = [
    ["beginners", racket.beginnerFit ?? 5],
    ["intermediate players", racket.intermediateFit ?? 5],
    ["advanced players", racket.advancedFit ?? 5],
  ];
  fits.sort((a, b) => b[1] - a[1]);
  const audience = fits[0][1] - fits[1][1] >= 2 ? fits[0][0] : `${fits[0][0]} and ${fits[1][0]}`;

  const diff = (racket.power ?? 5) - (racket.control ?? 5);
  let trait;
  if (diff <= -3) trait = "maximum control over outright power";
  else if (diff <= -1) trait = "maximum control with a bit of power";
  else if (diff < 1) trait = "a genuine balance of power and control";
  else if (diff < 3) trait = "a bit more power without giving up too much control";
  else trait = "maximum power, even if it costs some control";

  let extra = "";
  if ((racket.maneuverability ?? 5) >= 8) extra = " — especially good if you value quick hands at the net";
  else if ((racket.armFriendly ?? 5) >= 8) extra = " — especially good if arm comfort matters to you";

  return `Best for: ${audience} looking for ${trait}${extra}.`;
}

function buildDrawback(item, answers) {
  const { racket, parts } = item;
  const adjustedWeights = getAdjustedWeights(answers);
  const labels = {
    level: "may feel slightly mismatched to your stated level",
    style: "isn't a perfect fit for your playing style — a small compromise",
    improvementFit: "doesn't fully address everything you said you wanted to improve",
    controlPower: "leans a bit differently on the control-vs-power balance than you asked for",
    defensiveAggressive: "doesn't quite match how aggressively you said you play",
    armComfort: "is firmer than ideal if arm comfort is a top priority",
    weight: "may not match your exact weight preference",
    budgetValue: "is towards the upper end of what you told us you want to spend",
    brand: "isn't from one of your preferred brands",
    modelAge: "isn't the newest model on the market",
  };

  // Only consider a dimension if the user actually gave us a signal on it —
  // otherwise a neutral "no opinion" default gets unfairly picked as a flaw.
  const hasSignal = {
    level: !!answers.level?.selected,
    style: !!answers.style?.selected,
    improvementFit: (answers.improve?.selected || []).length > 0,
    controlPower: !!answers.controlPower?.selected || typeof answers.priorities?.power === "number" || typeof answers.priorities?.control === "number",
    defensiveAggressive: !!answers.aggression?.selected,
    armComfort: (answers.armComfort?.selected && answers.armComfort.selected !== "Not important") || typeof answers.priorities?.armComfort === "number",
    weight: (answers.weight?.selected && answers.weight.selected !== "Indifferent") || typeof answers.priorities?.weight === "number",
    budgetValue: true,
    brand: !!(answers.brands?.selected?.length && !answers.brands.selected.includes("No preference")),
    modelAge: !!answers.modelAge?.selected,
  };

  // Rank by weighted deficit (how many match-points this dimension actually
  // cost), not the raw rating — a low score on a 2%-weight factor matters far
  // less than a mediocre score on a 25%-weight factor. Uses the user's
  // personalised weights (after the priorities question), not the raw base
  // WEIGHTS, so the drawback reflects what actually mattered to this person.
  const ranked = Object.entries(parts)
    .filter(([key]) => hasSignal[key])
    .map(([key, val]) => [key, (adjustedWeights[key] || 0) * (10 - val)])
    .sort((a, b) => b[1] - a[1]);

  const weakest = ranked[0] || Object.entries(parts).sort((a, b) => a[1] - b[1])[0];
  return `This racket's biggest compromise: it ${labels[weakest[0]] || "isn't a perfect match on every factor"}.`;
}

function buildChallenge(answers, results) {
  // Detect a real conflict: user wants power but level/style suggest caution.
  const wantsPower = answers.improve?.selected?.includes("Power");
  const cautious = answers.level?.selected === "Beginner" || answers.style?.selected === "Defensive" || answers.controlPower?.selected === "No";
  if (wantsPower && cautious && results.length) {
    return `You told us power is a priority, but your level and playing style suggest an extremely powerful, hard-to-control racket could work against you. We've prioritised rackets that add power while keeping enough control and manoeuvrability for your game.`;
  }
  return null;
}

/* ---------------------------- UI helpers ---------------------------- */


export {
  CATALOG_LAST_UPDATED, RACKET_CATALOG, SHOT_FIT, LISTINGS, getListing,
  regionForCountry, CURRENCY_SYMBOLS,
  BRANDS, COUNTRIES, AGGRESSION_SCALE, PRIORITY_ASPECTS, QUESTIONS, TOTAL_STEPS, WEIGHTS,
  scanText, passesHardFilters, buildRecommendations,
  buildReasons, buildBestFor, buildDrawback, buildChallenge,
};
