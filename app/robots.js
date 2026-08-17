// TODO: replace with your real domain before launch (keep in sync with
// app/sitemap.js and metadataBase in app/layout.jsx).
const BASE_URL = "https://www.idealgear.co"; // real production domain — idealgear.co (no www) redirects here, so this must match, not the other way round

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
