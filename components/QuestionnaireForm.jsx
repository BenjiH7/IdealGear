"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { TEAL, TEAL_DARK, INK } from "@/lib/theme";
import { QUESTIONS, TOTAL_STEPS } from "@/lib/engine";
import { Chip, ProgressBar, TextArea, BudgetQuestion, BrandQuestion } from "@/components/FormControls";

export function QuestionnaireForm({ answers, setAnswers, startStep, onFinish, onCancel }) {
  const [step, setStep] = useState(startStep || 0);
  const q = QUESTIONS[step];
  const current = answers[q.id] || {};

  const update = (patch) => setAnswers((prev) => ({ ...prev, [q.id]: { ...prev[q.id], ...patch } }));

  const canContinue = () => {
    if (q.type === "single") return !!current.selected;
    if (q.type === "multi") return (current.selected || []).length > 0;
    if (q.type === "budget") return typeof current.max === "number";
    if (q.type === "brand") return (current.selected || []).length > 0;
    return true;
  };

  const goNext = () => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else onFinish();
  };
  const goBack = () => {
    if (step > 0) setStep(step - 1);
    else onCancel();
  };

  const toggleMulti = (opt) => {
    const sel = current.selected || [];
    const next = sel.includes(opt) ? sel.filter((s) => s !== opt) : [...sel, opt];
    update({ selected: next });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: `linear-gradient(180deg, ${TEAL_DARK} 0%, ${TEAL} 100%)` }}>
      <div className="px-5 pt-6 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between mb-2">
          <button onClick={goBack} className="p-2 -ml-2 text-white/80"><ChevronLeft size={22} /></button>
          <span className="text-[13px] text-white/60">Question {step + 1} of {TOTAL_STEPS}</span>
          <div className="w-6" />
        </div>
        <ProgressBar step={step} total={TOTAL_STEPS} onDark />
      </div>

      <div className="flex-1 px-5 pt-6 pb-28 max-w-2xl mx-auto w-full">
        <div className="bg-white rounded-2xl border border-black/8 p-5 sm:p-7 shadow-[0_8px_30px_rgba(10,20,19,0.18)]">
          <h2 className="font-serif text-[24px] leading-tight" style={{ color: INK }}>{q.title}</h2>
          {q.important && (
            <p className="mt-2 text-[13px] flex items-center gap-1.5" style={{ color: TEAL_DARK }}>
              <Info size={14} /> This answer strongly shapes your recommendations.
            </p>
          )}

          <div className="mt-6 space-y-2.5">
            {q.type === "single" && q.options.map((opt) => (
              <div key={opt}>
                <Chip selected={current.selected === opt} onClick={() => update({ selected: opt })}>{opt}</Chip>
                {q.optionHelp?.[opt] && current.selected === opt && (
                  <p className="text-[13px] text-black/45 mt-1.5 ml-1">{q.optionHelp[opt]}</p>
                )}
              </div>
            ))}
            {q.type === "multi" && q.options.map((opt) => (
              <Chip key={opt} selected={(current.selected || []).includes(opt)} onClick={() => toggleMulti(opt)}>{opt}</Chip>
            ))}
            {q.type === "budget" && <BudgetQuestion value={current} onChange={(v) => setAnswers((p) => ({ ...p, budget: v }))} />}
            {q.type === "brand" && <BrandQuestion value={current} onChange={(v) => setAnswers((p) => ({ ...p, brands: v }))} />}
          </div>

          {q.textLabel && q.type !== "brand" && (
            <div>
              <p className="text-[13px] text-black/45 mt-4">{q.textLabel}</p>
              <TextArea value={current.text} onChange={(t) => update({ text: t })} placeholder="Type here..." />
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 backdrop-blur border-t border-white/10 px-5 py-4" style={{ backgroundColor: `${TEAL_DARK}f2` }}>
        <div className="max-w-2xl mx-auto flex gap-3">
          <button onClick={goBack} className="px-5 py-3.5 rounded-xl border border-white/25 text-[15px] font-medium text-white">Back</button>
          <button
            onClick={goNext}
            disabled={!canContinue()}
            className="flex-1 px-5 py-3.5 rounded-xl font-semibold text-[15px] disabled:opacity-30 flex items-center justify-center gap-2"
            style={{ backgroundColor: "white", color: TEAL_DARK }}
          >
            {step === TOTAL_STEPS - 1 ? "See My Recommendations" : "Continue"} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
