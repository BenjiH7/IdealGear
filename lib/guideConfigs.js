// Guide page content, built from the real catalogue and the same scoring
// engine used elsewhere in the app — not separately-written marketing copy —
// so this stays consistent with what the questionnaire itself would say.
export const GUIDE_CONFIGS = {
  beginners: {
    title: "Best Padel Rackets for Beginners (2026)",
    description: "A guide to the best padel rackets for beginners in 2026 — forgiving, comfortable rackets with a large sweet spot, picked and explained by IdealGear.",
    heading: "Best Padel Rackets for Beginners",
    intro: "New to padel? The most forgiving rackets have a round shape, a larger sweet spot and a softer core — they're more forgiving of off-centre hits, which matters far more at the start than raw power. They also tend to be less expensive than premium, performance-first rackets.",
    filterFn: (r) => (r.beginnerFit ?? 0) >= 8,
  },
  control: {
    title: "Best Padel Rackets for Control (2026)",
    description: "The best padel rackets for control in 2026 — round and hybrid-shaped rackets that prioritise consistency and reduce unforced errors, picked by IdealGear.",
    heading: "Best Padel Rackets for Control",
    intro: "If unforced errors are costing you more points than a lack of power, a control-first racket — usually round or teardrop-shaped, with a softer, more forgiving core — is normally the better upgrade.",
    filterFn: (r) => (r.control ?? 0) >= 8,
  },
  power: {
    title: "Best Padel Rackets for Power (2026)",
    description: "The best padel rackets for power in 2026 — diamond-shaped, head-heavy rackets built for smashing and attacking play, picked by IdealGear.",
    heading: "Best Padel Rackets for Power",
    intro: "Power rackets are almost always diamond-shaped with a high, head-heavy balance — that concentrates weight where the ball is struck, adding pace at the cost of a smaller sweet spot and less forgiveness.",
    filterFn: (r) => (r.power ?? 0) >= 8,
  },
  intermediate: {
    title: "Best Padel Rackets for Intermediate Players (2026)",
    description: "The best padel rackets for intermediate players in 2026 — a blend of power and control for players moving past the basics, picked by IdealGear.",
    heading: "Best Padel Rackets for Intermediate Players",
    intro: "Once the basics are solid, most intermediate players benefit from a hybrid or teardrop-shaped racket — enough power to start attacking, without losing the control a round racket gave you as a beginner.",
    filterFn: (r) => (r.intermediateFit ?? 0) >= 8,
  },
  advanced: {
    title: "Best Padel Rackets for Advanced Players (2026)",
    description: "The best padel rackets for advanced players in 2026 — demanding, less forgiving rackets that reward precise, consistent technique, picked by IdealGear.",
    heading: "Best Padel Rackets for Advanced Players",
    intro: "Advanced players can generally handle a smaller sweet spot in exchange for more power or spin, since consistent technique makes the racket's extra demands less of a liability. These are often diamond-shaped rackets built from premium, firmer materials — not necessarily the most forgiving racket, but the most capable in the right hands.",
    filterFn: (r) => (r.advancedFit ?? 0) >= 8,
  },
  budget: {
    title: "Best Padel Rackets for a Budget (2026)",
    description: "The best padel rackets for a budget in 2026 — good value picks under £150 across brands, without sacrificing the basics, picked by IdealGear.",
    heading: "Best Padel Rackets for a Budget",
    intro: "You don't need to spend £250+ to get a decent racket. These are solid, well-reviewed options under £150 — a sensible starting point before upgrading once you know your game better.",
    filterFn: (r, getListing) => (getListing(r.id)?.price ?? 999) <= 150,
  },
  nox: {
    title: "Best Nox Rackets (2026)",
    description: "A guide to the best Nox padel rackets in 2026, compared and explained by IdealGear.",
    heading: "Best Nox Rackets",
    intro: "Nox is one of the most established padel brands, with rackets spanning from control-first round shapes to high-power diamond shapes. Here's how their current range compares.",
    filterFn: (r) => r.brand === "Nox",
  },
  bullpadel: {
    title: "Best Bullpadel Rackets (2026)",
    description: "A guide to the best Bullpadel padel rackets in 2026, compared and explained by IdealGear.",
    heading: "Best Bullpadel Rackets",
    intro: "Bullpadel is one of the most widely used brands on the professional tour, with a range that covers both control-first and power-first players. Here's how their current range compares.",
    filterFn: (r) => r.brand === "Bullpadel",
  },
  adidas: {
    title: "Best Adidas Rackets (2026)",
    description: "A guide to the best Adidas padel rackets in 2026, compared and explained by IdealGear.",
    heading: "Best Adidas Rackets",
    intro: "Adidas's padel range spans from control-oriented rackets to high-power diamond shapes. Here's how their current lineup compares.",
    filterFn: (r) => r.brand === "Adidas",
  },
  babolat: {
    title: "Best Babolat Rackets (2026)",
    description: "A guide to the best Babolat padel rackets in 2026, compared and explained by IdealGear.",
    heading: "Best Babolat Rackets",
    intro: "Babolat brings its racket-sports engineering background to padel, with a range spanning a balanced hybrid shape through to a high-power diamond shape. Here's how their current lineup compares.",
    filterFn: (r) => r.brand === "Babolat",
  },
  balanced: {
    title: "Best Padel Rackets for Balanced Players (2026)",
    description: "The best padel rackets for balanced players in 2026 — hybrid-shaped rackets that don't lean hard into power or control, picked by IdealGear.",
    heading: "Best Padel Rackets for Balanced Players",
    intro: "Not sure whether you're a power or control player yet? A balanced, usually teardrop-shaped racket gives you a genuine mix of both, rather than committing you to one style before you know your game.",
    filterFn: (r) => Math.abs((r.power ?? 5) - (r.control ?? 5)) <= 1 && (r.power ?? 0) >= 6,
  },
};
