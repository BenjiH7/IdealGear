"use client";

import { useState, useEffect } from "react";
import { TEAL, INK } from "@/lib/theme";

export function CookieBanner() {
  const [choice, setChoice] = useState(undefined); // undefined = not yet checked localStorage

  useEffect(() => {
    setChoice(window.localStorage.getItem("idealgear-cookie-choice"));
  }, []);

  const decide = (value) => {
    setChoice(value);
    try { window.localStorage.setItem("idealgear-cookie-choice", value); } catch {}
  };

  if (choice === undefined || choice) return null; // not yet loaded, or already decided

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-black/10 px-5 py-4 shadow-[0_-8px_24px_rgba(0,0,0,0.12)]">
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3">
        <p className="text-[13px] text-black/65 flex-1">
          We use minimal cookies for essential site function and, if you choose, privacy-friendly analytics. Affiliate links you click may set a tracking cookie on the retailer's own site.
        </p>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => decide("declined")} className="px-4 py-2.5 rounded-lg border border-black/15 text-[13px] font-medium" style={{ color: INK }}>Decline</button>
          <button onClick={() => decide("accepted")} className="px-4 py-2.5 rounded-lg text-white text-[13px] font-semibold" style={{ backgroundColor: TEAL }}>Accept</button>
        </div>
      </div>
    </div>
  );
}
