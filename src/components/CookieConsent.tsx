"use client";

import { useEffect, useState } from "react";
import {
  cookieConsentChangeEvent,
  cookieConsentStorageKey,
  type CookieChoice
} from "@/lib/cookieConsent";
import { getCopy, type Language } from "@/lib/i18n";

type CookieConsentProps = {
  language: Language;
};

export function CookieConsent({ language }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const copy = getCopy(language).cookieConsent;

  useEffect(() => {
    setIsVisible(window.localStorage.getItem(cookieConsentStorageKey) === null);
  }, []);

  function saveChoice(choice: CookieChoice) {
    window.localStorage.setItem(
      cookieConsentStorageKey,
      JSON.stringify({
        choice,
        acceptedAt: new Date().toISOString()
      })
    );
    window.dispatchEvent(new Event(cookieConsentChangeEvent));
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <section className="cookie-consent" aria-label={copy.title}>
      <div>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
      </div>
      <div className="cookie-actions">
        <button type="button" onClick={() => saveChoice("essential")}>
          {copy.essential}
        </button>
        <button className="primary" type="button" onClick={() => saveChoice("analytics")}>
          {copy.analytics}
        </button>
      </div>
    </section>
  );
}
