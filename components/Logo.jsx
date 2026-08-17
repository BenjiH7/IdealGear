import { TEAL_BRIGHT, TEAL_DARK } from "@/lib/theme";

// The IdealGear wordmark + tagline. Deliberately sport-neutral: the icon
// between "Ideal" and "Gear" is a minimalist adjustment/sliders glyph
// (personalisation, matching), not any piece of sport-specific equipment —
// this is what lets the mark keep working if IdealGear expands beyond
// padel. Built with the site's existing font-serif stack and TEAL_BRIGHT
// (the same teal already used for "Gear" before this change), so it reads
// as a refinement of the existing wordmark rather than a new design.
//
// The sliders icon is a custom SVG rather than a stock icon component,
// since it needs a two-tone look (white track before each handle, teal
// track after it, white-outlined handle circles) that a single-color icon
// can't produce.
function SlidersIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden="true">
      {/* Top line — handle at x=9 */}
      <line x1="3" y1="5" x2="9" y2="5" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="9" y1="5" x2="21" y2="5" stroke={TEAL_BRIGHT} strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="9" cy="5" r="2" fill={TEAL_DARK} stroke="white" strokeWidth="1.5" />
      {/* Middle line — handle at x=15 */}
      <line x1="3" y1="12" x2="15" y2="12" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="15" y1="12" x2="21" y2="12" stroke={TEAL_BRIGHT} strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="15" cy="12" r="2" fill={TEAL_DARK} stroke="white" strokeWidth="1.5" />
      {/* Bottom line — handle at x=7 */}
      <line x1="3" y1="19" x2="7" y2="19" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="7" y1="19" x2="21" y2="19" stroke={TEAL_BRIGHT} strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="7" cy="19" r="2" fill={TEAL_DARK} stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

export function Logo({ size = "default" }) {
  const isLarge = size === "large";
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className={`font-serif tracking-tight text-white ${isLarge ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}`}>
          Ideal
        </span>
        <SlidersIcon size={isLarge ? 26 : 20} />
        <span className={`font-serif tracking-tight ${isLarge ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}`} style={{ color: TEAL_BRIGHT }}>
          Gear
        </span>
      </div>
      <p className={`font-medium tracking-[0.14em] text-white/55 mt-1 ${isLarge ? "text-[11px] sm:text-[12px]" : "text-[8px] sm:text-[9px]"}`}>
        SMART RECOMMENDATIONS. BETTER PERFORMANCE.
      </p>
    </div>
  );
}
