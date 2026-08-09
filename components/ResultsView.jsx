"use client";

import { useState, useMemo } from "react";
import { RotateCcw, Scale } from "lucide-react";
import { TEAL_DARK } from "@/lib/theme";
import { buildRecommendations, buildChallenge } from "@/lib/engine";
import { RacketCard } from "@/components/RacketCard";
import { CompareTable } from "@/components/CompareTable";
import { AffiliateDisclosure } from "@/components/Visuals";

export function ResultsView({ answers, onEdit, onRestart }) {
  const { results } = useMemo(() => buildRecommendations(answers), [answers]);
  const challenge = useMemo(() => buildChallenge(answers, results), [answers, results]);
  const [compareIds, setCompareIds] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  const toggleCompare = (id) => {
    setCompareIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 4 ? [...prev, id] : prev));
  };
  const compareItems = results.filter((r) => compareIds.includes(r.racket.id));

  if (results.length === 0) {
    return (
      <div className="min-h-screen px-5 py-10" style={{ background: `linear-gradient(180deg, ${TEAL_DARK} 0%, #0F6B63 100%)` }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-[22px] text-white">No rackets matched every constraint</h2>
          <p className="text-[14px] text-white/70 mt-3">This usually means the budget or brand deal-breaker is quite narrow for our current catalogue. Try widening your budget slightly or removing a deal-breaker.</p>
          <button onClick={onEdit} className="mt-6 px-5 py-3.5 rounded-xl font-semibold text-[15px]" style={{ backgroundColor: "white", color: TEAL_DARK }}>Edit My Answers</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10" style={{ background: `linear-gradient(180deg, ${TEAL_DARK} 0%, #0F6B63 100%)` }}>
      <div className="px-5 pt-8 max-w-2xl mx-auto">
        <p className="text-[12px] font-semibold tracking-wide uppercase text-white/50">Your IdealGear results</p>
        <h1 className="font-serif text-[26px] leading-tight mt-1 text-white">We found {results.length} rackets that fit your game.</h1>
        <p className="text-[13px] text-white/50 mt-2">Tap &quot;Compare&quot; on 2 or more rackets below to see them side by side.</p>

        {challenge && (
          <div className="mt-4 rounded-xl p-4 border bg-white/10 border-white/20">
            <p className="text-[13px] text-white/90">{challenge}</p>
          </div>
        )}

        <div className="mt-5 flex gap-3">
          <button onClick={onEdit} className="flex-1 px-4 py-3 rounded-xl border border-white/25 text-[14px] font-medium flex items-center justify-center gap-2 text-white">
            <RotateCcw size={15} /> Edit My Answers
          </button>
          {compareIds.length === 1 && (
            <div className="flex-1 px-4 py-3 rounded-xl border border-white/25 text-[14px] font-medium flex items-center justify-center gap-2 text-white/70">
              <Scale size={15} /> 1 selected — pick 1 more
            </div>
          )}
          {compareIds.length >= 2 && (
            <button onClick={() => setShowCompare(true)} className="flex-1 px-4 py-3 rounded-xl text-[14px] font-medium flex items-center justify-center gap-2" style={{ backgroundColor: "white", color: TEAL_DARK }}>
              <Scale size={15} /> Compare ({compareIds.length})
            </button>
          )}
        </div>

        <div className="mt-6 space-y-4">
          {results.map((item, i) => (
            <RacketCard key={item.racket.id} item={item} answers={answers} rank={i} onCompareToggle={toggleCompare} comparing={compareIds.includes(item.racket.id)} />
          ))}
        </div>

        <p className="text-[12px] text-white/50 mt-8 leading-relaxed">
          Recommendations are based on your answers, including free text, your current racket, and each racket&apos;s known characteristics. Racket characteristics can vary between manufacturers and individual players — treat this as guidance, not a guarantee of performance. Prices and retailer links shown are illustrative for this preview and will be replaced with real, live affiliate pricing.
        </p>
        <div className="mt-3">
          <AffiliateDisclosure dark />
        </div>
        <button onClick={onRestart} className="mt-4 text-[13px] underline text-white/50">Start over</button>
      </div>
      {showCompare && <CompareTable items={compareItems} onClose={() => setShowCompare(false)} />}
    </div>
  );
}
