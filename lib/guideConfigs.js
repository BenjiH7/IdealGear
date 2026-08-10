// Guide page content, built from the real catalogue and the same scoring
// engine used elsewhere in the app — not separately-written marketing copy —
// so this stays consistent with what the questionnaire itself would say.
//
// Each config's `body` array adds real, substantive sections (not filler)
// to give these pages genuine depth for search — thin pages tend not to
// rank well for competitive terms like "best padel racket for beginners."
export const GUIDE_CONFIGS = {
  beginners: {
    title: "Best Padel Rackets for Beginners (2026)",
    description: "A guide to the best padel rackets for beginners in 2026 — forgiving, comfortable rackets with a large sweet spot, picked and explained by IdealGear.",
    heading: "Best Padel Rackets for Beginners",
    intro: "New to padel? The most forgiving rackets have a round shape, a larger sweet spot and a softer core — they're more forgiving of off-centre hits, which matters far more at the start than raw power. They also tend to be less expensive than premium, performance-first rackets.",
    filterFn: (r) => (r.beginnerFit ?? 0) >= 8,
    body: [
      ["Why shape matters more than anything else early on", "A padel racket's shape — round, teardrop, or diamond — determines where the sweet spot sits and how large it is. Round rackets concentrate their sweet spot in the centre of the face and make it as large as the shape allows, which means off-centre hits (extremely common while you're still learning timing and positioning) still produce a playable shot instead of a mishit. Diamond rackets do the opposite: they push the sweet spot toward the top of the face for maximum power, at the cost of forgiveness. As a beginner, that trade-off almost always works against you."],
      ["Core softness and why it's not just about comfort", "Padel racket cores are usually EVA foam, and the softness of that foam changes how forgiving a mishit feels and how much control you have over placement. A soft core absorbs more energy on contact, which both reduces arm strain over a long session and gives you more time to feel where the ball is going, rather than the ball simply rebounding off a stiff surface at high speed. This is why nearly every genuinely beginner-oriented racket pairs a round shape with a soft core — the two work together."],
      ["A common mistake worth avoiding", "It's tempting to buy the racket a favourite pro uses, but professional rackets are almost always diamond-shaped, firm-cored, and built for players with years of consistent technique. Starting on one of these typically means more mishits, more arm strain, and a slower learning curve — not a shortcut to playing like a pro."],
    ],
  },
  control: {
    title: "Best Padel Rackets for Control (2026)",
    description: "The best padel rackets for control in 2026 — round and hybrid-shaped rackets that prioritise consistency and reduce unforced errors, picked by IdealGear.",
    heading: "Best Padel Rackets for Control",
    intro: "If unforced errors are costing you more points than a lack of power, a control-first racket — usually round or teardrop-shaped, with a softer, more forgiving core — is normally the better upgrade.",
    filterFn: (r) => (r.control ?? 0) >= 8,
    body: [
      ["What control actually means in a racket", "Control isn't a vague marketing term — it comes from two measurable design choices. First, a larger, more centred sweet spot (from a round or teardrop shape) means more of your shots land on the part of the face that gives predictable, accurate rebound. Second, a softer core keeps the ball on the strings fractionally longer on contact, giving you more influence over direction and depth compared to a stiff core that rebounds the ball almost instantly."],
      ["Who actually benefits from a control racket", "It's a common misconception that control rackets are only for beginners. Plenty of advanced and even professional players — particularly those who play a patient, defensive game built around consistency rather than winning points outright — choose round, control-first rackets specifically because they suit a tactical style. Control is a playing style choice as much as a skill-level one."],
      ["The trade-off to expect", "A genuinely control-first racket won't generate as much raw pace on a smash as a diamond, power-oriented racket. If your game relies on finishing points at the net with power, a pure control racket may feel underwhelming there — which is exactly why IdealGear's recommendation engine weighs your whole profile, not just one factor, rather than assuming control is always the right answer."],
    ],
  },
  power: {
    title: "Best Padel Rackets for Power (2026)",
    description: "The best padel rackets for power in 2026 — diamond-shaped, head-heavy rackets built for smashing and attacking play, picked by IdealGear.",
    heading: "Best Padel Rackets for Power",
    intro: "Power rackets are almost always diamond-shaped with a high, head-heavy balance — that concentrates weight where the ball is struck, adding pace at the cost of a smaller sweet spot and less forgiveness.",
    filterFn: (r) => (r.power ?? 0) >= 8,
    body: [
      ["How diamond shape actually generates power", "A diamond-shaped racket shifts its mass toward the top of the face, close to where the string bed strikes the ball on a smash or attacking shot. More mass concentrated at the point of impact means more momentum transferred into the ball, which is what actually produces extra pace — not just a firmer core, though that plays a role too. The trade-off is a smaller, less centred sweet spot, since that mass is no longer evenly distributed."],
      ["Why power rackets demand more consistent technique", "Because the sweet spot is smaller and positioned higher on the face, a mishit on a diamond racket produces a much less playable result than the same mishit on a round racket. This is why power rackets are typically recommended for intermediate-to-advanced players and above — the racket rewards a technically consistent, well-timed swing, and can actively work against a player who's still developing that consistency."],
      ["Power isn't only about the smash", "While the smash is the shot people associate most with power rackets, the extra pace also shows up on flat, attacking volleys and on offensive baseline shots. If your game is built around finishing points quickly rather than long rallies, a power racket amplifies that style — provided your technique can consistently find the smaller sweet spot."],
    ],
  },
  intermediate: {
    title: "Best Padel Rackets for Intermediate Players (2026)",
    description: "The best padel rackets for intermediate players in 2026 — a blend of power and control for players moving past the basics, picked by IdealGear.",
    heading: "Best Padel Rackets for Intermediate Players",
    intro: "Once the basics are solid, most intermediate players benefit from a hybrid or teardrop-shaped racket — enough power to start attacking, without losing the control a round racket gave you as a beginner.",
    filterFn: (r) => (r.intermediateFit ?? 0) >= 8,
    body: [
      ["Why teardrop/hybrid shape exists as a middle ground", "A teardrop (sometimes called hybrid) shape sits between round and diamond, both in where its sweet spot sits and in how much power versus control it delivers. It's a genuine engineering middle ground, not a compromise for the sake of it — the sweet spot is larger than a diamond's but smaller and slightly higher than a round racket's, giving a real blend of both characteristics rather than diluting each."],
      ["The most common upgrade mistake at this stage", "Many players moving up from a beginner round racket jump straight to a diamond, power racket because they associate progress with power. In practice, this often increases unforced errors faster than it adds winning shots, since technique isn't always consistent enough yet to control a smaller sweet spot. A teardrop racket is usually the more sustainable step — it lets power grow gradually alongside technique, rather than forcing the trade-off all at once."],
      ["What actually signals you're ready for more power", "A genuine signal you're ready to move toward a more power-oriented racket isn't time played, it's consistency — specifically, how rarely you're mishitting attacking shots and smashes on your current racket. If mishits are still a regular occurrence, a hybrid racket that's more forgiving than a full diamond is usually the better next step, even if you're keen to add pace."],
    ],
  },
  advanced: {
    title: "Best Padel Rackets for Advanced Players (2026)",
    description: "The best padel rackets for advanced players in 2026 — demanding, less forgiving rackets that reward precise, consistent technique, picked by IdealGear.",
    heading: "Best Padel Rackets for Advanced Players",
    intro: "Advanced players can generally handle a smaller sweet spot in exchange for more power or spin, since consistent technique makes the racket's extra demands less of a liability. These are often diamond-shaped rackets built from premium, firmer materials — not necessarily the most forgiving racket, but the most capable in the right hands.",
    filterFn: (r) => (r.advancedFit ?? 0) >= 8,
    body: [
      ["Why premium materials matter more at this level", "Advanced rackets typically use higher-grade carbon fibre (often measured in K-weight, e.g. 12K or 18K) on the striking surface, along with firmer, higher-density foam cores. These materials transfer more energy into the ball on contact and respond more predictably to spin-generating technique, but they also give far less margin for error than the softer materials found in beginner and intermediate rackets — which is exactly why they're not recommended for players still building consistent technique."],
      ["Diamond shape isn't automatically the right choice, even at an advanced level", "Plenty of advanced and professional players play a defensive or all-court style and deliberately choose round or teardrop-shaped rackets despite having the technique to handle a diamond. Advanced describes technical ability, not a required playing style — this is exactly why IdealGear weighs your playing style alongside your level, rather than assuming advanced always means diamond."],
      ["What tends to separate good advanced rackets from the rest", "At this level, small details matter more: sweet-spot placement relative to your typical contact point, how the racket's balance suits your swing speed, and vibration dampening for players managing existing strain on the arm. These are harder to judge from specs alone, which is part of why demo-testing a shortlist before buying is worth the extra step at this level."],
    ],
  },
  budget: {
    title: "Best Padel Rackets for a Budget (2026)",
    description: "The best padel rackets for a budget in 2026 — good value picks under £150 across brands, without sacrificing the basics, picked by IdealGear.",
    heading: "Best Padel Rackets for a Budget",
    intro: "You don't need to spend £250+ to get a decent racket. These are solid, well-reviewed options under £150 — a sensible starting point before upgrading once you know your game better.",
    filterFn: (r, getListing) => (getListing(r.id)?.price ?? 999) <= 150,
    body: [
      ["What you're actually paying extra for at higher price points", "The jump from a £100 racket to a £300 racket is mostly about materials (higher-grade carbon, more advanced foam formulations) and manufacturing precision, not a fundamentally different design. For players still developing consistent technique, the performance difference is often smaller in practice than the price difference suggests — a well-chosen budget racket in the right shape for your level will usually outperform an expensive racket that's the wrong shape for you."],
      ["When it's genuinely worth spending more", "Spending more starts to matter once your technique is consistent enough to reliably find a smaller sweet spot, or once you're playing frequently enough that a firmer, more durable construction pays for itself over time. Until then, budget is rarely the limiting factor on your game."],
      ["A sensible way to think about your first racket purchase", "Since playing level and style change fastest in your first year or two, a lower-cost racket that's genuinely well-matched to where you are now is usually a better first purchase than a premium racket bought on the assumption of where you'll be in a year. You can always upgrade once your game — and your preferences — are clearer."],
    ],
  },
  nox: {
    title: "Best Nox Rackets (2026)",
    description: "A guide to the best Nox padel rackets in 2026, compared and explained by IdealGear.",
    heading: "Best Nox Rackets",
    intro: "Nox is one of the most established padel brands, with rackets spanning from control-first round shapes to high-power diamond shapes. Here's how their current range compares.",
    filterFn: (r) => r.brand === "Nox",
    body: [
      ["Nox's range, in brief", "Nox is one of the longest-standing dedicated padel brands, and its current lineup spans the full spectrum: entry-level round rackets built for forgiveness and comfort, hybrid control-focused models aimed at intermediate and advanced players who value consistency, and flagship diamond-shaped attack rackets built for maximum power. The brand is closely associated with several top World Padel Tour professionals, whose signature lines sit at the premium end of the range."],
      ["How to navigate Nox's naming conventions", "Nox generally signals a racket's character through its family name and materials — round, forgiving models tend to sit in more accessible entry-level families, while rackets described with terms like Attack, higher carbon-K ratings, or a professional player's name are almost always diamond-shaped and built for advanced, power-oriented players. Checking the shape and core softness specifically, rather than assuming from the name alone, is still the more reliable way to judge fit."],
    ],
  },
  bullpadel: {
    title: "Best Bullpadel Rackets (2026)",
    description: "A guide to the best Bullpadel padel rackets in 2026, compared and explained by IdealGear.",
    heading: "Best Bullpadel Rackets",
    intro: "Bullpadel is one of the most widely used brands on the professional tour, with a range that covers both control-first and power-first players. Here's how their current range compares.",
    filterFn: (r) => r.brand === "Bullpadel",
    body: [
      ["Bullpadel's range, in brief", "Bullpadel is one of the most represented brands among professional players, and its range reflects that — genuine diamond-shaped power rackets built for attacking, offensive play sit alongside round, control-oriented models built for accessibility and comfort. The brand tends to differentiate its lines clearly by shape rather than blending characteristics, which makes it relatively straightforward to match a specific Bullpadel model to your playing style once you know your shape preference."],
      ["What to check before buying a Bullpadel racket specifically", "Because Bullpadel's power-oriented rackets are genuinely demanding (smaller sweet spot, firmer core, often heavier), it's worth being honest about your current level and consistency before choosing one purely because it's the same model a favourite professional uses. Bullpadel's more forgiving, round-shaped models are a more realistic starting point for most improving players, with room to move toward the power end of the range as technique develops."],
    ],
  },
  adidas: {
    title: "Best Adidas Rackets (2026)",
    description: "A guide to the best Adidas padel rackets in 2026, compared and explained by IdealGear.",
    heading: "Best Adidas Rackets",
    intro: "Adidas's padel range spans from control-oriented rackets to high-power diamond shapes. Here's how their current lineup compares.",
    filterFn: (r) => r.brand === "Adidas",
    body: [
      ["Adidas's range, in brief", "Adidas entered padel more recently than some of the sport's dedicated specialist brands, but has built out a full range spanning true entry-level round rackets through to premium diamond-shaped attack models. Adidas rackets tend to lean into distinctive visual design alongside their performance specs, but the underlying shape-and-core logic that determines how a racket actually plays is consistent with the rest of the market."],
      ["A note on Adidas's control-labelled models", "Several Adidas rackets use CTRL or Control in their naming even when built on a round shape with a genuinely soft core — worth confirming the actual shape and core material rather than relying on the name alone, since naming conventions aren't fully standardised across brands."],
    ],
  },
  babolat: {
    title: "Best Babolat Rackets (2026)",
    description: "A guide to the best Babolat padel rackets in 2026, compared and explained by IdealGear.",
    heading: "Best Babolat Rackets",
    intro: "Babolat brings its racket-sports engineering background to padel, with a range spanning a balanced hybrid shape through to a high-power diamond shape. Here's how their current lineup compares.",
    filterFn: (r) => r.brand === "Babolat",
    body: [
      ["Babolat's range, in brief", "Babolat's padel range is organised around three consistent families — broadly, a beginner-friendly round line, a hybrid/teardrop intermediate line, and a diamond-shaped power line used by several professional players — each offered in multiple variants. This is one of the more clearly structured ranges in padel, which makes it comparatively easy to identify which family suits your level once you know whether you're after control, a blend, or power."],
      ["What carries over from Babolat's tennis background", "Babolat is one of the longest-established racket-sports manufacturers, and several of its padel construction choices (multi-density foam cores, layered carbon face construction) draw on decades of tennis and badminton racket engineering. In practice this tends to show up as slightly more refined vibration dampening across the range, which can matter if arm comfort is a priority for you."],
    ],
  },
  balanced: {
    title: "Best Padel Rackets for Balanced Players (2026)",
    description: "The best padel rackets for balanced players in 2026 — hybrid-shaped rackets that don't lean hard into power or control, picked by IdealGear.",
    heading: "Best Padel Rackets for Balanced Players",
    intro: "Not sure whether you're a power or control player yet? A balanced, usually teardrop-shaped racket gives you a genuine mix of both, rather than committing you to one style before you know your game.",
    filterFn: (r) => Math.abs((r.power ?? 5) - (r.control ?? 5)) <= 1 && (r.power ?? 0) >= 6,
    body: [
      ["Why balanced is a legitimate long-term choice, not just a starting point", "It's tempting to think of a balanced racket purely as a stepping stone toward eventually specialising in power or control. In practice, many players — particularly all-court players who mix attacking and defensive play depending on the point — find that a genuinely balanced racket suits their game indefinitely, not just while they're still deciding. There's no requirement to eventually specialise."],
      ["How to tell if balanced is actually right for you", "If you find yourself equally comfortable finishing points at the net and defending from the back of the court, or if your playing style genuinely varies point to point rather than following one consistent game plan, a balanced racket is likely to suit your actual game better than committing to either extreme — which is exactly the kind of nuance IdealGear's questionnaire is designed to pick up on."],
    ],
  },
};
