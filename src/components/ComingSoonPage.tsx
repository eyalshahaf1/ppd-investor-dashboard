"use client";

import { useState } from "react";
import { holdingPageContent, type SiteLanguage } from "@/content/siteContent";
import { analyticsConsentGranted } from "@/lib/cookieConsent";
import { CookieConsent } from "./CookieConsent";

export function ComingSoonPage() {
  const [language, setLanguage] = useState<SiteLanguage>("en");
  const copy = holdingPageContent[language];
  const labels = language === "ja"
    ? { positioning: "TOMO PENSIONの考え方", facts: "日本の背景", how: "仕組み", first: "最初の一歩", founder: "創業者", boundaries: "境界", pilot: "パイロット", demo: "デモを見る" }
    : { positioning: "TOMO PENSION's approach", facts: "Japan in context", how: "How it works", first: "First practical step", founder: "Founder", boundaries: "Boundaries", pilot: "Pilot", demo: "Open the demonstration" };

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
        <a className="coming-soon-logo-frame" href="#top" aria-label="Tomo Pension home">
          <img src="/brand/tomo/logo-navy.svg" alt={copy.logoAlt} />
        </a>
        <nav className="coming-soon-nav" aria-label={language === "ja" ? "サイトナビゲーション" : "Site navigation"}>
          <a href="#how-it-works">{labels.how}</a>
          <a href="#pilot">{labels.pilot}</a>
          <a href="#boundaries">{labels.boundaries}</a>
          <a href="/dashboard">{labels.demo}</a>
        </nav>
        <div className="coming-soon-language" aria-label={copy.languageLabel}>
          <button type="button" aria-pressed={language === "en"} onClick={() => handleLanguageChange("en")}>EN</button>
          <button type="button" aria-pressed={language === "ja"} onClick={() => handleLanguageChange("ja")}>日本語</button>
        </div>
      </header>

      <section id="top" className="coming-soon-hero" aria-labelledby="coming-soon-title">
        <div className="coming-soon-hero-copy">
          <p className="coming-soon-eyebrow">{copy.comingSoonText}</p>
          <h1 id="coming-soon-title">{copy.heroTitle}</h1>
          <p className="coming-soon-question">{copy.heroQuestion}</p>
          <p className="coming-soon-body">{copy.heroDescription}</p>
          <div className="coming-soon-actions">
            <a href={copy.primaryCTALink}>{copy.primaryCTA}</a>
            <a className="coming-soon-secondary-link" href={copy.secondaryCTALink}>{copy.secondaryCTA}</a>
          </div>
          <p className="coming-soon-status">{copy.statusLine}</p>
        </div>
        <figure className="coming-soon-image">
          <img src="/brand/tomo/west-shinjuku.jpg" alt={copy.imageAlt} />
        </figure>
      </section>

      <section className="coming-soon-story-block coming-soon-japan" aria-labelledby="japan-title">
        <div>
          <p className="coming-soon-section-kicker">{labels.facts}</p>
          <h2 id="japan-title">{copy.sections.japan.title}</h2>
          <p>{copy.sections.japan.body}</p>
        </div>
        <div className="coming-soon-facts" aria-label={labels.facts}>
          {copy.japanFacts.map((fact) => <article key={fact.value}><strong>{fact.value}</strong><span>{fact.label}</span></article>)}
        </div>
      </section>

      <section className="coming-soon-question-block" aria-label={labels.positioning}>
        <img src="/brand/tomo/icon.svg" alt="" aria-hidden="true" />
        <p>{copy.heroQuestion}</p>
      </section>

      <section id="how-it-works" className="coming-soon-content-section" aria-labelledby="idea-title">
        <div className="coming-soon-section-heading"><p className="coming-soon-section-kicker">{labels.how}</p><h2 id="idea-title">{copy.sections.simpleIdea.title}</h2></div>
        <div className="coming-soon-item-grid">{copy.sections.simpleIdea.items?.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3></article>)}</div>
      </section>

      <section className="coming-soon-content-section" aria-labelledby="why-title">
        <div className="coming-soon-section-heading"><p className="coming-soon-section-kicker">{labels.positioning}</p><h2 id="why-title">{copy.sections.whyTomo.title}</h2></div>
        <div className="coming-soon-item-grid">{copy.sections.whyTomo.items?.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
      </section>

      <section className="coming-soon-content-section coming-soon-measure" aria-labelledby="measure-title">
        <div className="coming-soon-section-heading"><p className="coming-soon-section-kicker">{labels.how}</p><h2 id="measure-title">{copy.sections.measure.title}</h2></div>
        <div className="coming-soon-item-grid">{copy.sections.measure.items?.map((item, index) => <article key={item.title}><span className="coming-soon-step-dot">{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
        <p className="coming-soon-rule">{copy.boundaryLine}</p>
      </section>

      <section className="coming-soon-story-block" aria-labelledby="first-title">
        <div className="coming-soon-section-heading"><p className="coming-soon-section-kicker">{labels.first}</p><h2 id="first-title">{copy.sections.firstStep.title}</h2></div>
        <div className="coming-soon-item-grid">{copy.sections.firstStep.items?.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
      </section>

      <section className="coming-soon-founder" aria-labelledby="founder-title">
        <p className="coming-soon-section-kicker">{labels.founder}</p><h2 id="founder-title">{copy.sections.founder.title}</h2><p>{copy.sections.founder.body}</p>
      </section>

      <section id="boundaries" className="coming-soon-content-section" aria-labelledby="boundary-title">
        <div className="coming-soon-section-heading"><p className="coming-soon-section-kicker">{labels.boundaries}</p><h2 id="boundary-title">{copy.sections.boundaries.title}</h2></div>
        <div className="coming-soon-item-grid">{copy.sections.boundaries.items?.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
      </section>

      <section id="pilot" className="coming-soon-cta" aria-labelledby="pilot-title">
        <p className="coming-soon-section-kicker">{labels.pilot}</p><h2 id="pilot-title">{copy.sections.pilot.title}</h2><p>{copy.sections.pilot.body}</p>
        <a href={copy.primaryCTALink}>{copy.primaryCTA}</a>
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
