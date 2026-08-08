"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { TEAL, TEAL_DARK, TEAL_BRIGHT, INK } from "@/lib/theme";
import { BRANDS } from "@/lib/engine";

export function Chip({ selected, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-xl border transition-colors flex items-center justify-between gap-3 ${
        selected ? "border-transparent text-white" : "border-black/10 text-[#0B1615] bg-white hover:border-black/20"
      }`}
      style={selected ? { backgroundColor: TEAL } : {}}
    >
      <span className="text-[15px] font-medium">{children}</span>
      {selected && <Check size={18} strokeWidth={2.5} />}
    </button>
  );
}

export function ProgressBar({ step, total, onDark }) {
  const pct = ((step + 1) / total) * 100;
  return (
    <div className={`w-full h-1.5 rounded-full overflow-hidden ${onDark ? "bg-white/20" : "bg-black/10"}`}>
      <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, backgroundColor: onDark ? "white" : TEAL }} />
    </div>
  );
}

export function TextArea({ value, onChange, placeholder }) {
  return (
    <textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className="w-full mt-3 px-4 py-3 rounded-xl border border-black/10 text-[15px] focus:outline-none focus:ring-2 resize-none"
      style={{ "--tw-ring-color": TEAL_BRIGHT }}
    />
  );
}

export function BudgetQuestion({ value, onChange }) {
  const min = value?.min ?? 80;
  const max = value?.max ?? 250;

  // Commits defaults to state immediately on mount — see IdealGear history:
  // previously these defaults only existed on screen, so an untouched
  // budget field meant the budget filter silently did nothing.
  useEffect(() => {
    if (typeof value?.max !== "number" || typeof value?.min !== "number") {
      onChange({ ...value, min: value?.min ?? min, max: value?.max ?? max });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-[13px] text-black/50">Minimum (£)</span>
          <input type="number" step={5} value={min} onChange={(e) => onChange({ ...value, min: Number(e.target.value) })}
            className="w-full mt-1 px-4 py-3 rounded-xl border border-black/10 text-[15px]" />
        </label>
        <label className="block">
          <span className="text-[13px] text-black/50">Maximum (£)</span>
          <input type="number" step={5} value={max} onChange={(e) => onChange({ ...value, max: Number(e.target.value) })}
            className="w-full mt-1 px-4 py-3 rounded-xl border border-black/10 text-[15px]" />
        </label>
      </div>
      <div>
        <p className="text-[15px] font-medium mb-2" style={{ color: INK }}>Would you consider spending slightly more for the right racket?</p>
        <div className="grid grid-cols-2 gap-2">
          {["No", "Yes"].map((opt) => (
            <Chip key={opt} selected={value?.stretchOk === opt} onClick={() => onChange({ ...value, stretchOk: opt })}>{opt}</Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BrandQuestion({ value, onChange }) {
  const selected = value?.selected || [];
  const toggle = (b) => {
    let next;
    if (b === "No preference") next = selected.includes(b) ? [] : ["No preference"];
    else {
      const withoutNoPref = selected.filter((s) => s !== "No preference");
      next = withoutNoPref.includes(b) ? withoutNoPref.filter((s) => s !== b) : [...withoutNoPref, b];
    }
    onChange({ ...value, selected: next });
  };
  return (
    <div>
      <div className="grid grid-cols-2 gap-2.5">
        {BRANDS.map((b) => (
          <Chip key={b} selected={selected.includes(b)} onClick={() => toggle(b)}>{b}</Chip>
        ))}
      </div>
      {selected.includes("Other") && (
        <input
          value={value?.otherText || ""}
          onChange={(e) => onChange({ ...value, otherText: e.target.value })}
          placeholder="Which brand?"
          className="w-full mt-3 px-4 py-3 rounded-xl border border-black/10 text-[15px]"
        />
      )}
      {selected.length > 0 && !selected.includes("No preference") && (
        <label className="flex items-center gap-2 mt-4 text-[14px] text-black/70">
          <input type="checkbox" checked={!!value?.dealBreaker} onChange={(e) => onChange({ ...value, dealBreaker: e.target.checked })} />
          This is a deal-breaker — only show me these brands.
        </label>
      )}
      <TextArea value={value?.text} onChange={(t) => onChange({ ...value, text: t })} placeholder="Optional: how important is this? If you prefer a brand not listed, mention it here too." />
    </div>
  );
}
