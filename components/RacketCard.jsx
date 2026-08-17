"use client";

import { Check, AlertTriangle, Target, Scale } from "lucide-react";
import { TEAL, TEAL_DARK, INK } from "@/lib/theme";
import { buildReasons, buildBestFor, buildDrawback } from "@/lib/engine";
import { RacketShapeIcon } from "@/components/Visuals";

export function MatchRing({ pct }) {
  return (
    <div className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-[14px]" style={{ backgroundColor: TEAL }}>
      {pct}%
    </div>
  );
}

export function RacketCard({ item, answers, rank, onCompareToggle, comparing }) {
  const { racket, listing, matchPct } = item;
  const reasons = buildReasons(item, answers);
  const drawback = buildDrawback(item, answers);
  const bestFor = buildBestFor(racket);
  const onSale = listing.originalPrice && listing.originalPrice > listing.price;

  return (
    <div className="bg-white rounded-2xl border border-black/8 p-5 shadow-[0_8px_24px_rgba(10,20,19,0.14)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <RacketShapeIcon shape={racket.shape} />
          <div>
            {rank === 0 && <span className="text-[11px] font-semibold tracking-wide uppercase" style={{ color: TEAL }}>Top match</span>}
            <h3 className="font-serif text-[19px] leading-tight mt-0.5" style={{ color: INK }}>{racket.brand} {racket.model}</h3>
            <p className="text-[13px] text-black/45 mt-0.5">{racket.shape} · {racket.year}</p>
            <p className="text-[14px] font-semibold mt-1" style={{ color: INK }}>
              {listing.currencySymbol}{listing.price}
              {onSale && <span className="text-[13px] font-normal text-black/40"> (reduced from {listing.currencySymbol}{listing.originalPrice})</span>}
            </p>
            <p className="text-[11px] mt-0.5 font-medium" style={{ color: TEAL_DARK }}>{listing.isBestPrice ? "Best price we found" : "Price estimate"} · {listing.checkedLabel}</p>
            {listing.url ? (
              <a href={listing.url} target="_blank" rel="noreferrer" className="text-[11px] underline break-all" style={{ color: TEAL_DARK }}>{listing.url}</a>
            ) : (
              <span className="text-[11px] text-black/35">Retailer link pending review</span>
            )}
          </div>
        </div>
        <MatchRing pct={matchPct} />
      </div>

      <div className="mt-4">
        <p className="text-[12px] font-semibold tracking-wide uppercase text-black/40 mb-2">Why we think it's right for you</p>
        <ul className="space-y-1.5">
          {reasons.map((r, i) => (
            <li key={i} className="text-[14px] text-black/75 flex gap-2"><Check size={15} className="mt-0.5 shrink-0" style={{ color: TEAL }} />{r}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex gap-2 items-start rounded-xl p-3" style={{ backgroundColor: "#EAF6F4" }}>
        <Target size={15} className="mt-0.5 shrink-0" style={{ color: TEAL_DARK }} />
        <p className="text-[13px]" style={{ color: TEAL_DARK }}>{bestFor}</p>
      </div>

      <div className="mt-3 flex gap-2 items-start bg-black/[0.035] rounded-xl p-3">
        <AlertTriangle size={15} className="mt-0.5 shrink-0 text-black/40" />
        <p className="text-[13px] text-black/60">{drawback}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={() => onCompareToggle(racket.id)} className={`flex-1 px-4 py-3 rounded-xl border text-[14px] font-medium flex items-center justify-center gap-1.5 ${comparing ? "border-transparent text-white" : "border-black/15"}`} style={comparing ? { backgroundColor: TEAL_DARK, color: "white" } : { color: INK }}>
          <Scale size={15} /> Compare
        </button>
      </div>
    </div>
  );
}
