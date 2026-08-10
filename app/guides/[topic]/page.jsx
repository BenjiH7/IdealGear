import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TEAL, TEAL_DARK, INK } from "@/lib/theme";
import { RACKET_CATALOG, getListing, buildBestFor } from "@/lib/engine";
import { GUIDE_CONFIGS } from "@/lib/guideConfigs";
import { RacketShapeIcon, AffiliateDisclosure } from "@/components/Visuals";

// Pre-renders all 9 guide pages at build time (Static Site Generation) —
// each becomes a real, individually-crawlable HTML file/URL, not a
// client-side screen switch.
export function generateStaticParams() {
  return Object.keys(GUIDE_CONFIGS).map((topic) => ({ topic }));
}

// This is the fix for the SEO gap flagged earlier: title/description are now
// rendered into the actual <head> of the server response, not set by
// JavaScript after the page loads client-side.
export function generateMetadata({ params }) {
  const cfg = GUIDE_CONFIGS[params.topic];
  if (!cfg) return {};
  return {
    title: cfg.title,
    description: cfg.description,
    alternates: { canonical: `/guides/${params.topic}` },
    openGraph: { title: cfg.title, description: cfg.description },
  };
}

export default function GuidePage({ params }) {
  const cfg = GUIDE_CONFIGS[params.topic];
  if (!cfg) notFound();

  const picks = RACKET_CATALOG.filter((r) => cfg.filterFn(r, getListing)).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: cfg.heading,
    itemListElement: picks.map((racket, i) => {
      const listing = getListing(racket.id);
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: `${racket.brand} ${racket.model}`,
          brand: racket.brand,
          ...(listing?.price ? { offers: { "@type": "Offer", priceCurrency: "GBP", price: listing.price, url: listing.url || undefined } } : {}),
        },
      };
    }),
  };

  return (
    <div className="min-h-screen pb-10" style={{ background: `linear-gradient(180deg, ${TEAL_DARK} 0%, ${TEAL} 100%)` }}>
      {/* Rendered directly into the server response — this is what makes it
          actually crawlable, unlike a useEffect-injected script tag. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="px-5 pt-6 max-w-2xl mx-auto">
        <Link href="/" className="flex items-center gap-1.5 text-[14px] text-white/70 -ml-1"><ArrowLeft size={16} /> Back to home</Link>

        <p className="text-[12px] font-semibold tracking-wide uppercase text-white/50 mt-6">Guide</p>
        <h1 className="font-serif text-[28px] leading-tight mt-1 text-white">{cfg.heading}</h1>
        <p className="text-[15px] text-white/70 mt-3 leading-relaxed max-w-lg">{cfg.intro}</p>

        <div className="mt-6 space-y-4">
          {picks.map((racket) => {
            const listing = getListing(racket.id);
            return (
              <div key={racket.id} className="bg-white rounded-2xl border border-black/8 p-5 shadow-[0_8px_24px_rgba(10,20,19,0.14)] flex items-start gap-3">
                <RacketShapeIcon shape={racket.shape} />
                <div>
                  <h2 className="font-serif text-[18px]" style={{ color: INK }}>{racket.brand} {racket.model}</h2>
                  <p className="text-[13px] text-black/45 mt-0.5">{racket.shape} · {racket.year} · £{listing.price}</p>
                  <p className="text-[13px] mt-2" style={{ color: TEAL_DARK }}>{buildBestFor(racket)}</p>
                  {listing.url ? (
                    <a href={listing.url} target="_blank" rel="noreferrer" className="text-[11px] underline break-all mt-2 block" style={{ color: TEAL_DARK }}>{listing.url}</a>
                  ) : (
                    <span className="text-[11px] text-black/35 mt-2 block">Retailer link pending review</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {cfg.body && (
          <div className="mt-8 space-y-6">
            {cfg.body.map(([sectionHeading, paragraph]) => (
              <div key={sectionHeading}>
                <h2 className="font-serif text-[17px] text-white mb-2">{sectionHeading}</h2>
                <p className="text-[14px] text-white/70 leading-relaxed">{paragraph}</p>
              </div>
            ))}
          </div>
        )}

        <p className="text-[13px] text-white/70 mt-6 leading-relaxed">
          Every player is different — for a recommendation based on your own level, style and budget rather than a general list, try the full IdealGear questionnaire.
        </p>
        <Link href="/questionnaire" className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-[15px] shadow-[0_8px_24px_rgba(0,0,0,0.18)]" style={{ backgroundColor: "white", color: TEAL_DARK }}>
          Find My Ideal Racket <ArrowRight size={18} />
        </Link>

        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-[12px] font-semibold tracking-wide uppercase text-white/50 mb-3">Related guides</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {Object.entries(GUIDE_CONFIGS)
              .filter(([key]) => key !== params.topic)
              .slice(0, 6)
              .map(([key, otherCfg]) => (
                <Link key={key} href={`/guides/${key}`} className="text-[13px] underline text-white/70 hover:text-white">
                  {otherCfg.heading}
                </Link>
              ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <AffiliateDisclosure dark />
        </div>
      </div>
    </div>
  );
}
