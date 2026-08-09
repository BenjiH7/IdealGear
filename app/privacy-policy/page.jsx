import { LegalPage } from "@/components/LegalPage";

export const metadata = {
  title: "Privacy Policy",
  description: "How IdealGear handles your data.",
  alternates: { canonical: "/privacy-policy" },
};

// PLACEHOLDER CONTENT — this is a starting draft, not legal advice. Have a
// solicitor (or a service like Termly/iubenda) review before launch,
// especially once real analytics/affiliate tracking are wired in, since the
// specifics depend on exactly which tools you use.
export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      effectiveDate="[add launch date]"
      sections={[
        ["What we collect", "The IdealGear questionnaire does not require a name, email, or account, and your answers are not sent to or stored on a server — they exist only in your browser for the duration of your session. If we add optional analytics (e.g. to see which pages are popular), we will only use privacy-focused, aggregated analytics that do not identify you personally, and will update this policy before doing so."],
        ["Cookies", "IdealGear itself does not use cookies to run the questionnaire. If you click through to a retailer via an affiliate link, that retailer and our affiliate network may set their own tracking cookie to record the referral — this is covered by their own privacy policy, not ours. See our Cookie Policy for details on any cookies IdealGear sets directly."],
        ["Affiliate links", "Some links on IdealGear are affiliate links. If you buy through them, we may earn a commission at no extra cost to you. This never influences which racket is recommended to you — see our Affiliate Disclosure for details."],
        ["Third-party retailers", "When you click through to a retailer, you leave IdealGear and that retailer's own privacy policy and terms apply to your purchase. We do not receive your payment or delivery details."],
        ["Contact", "Questions about this policy can be sent to [add contact email]."],
      ]}
    />
  );
}
