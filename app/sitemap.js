import { GUIDE_CONFIGS } from "@/lib/guideConfigs";

// TODO: replace with your real domain before launch (also update
// metadataBase in app/layout.jsx to match).
const BASE_URL = "https://ideal-gear.vercel.app"; // update again if/when you move to a custom domain

export default function sitemap() {
  const staticRoutes = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/questionnaire`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/sample-recommendation`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms-of-use`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/affiliate-disclosure`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const guideRoutes = Object.keys(GUIDE_CONFIGS).map((topic) => ({
    url: `${BASE_URL}/guides/${topic}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...guideRoutes];
}
