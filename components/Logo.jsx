import { SlidersHorizontal } from "lucide-react";
import { TEAL_BRIGHT } from "@/lib/theme";

// The IdealGear wordmark + tagline. Deliberately sport-neutral: the icon
// between "Ideal" and "Gear" is a minimalist adjustment/sliders glyph
// (personalisation, matching), not any piece of sport-specific equipment —
// this is what lets the mark keep working if IdealGear expands beyond
// padel. Built with the site's existing font-serif stack and TEAL_BRIGHT
// (the same teal already used for "Gear" before this change), so it reads
// as a refinement of the existing wordmark rather than a new design.
export function Logo({ size = "default" }) {
  const isLarge = size === "large";
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className={`font-serif tracking-tight text-white ${isLarge ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}`}>
          Ideal
        </span>
        <SlidersHorizontal
          size={isLarge ? 26 : 20}
          strokeWidth={2.25}
          className="shrink-0"
          style={{ color: TEAL_BRIGHT }}
          aria-hidden="true"
        />
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
