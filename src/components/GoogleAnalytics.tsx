"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  analyticsConsentGranted,
  cookieConsentChangeEvent
} from "@/lib/cookieConsent";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    function syncConsent() {
      setEnabled(Boolean(gaId) && analyticsConsentGranted());
    }

    syncConsent();
    window.addEventListener(cookieConsentChangeEvent, syncConsent);
    window.addEventListener("storage", syncConsent);

    return () => {
      window.removeEventListener(cookieConsentChangeEvent, syncConsent);
      window.removeEventListener("storage", syncConsent);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        id="google-analytics-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
