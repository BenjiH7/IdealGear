// TODO: replace with your real domain before launch (keep in sync with
// app/sitemap.js and metadataBase in app/layout.jsx).
const BASE_URL = "https://ideal-gear.vercel.app"; // update again if/when you move to a custom domain

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
