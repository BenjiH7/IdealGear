import { GUIDE_CONFIGS } from "@/lib/guideConfigs";

const BASE_URL = "https://idealgear.co"; // real domain — do not revert to the old vercel.app placeholder

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
