import { Check, User, Target, Sparkles } from "lucide-react";
import { TEAL, INK } from "@/lib/theme";

export function MatchVisual() {
  const nodes = [
    { icon: User, label: "PLAYER PROFILE", sub: "How you play, what you want" },
    { icon: Sparkles, label: "IDEALGEAR ANALYSIS", sub: "Weighing your whole profile" },
    { icon: Target, label: "BEST MATCH", sub: "Equipment that actually fits" },
  ];
  return (
    <div className="relative rounded-2xl border border-black/8 bg-white p-6 sm:p-7 shadow-[0_8px_30px_rgba(10,20,19,0.12)]">
      <div className="relative">
        {nodes.map((n, i) => (
          <div key={n.label} className="relative flex items-start gap-4 pb-8 last:pb-0">
            {i < nodes.length - 1 && (
              <div className="absolute left-[19px] top-10 bottom-0 w-px" style={{ backgroundColor: "rgba(15,107,99,0.25)" }} />
            )}
            <div
              className="relative shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
              style={i === nodes.length - 1 ? { backgroundColor: TEAL } : { backgroundColor: "white", border: `1.5px solid ${TEAL}` }}
            >
              <n.icon size={17} strokeWidth={2} color={i === nodes.length - 1 ? "white" : TEAL} />
            </div>
            <div className="pt-1.5">
              <p className="text-[12px] font-semibold tracking-wide" style={{ color: INK }}>{n.label}</p>
              <p className="text-[13px] text-black/50 mt-0.5">{n.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PreferenceVisual() {
  const inputs = ["Level", "Style", "Budget", "Comfort"];
  return (
    <div className="relative rounded-2xl border border-black/8 bg-white p-6 sm:p-7 shadow-[0_8px_30px_rgba(10,20,19,0.12)]">
      <svg viewBox="0 0 220 220" className="w-full h-auto">
        {inputs.map((label, i) => {
          const nodeAngles = [-140, -60, 60, 140];
          const deg = nodeAngles[i];
          const rad = (deg * Math.PI) / 180;
          const r = 78;
          const cx = 110 + r * Math.sin(rad);
          const cy = 92 - r * Math.cos(rad) * 0.85;
          return (
            <g key={label}>
              <line x1={cx} y1={cy} x2={110} y2={168} stroke="rgba(15,107,99,0.22)" strokeWidth="1.5" />
              <circle cx={cx} cy={cy} r="16" fill="white" stroke={TEAL} strokeWidth="1.5" />
              <text x={cx} y={cy + 4} textAnchor="middle" fontSize="8.5" fontWeight="600" fill={INK}>{label.slice(0, 4)}</text>
            </g>
          );
        })}
        <circle cx="110" cy="168" r="24" fill={TEAL} />
        <text x="110" y="165" textAnchor="middle" fontSize="8" fontWeight="700" fill="white">YOUR</text>
        <text x="110" y="175" textAnchor="middle" fontSize="8" fontWeight="700" fill="white">MATCH</text>
      </svg>
      <p className="text-[12px] font-semibold tracking-wide text-center mt-1" style={{ color: INK }}>YOUR PREFERENCES, WEIGHED TOGETHER</p>
      <p className="text-[13px] text-black/50 text-center mt-1">Not matched one at a time — considered as a whole</p>
    </div>
  );
}

export function WholePlayerVisual() {
  const factors = ["Level", "Style", "Current gear", "Preferences", "Budget"];
  return (
    <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-[0_8px_30px_rgba(10,20,19,0.12)]">
      <div className="flex flex-wrap gap-2 justify-center">
        {factors.map((f) => (
          <span key={f} className="text-[12px] font-medium px-3 py-1.5 rounded-full bg-black/[0.035]" style={{ color: INK }}>{f}</span>
        ))}
      </div>
      <div className="flex justify-center my-2">
        <div className="w-px h-6" style={{ backgroundColor: "rgba(15,107,99,0.3)" }} />
      </div>
      <div className="flex justify-center">
        <span className="text-[12px] font-semibold px-4 py-2 rounded-full text-white" style={{ backgroundColor: TEAL }}>Best overall fit</span>
      </div>
    </div>
  );
}

export function QuestionnaireVisual() {
  return (
    <div>
      <div className="rounded-2xl border border-black/8 bg-white p-5 sm:p-6 shadow-[0_8px_30px_rgba(10,20,19,0.12)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-semibold tracking-wide" style={{ color: INK }}>QUESTION 3 OF 12</span>
          <span className="text-[10px] font-medium" style={{ color: TEAL }}>25%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-black/10 overflow-hidden mb-4">
          <div className="h-full rounded-full" style={{ width: "25%", backgroundColor: TEAL }} />
        </div>
        <p className="text-[14px] font-serif mb-3" style={{ color: INK }}>What would you most like to improve?</p>
        <div className="space-y-2">
          {[
            ["Power", false],
            ["Control", true],
            ["Manoeuvrability", true],
            ["Comfort", false],
          ].map(([label, selected]) => (
            <div
              key={label}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-[12.5px] font-medium"
              style={selected ? { backgroundColor: TEAL, color: "white", borderColor: TEAL } : { borderColor: "rgba(11,22,21,0.1)", color: INK }}
            >
              {label}
              {selected && <Check size={13} strokeWidth={2.5} />}
            </div>
          ))}
        </div>
      </div>
      <p className="text-[10px] text-black/35 mt-1 text-center">Illustration of the questionnaire — not a live screenshot</p>
    </div>
  );
}

export function RacketShapeIcon({ shape }) {
  const s = (shape || "").toLowerCase();
  const isDiamond = s.includes("diamond");
  const isRound = s.includes("round");
  return (
    <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#EAF6F4" }}>
      <svg width="26" height="32" viewBox="0 0 40 48">
        <rect x="17" y="33" width="6" height="12" rx="2" fill={TEAL} opacity="0.35" />
        {isDiamond && <path d="M20 4 L34 19 Q34 25 29 31 L20 37 L11 31 Q6 25 6 19 Z" fill="none" stroke={TEAL} strokeWidth="2.5" />}
        {isRound && <ellipse cx="20" cy="19" rx="15" ry="16" fill="none" stroke={TEAL} strokeWidth="2.5" />}
        {!isDiamond && !isRound && <path d="M20 5 C13 13 7 20 7 26 C7 32 13 36.5 20 36.5 C27 36.5 33 32 33 26 C33 20 27 13 20 5 Z" fill="none" stroke={TEAL} strokeWidth="2.5" />}
        <circle cx="20" cy="18" r="1.6" fill={TEAL} opacity="0.5" />
        <circle cx="14" cy="14" r="1.2" fill={TEAL} opacity="0.35" />
        <circle cx="26" cy="14" r="1.2" fill={TEAL} opacity="0.35" />
        <circle cx="14" cy="23" r="1.2" fill={TEAL} opacity="0.35" />
        <circle cx="26" cy="23" r="1.2" fill={TEAL} opacity="0.35" />
      </svg>
    </div>
  );
}

export function AffiliateDisclosure({ dark }) {
  return (
    <p className={`text-[11px] leading-relaxed ${dark ? "text-white/45" : "text-black/40"}`}>
      Affiliate disclosure: some links on IdealGear are affiliate links, and we may earn a small commission if you buy through them, at no extra cost to you. Which racket we recommend is decided only by your questionnaire answers — commission never affects the matching or ranking, including for rackets that do earn us a commission.
    </p>
  );
}
