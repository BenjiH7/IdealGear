import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TEAL, TEAL_DARK, TEAL_BRIGHT, INK } from "@/lib/theme";
import { CATALOG_LAST_UPDATED } from "@/lib/engine";
import { MatchVisual, QuestionnaireVisual, WholePlayerVisual, AffiliateDisclosure } from "@/components/Visuals";
import { Logo } from "@/components/Logo";

// This whole page is a Server Component — no "use client" needed, since
// navigation is done with real <Link> elements rather than onClick state
// changes. That means the HTML (including all this copy) is present in the
// very first response Google's crawler sees, unlike the old single-page-app
// version where content only appeared after JavaScript ran client-side.

const GUIDE_LINKS = [
  ["beginners", "Best padel rackets for beginners"],
  ["control", "Best padel rackets for control"],
  ["power", "Best padel rackets for power"],
  ["intermediate", "Best padel rackets for intermediate players"],
  ["advanced", "Best padel rackets for advanced players"],
  ["budget", "Best padel rackets for a budget"],
  ["nox", "Best Nox rackets"],
  ["bullpadel", "Best Bullpadel rackets"],
  ["adidas", "Best Adidas rackets"],
  ["babolat", "Best Babolat rackets"],
  ["balanced", "Best padel rackets for balanced players"],
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden" style={{ background: `linear-gradient(180deg, ${TEAL_DARK} 0%, ${TEAL} 45%, ${TEAL_DARK} 100%)` }}>
      <header className="px-5 pt-6 pb-1 max-w-5xl mx-auto flex items-center justify-between">
        <Logo />
      </header>

      {/* HERO */}
      <section className="relative px-5 pt-3 pb-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-12 items-start">
        <div className="absolute -top-24 -right-40 w-[480px] h-[480px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0) 70%)" }} />
        <div className="absolute top-40 -left-32 w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${TEAL_BRIGHT}22 0%, rgba(255,255,255,0) 70%)` }} />
        <div className="relative">
          <h1 className="font-serif text-[36px] sm:text-[42px] leading-[1.08] tracking-tight text-white">
            Find the gear that fits your game.
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-white/70 max-w-md">
            Tell IdealGear how you play, what you want from your next racket and your budget. We&apos;ll match you with the equipment that fits — not just the products on offer.
          </p>
          <Link
            href="/questionnaire"
            className="mt-7 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-[15px] shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
            style={{ backgroundColor: "white", color: TEAL_DARK }}
          >
            Find My Ideal Racket <ArrowRight size={18} />
          </Link>
          <p className="mt-3 text-[13px] text-white/50">About 3 minutes · No account or email required</p>
          <p className="mt-6 text-[13px] text-white/55 italic">
            Built for players who want ideal sports equipment for their playstyle and needs — not just another bestseller.
          </p>
        </div>
        <div className="relative">
          <MatchVisual />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative px-5 py-12 max-w-5xl mx-auto border-t border-white/10">
        <p className="text-[12px] font-semibold tracking-wide uppercase text-white/50 mb-6">How it works</p>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            {[
              ["01", "Tell us about your game", "Answer a few questions about your playing level, style and how you like to play."],
              ["02", "Tell us what you want", "Tell us what you like and dislike about your current racket and what you want to improve."],
              ["03", "Get your match", "We analyse your answers and find the rackets that best fit your game and budget."],
            ].map(([num, title, body]) => (
              <div key={num}>
                <p className="text-[13px] font-semibold" style={{ color: TEAL_BRIGHT }}>{num}</p>
                <p className="font-medium text-[15px] mt-1.5 text-white">{title}</p>
                <p className="text-[14px] text-white/60 mt-1 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <QuestionnaireVisual />
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="px-5 py-12 max-w-5xl mx-auto border-t border-white/10">
        <p className="text-[12px] font-semibold tracking-wide uppercase text-white/50 mb-6">More than just a racket match</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            ["Personalised to your game", "Your playing level and style are at the heart of every recommendation."],
            ["Honest recommendations", "We show you why we recommend each racket — including the potential drawbacks."],
            ["Budget-first", "We won't recommend a racket that's outside your budget just because it's a better match."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-black/8 bg-white p-5 shadow-[0_8px_24px_rgba(10,20,19,0.12)]">
              <p className="font-medium text-[15px]" style={{ color: INK }}>{title}</p>
              <p className="text-[14px] text-black/55 mt-1.5 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WE LOOK AT THE WHOLE PLAYER */}
      <section className="px-5 py-12 max-w-5xl mx-auto border-t border-white/10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-[12px] font-semibold tracking-wide uppercase text-white/50 mb-4">We look at the whole player</p>
            <p className="text-[16px] leading-relaxed text-white/80">
              You might want more power. But if you&apos;re an intermediate player who values control and manoeuvrability, the most powerful racket isn&apos;t necessarily the right one for you.
            </p>
            <p className="text-[16px] leading-relaxed text-white/80 mt-3">
              IdealGear looks at your playing level, style, current racket, preferences and budget together to find the best overall fit.
            </p>
          </div>
          <WholePlayerVisual />
        </div>
      </section>

      {/* VIEW SAMPLE RECOMMENDATIONS */}
      <section className="px-5 py-12 max-w-5xl mx-auto border-t border-white/10">
        <div className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 bg-white shadow-[0_8px_30px_rgba(10,20,19,0.15)]">
          <div>
            <p className="font-serif text-[19px]" style={{ color: INK }}>Curious what a recommendation looks like?</p>
            <p className="text-[14px] text-black/55 mt-1.5">See a sample result before you start — it&apos;s not personalised, just a preview of the experience.</p>
          </div>
          <Link href="/sample-recommendation" className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-[14px] whitespace-nowrap text-white" style={{ backgroundColor: TEAL }}>
            View Sample Recommendations <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* PADEL POSITIONING */}
      <section className="px-5 py-12 max-w-5xl mx-auto border-t border-white/10">
        <p className="text-[12px] font-semibold tracking-wide uppercase text-white/50 mb-3">For padel players</p>
        <p className="text-[15px] text-white/70 max-w-lg leading-relaxed">
          Get a personalised padel racket recommendation based on how you play, what you want to improve and your budget.
        </p>
      </section>

      <footer className="px-5 py-8 max-w-5xl mx-auto text-[12px] text-white/40 border-t border-white/10">
        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-4">
          {GUIDE_LINKS.map(([topic, label]) => (
            <Link key={topic} href={`/guides/${topic}`} className="underline hover:text-white/60">{label}</Link>
          ))}
        </div>
        <p className="mb-3">IdealGear · Padel racket recommendations · Racket catalogue last reviewed {CATALOG_LAST_UPDATED}</p>
        <AffiliateDisclosure dark />
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
          <Link href="/privacy-policy" className="underline hover:text-white/60">Privacy Policy</Link>
          <Link href="/terms-of-use" className="underline hover:text-white/60">Terms of Use</Link>
          <Link href="/affiliate-disclosure" className="underline hover:text-white/60">Affiliate Disclosure</Link>
        </div>
      </footer>
    </div>
  );
}
