const BASE_URL = "https://idealgear.co"; // real domain — do not revert to the old vercel.app placeholder

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
