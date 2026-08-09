import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";

// Site-wide default metadata. Individual pages override title/description
// via their own generateMetadata() — this is just the fallback plus the
// shared tags (favicon, Open Graph defaults) that apply everywhere.
export const metadata = {
  metadataBase: new URL("https://ideal-gear.vercel.app"), // update again if/when you move to a custom domain
  title: {
    default: "IdealGear — Find the padel racket that fits your game",
    template: "%s | IdealGear",
  },
  description: "Answer a few questions about how you play and IdealGear matches you with padel rackets that actually fit — not just what's on offer.",
  icons: {
    icon: "/favicon.ico", // TODO: add a real favicon.ico to /public before launch
  },
  openGraph: {
    type: "website",
    siteName: "IdealGear",
    title: "IdealGear — Find the padel racket that fits your game",
    description: "Answer a few questions about how you play and IdealGear matches you with padel rackets that actually fit.",
    images: ["/og-image.png"], // TODO: add a real 1200x630 og-image.png to /public
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
