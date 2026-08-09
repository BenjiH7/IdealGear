import Link from "next/link";
import { ArrowLeft, ArrowRight, Info, Check, AlertTriangle, Target } from "lucide-react";
import { TEAL, TEAL_DARK, INK } from "@/lib/theme";
import { RacketShapeIcon } from "@/components/Visuals";

export const metadata = {
  title: "What a Padel Racket Recommendation Looks Like",
  description: "See a sample IdealGear padel racket recommendation — match percentage, reasons, drawbacks and best price, before you try the real questionnaire.",
  alternates: { canonical: "/sample-recommendation" },
};

const sample = {
  name: "ML10 Pro Cup", brand: "Nox", price: 169.99, originalPrice: 189.99, matchPct: 92, shape: "Round shape", year: 2025,
  url: "https://everythingpadel.co.uk/product/nox-ml10-pro-cup-padel-racket-2025/", priceCheckedLabel: "Checked August 2026",
  reasons: [
    "Matches an intermediate, balanced playing style with a mix of control and power.",
    "You told us you want fewer unforced errors — this racket prioritises control.",
    "Your current racket felt heavy at the net, so we favoured a more manoeuvrable option.",
  ],
  drawback: "It won't provide as much raw power as more offensive rackets, so you may notice less pace on your smash.",
  bestFor: "Best for: beginners and intermediate players looking for maximum control with a bit of power — especially good if you value quick hands at the net.",
  characteristics: { Power: 6, Control: 9, Manoeuvrability: 8, Comfort: 8, Spin: 6 },
};

export default function SampleRecommendationPage() {
  const onSale = sample.originalPrice && sample.originalPrice > sample.price;
  return (
    <div className="min-h-screen pb-10" style={{ background: `linear-gradient(180deg, ${TEAL_DARK} 0%, ${TEAL} 100%)` }}>
      <div className="px-5 pt-6 max-w-2xl mx-auto">
        <Link href="/" className="flex items-center gap-1.5 text-[14px] text-white/70 -ml-1"><ArrowLeft size={16} /> Back to home</Link>

        <div className="mt-5 rounded-xl p-3.5 flex items-start gap-2.5 bg-white/10 border border-white/15">
          <Info size={16} className="mt-0.5 shrink-0 text-white" />
          <p className="text-[13px] text-white/90">
            This is an example only, not a personalised recommendation. Complete the questionnaire to get your own match.
          </p>
        </div>

        <p className="text-[12px] font-semibold tracking-wide uppercase text-white/50 mt-6">Example recommendation</p>
        <h1 className="font-serif text-[26px] leading-tight mt-1 text-white">What a match looks like</h1>

        <div className="mt-6 bg-white rounded-2xl border border-black/8 p-5 shadow-[0_8px_30px_rgba(10,20,19,0.2)]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <RacketShapeIcon shape={sample.shape} />
              <div>
                <span className="text-[11px] font-semibold tracking-wide uppercase" style={{ color: TEAL }}>Example</span>
                <h2 className="font-serif text-[19px] leading-tight mt-0.5" style={{ color: INK }}>{sample.brand} {sample.name}</h2>
                <p className="text-[13px] text-black/45 mt-0.5">{sample.shape} · {sample.year}</p>
                <p className="text-[14px] font-semibold mt-1" style={{ color: INK }}>
                  £{sample.price}
                  {onSale && <span className="text-[13px] font-normal text-black/40"> (reduced from £{sample.originalPrice})</span>}
                </p>
                <p className="text-[11px] mt-0.5 font-medium" style={{ color: TEAL_DARK }}>Best price we found · {sample.priceCheckedLabel}</p>
                <a href={sample.url} target="_blank" rel="noreferrer" className="text-[11px] underline break-all" style={{ color: TEAL_DARK }}>{sample.url}</a>
              </div>
            </div>
            <div className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-[14px]" style={{ backgroundColor: TEAL }}>{sample.matchPct}%</div>
          </div>

          <div className="mt-4">
            <p className="text-[12px] font-semibold tracking-wide uppercase text-black/40 mb-2">Why it matches</p>
            <ul className="space-y-1.5">
              {sample.reasons.map((r, i) => (
                <li key={i} className="text-[14px] text-black/75 flex gap-2"><Check size={15} className="mt-0.5 shrink-0" style={{ color: TEAL }} />{r}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex gap-2 items-start rounded-xl p-3" style={{ backgroundColor: "#EAF6F4" }}>
            <Target size={15} className="mt-0.5 shrink-0" style={{ color: TEAL_DARK }} />
            <p className="text-[13px]" style={{ color: TEAL_DARK }}>{sample.bestFor}</p>
          </div>

          <div className="mt-3 flex gap-2 items-start bg-black/[0.035] rounded-xl p-3">
            <AlertTriangle size={15} className="mt-0.5 shrink-0 text-black/40" />
            <p className="text-[13px] text-black/60">{sample.drawback}</p>
          </div>

          <div className="mt-4">
            <p className="text-[12px] font-semibold tracking-wide uppercase text-black/40 mb-2">Key characteristics</p>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(sample.characteristics).map(([k, v]) => (
                <div key={k} className="text-center">
                  <div className="text-[15px] font-semibold" style={{ color: INK }}>{v}</div>
                  <div className="text-[10px] text-black/40 mt-0.5">{k}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Link href="/questionnaire" className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-[15px] shadow-[0_8px_24px_rgba(0,0,0,0.18)]" style={{ backgroundColor: "white", color: TEAL_DARK }}>
          Find My Ideal Racket <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
