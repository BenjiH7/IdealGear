import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TEAL, TEAL_DARK, INK } from "@/lib/theme";

export function LegalPage({ title, effectiveDate, sections }) {
  return (
    <div className="min-h-screen pb-10" style={{ background: `linear-gradient(180deg, ${TEAL_DARK} 0%, ${TEAL} 100%)` }}>
      <div className="px-5 pt-6 max-w-2xl mx-auto">
        <Link href="/" className="flex items-center gap-1.5 text-[14px] text-white/70 -ml-1"><ArrowLeft size={16} /> Back to home</Link>
        <p className="text-[12px] font-semibold tracking-wide uppercase text-white/50 mt-6">Effective {effectiveDate}</p>
        <h1 className="font-serif text-[28px] leading-tight mt-1 text-white">{title}</h1>

        <div className="mt-6 bg-white rounded-2xl border border-black/8 p-6 shadow-[0_8px_30px_rgba(10,20,19,0.18)] space-y-5">
          {sections.map(([heading, body]) => (
            <div key={heading}>
              <h2 className="font-serif text-[16px] mb-1.5" style={{ color: INK }}>{heading}</h2>
              <p className="text-[14px] text-black/70 leading-relaxed whitespace-pre-line">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
