// TODO: replace with your real domain before launch (keep in sync with
// app/sitemap.js and metadataBase in app/layout.jsx).
const BASE_URL = "https://your-domain-here.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
