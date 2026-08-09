import { LegalPage } from "@/components/LegalPage";

export const metadata = {
  title: "Affiliate Disclosure",
  description: "How IdealGear uses affiliate links, and why it never affects which racket is recommended.",
  alternates: { canonical: "/affiliate-disclosure" },
};

export default function AffiliateDisclosurePage() {
  return (
    <LegalPage
      title="Affiliate Disclosure"
      effectiveDate="[add launch date]"
      sections={[
        ["Summary", "Some links on IdealGear are affiliate links. If you click through and buy something, we may earn a small commission from the retailer, at no extra cost to you — the price you pay is the same either way."],
        ["This never changes what we recommend", "Which racket is recommended to you is decided only by your questionnaire answers, using the scoring method described in our recommendation engine. Commission never affects the matching or ranking of results, including for rackets that do earn IdealGear a commission."],
        ["Why we do this", "Affiliate commission is how IdealGear stays free to use, with no account, email, or payment required to get a recommendation."],
        ["Which programs we use", "[List the specific affiliate networks/retailers you're approved for once live, e.g. Amazon Associates, AWIN, CJ Affiliate, and any direct retailer programs.]"],
      ]}
    />
  );
}
