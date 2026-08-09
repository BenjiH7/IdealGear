import { LegalPage } from "@/components/LegalPage";

export const metadata = {
  title: "Terms of Use",
  description: "The terms for using IdealGear.",
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      effectiveDate="[add launch date]"
      sections={[
        ["What IdealGear is", "IdealGear is a free recommendation tool to help you choose a padel racket based on your answers to a short questionnaire. It is a guidance tool, not a guarantee — see our disclaimer below."],
        ["No guarantee of fit", "Recommendations are generated from your answers and our racket data, which we make reasonable efforts to keep accurate but cannot guarantee is complete, current, or error-free at all times. Racket characteristics can also vary between individual players. Always check a retailer's own product page before purchasing."],
        ["Purchases", "IdealGear is not a retailer. All purchases happen on a third-party retailer's website, under their own terms, pricing, and returns policy. We are not responsible for the accuracy of third-party pricing, stock, or delivery."],
        ["Affiliate relationships", "IdealGear may earn a commission from purchases made through links on this site, at no extra cost to you. See our Affiliate Disclosure for details."],
        ["Changes", "We may update these terms as the site develops. Continued use of IdealGear after a change means you accept the updated terms."],
        ["Contact", "Questions about these terms can be sent to [add contact email]."],
      ]}
    />
  );
}
