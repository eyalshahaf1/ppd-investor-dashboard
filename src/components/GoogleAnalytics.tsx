"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  analyticsConsentGranted,
  cookieConsentChangeEvent,
  updateGoogleAnalyticsConsent
} from "@/lib/cookieConsent";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  function configureAnalyticsIfAllowed() {
    if (!gaId) return;

    const granted = analyticsConsentGranted();
    setAnalyticsEnabled(granted);
    updateGoogleAnalyticsConsent(granted);

    if (granted && typeof window.gtag === "function") {
      window.gtag("config", gaId);
    }
  }

  useEffect(() => {
    configureAnalyticsIfAllowed();
    window.addEventListener(cookieConsentChangeEvent, configureAnalyticsIfAllowed);
    window.addEventListener("storage", configureAnalyticsIfAllowed);

    return () => {
      window.removeEventListener(cookieConsentChangeEvent, configureAnalyticsIfAllowed);
      window.removeEventListener("storage", configureAnalyticsIfAllowed);
    };
  }, []);

  if (!gaId) return null;

  return (
    <>
      <Script
        id="google-analytics-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
        onReady={configureAnalyticsIfAllowed}
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          gtag('js', new Date());
          ${analyticsEnabled ? `gtag('consent', 'update', { analytics_storage: 'granted' }); gtag('config', '${gaId}');` : ""}
        `}
      </Script>
    </>
  );
}
