"use client";

import { useState } from "react";
import { holdingPageContent, type SiteLanguage } from "@/content/siteContent";
import { analyticsConsentGranted } from "@/lib/cookieConsent";
import { CookieConsent } from "./CookieConsent";

export function ComingSoonPage() {
  const [language, setLanguage] = useState<SiteLanguage>("en");
  const copy = holdingPageContent[language];

  function handleLanguageChange(nextLanguage: SiteLanguage) {
    if (nextLanguage === language) return;

    setLanguage(nextLanguage);

    if (typeof window !== "undefined" && analyticsConsentGranted() && typeof window.gtag === "function") {
      const pagePath = `${window.location.pathname}?lang=${nextLanguage}`;
      window.gtag("event", "language_change", { language: nextLanguage });
      window.gtag("event", "page_view", {
        page_title: `TOMO PENSION | ${nextLanguage === "ja" ? "Japanese" : "English"}`,
        page_location: `${window.location.origin}${pagePath}`,
        page_path: pagePath
      });
    }
  }

  return (
    <main className="coming-soon-page" lang={language}>
      <header className="coming-soon-header">
        <div className="coming-soon-logo-frame">
          <img src="/brand/tomo/logo-horizontal.svg" alt={copy.logoAlt} />
        </div>
        <div className="coming-soon-language" aria-label={copy.languageLabel}>
          <button type="button" aria-pressed={language === "en"} onClick={() => handleLanguageChange("en")}>EN</button>
          <button type="button" aria-pressed={language === "ja"} onClick={() => handleLanguageChange("ja")}>日本語</button>
        </div>
      </header>

      <section id="coming-soon-main" className="coming-soon-hero" aria-labelledby="coming-soon-title">
        <div className="coming-soon-mark" aria-hidden="true">
          <img src="/brand/tomo/icon.svg" alt="" />
        </div>
        <p className="coming-soon-eyebrow">{copy.comingSoonText}</p>
        <h1 id="coming-soon-title">{copy.heroTitle}</h1>
        <p className="coming-soon-tagline">{copy.heroTagline}</p>
        <p className="coming-soon-body">{copy.heroDescription}</p>
        <div className="coming-soon-position">{copy.position}</div>
        <figure className="coming-soon-image">
          <img src="/brand/tomo/west-shinjuku.jpg" alt={copy.imageAlt} />
        </figure>
      </section>

      <section className="coming-soon-statements" aria-label="TOMO PENSION positioning">
        <article><span aria-hidden="true" /><p>{copy.boundary}</p></article>
        <article><span aria-hidden="true" /><p>{copy.japan}</p></article>
      </section>

      <section className="coming-soon-cta" aria-label={copy.primaryCTA}>
        <a href={copy.primaryCTALink}>{copy.primaryCTA}</a>
        {copy.secondaryCTALink ? <a className="coming-soon-secondary-link" href={copy.secondaryCTALink}>{copy.secondaryCTA}</a> : <p>{copy.secondaryCTA}</p>}
      </section>

      <footer className="coming-soon-footer">
        <div><strong>TOMO PENSION</strong><span>{copy.founded}</span></div>
        <p>{copy.footerText}</p>
        <small>© 2026 TOMO PENSION · <a href="/cookie-policy">Cookie Policy</a> · <a href="https://www.linkedin.com/in/eyalshahaf/" rel="noreferrer" target="_blank">LinkedIn</a></small>
      </footer>
      <CookieConsent language={language} />
    </main>
  );
}
