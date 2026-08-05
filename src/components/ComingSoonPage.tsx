"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { holdingPageContent, type SiteLanguage } from "@/content/siteContent";
import {
  accessibilityStorageKey,
  defaultAccessibilityPreferences,
  normalizeAccessibilityPreferences,
  type AccessibilityPreferences
} from "@/lib/accessibility";
import { analyticsConsentGranted } from "@/lib/cookieConsent";
import { AccessibilitySettings } from "./AccessibilitySettings";
import { CookieConsent } from "./CookieConsent";

export function ComingSoonPage() {
  const [language, setLanguage] = useState<SiteLanguage>("en");
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [accessibilityPreferences, setAccessibilityPreferences] =
    useState<AccessibilityPreferences>(defaultAccessibilityPreferences);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const copy = holdingPageContent[language];
  const labels = language === "ja"
    ? { positioning: "TOMO PENSIONの考え方", facts: "日本の背景", how: "仕組み", first: "最初の一歩", about: "TOMOについて", boundaries: "境界", pilot: "パイロット", demo: "デモを見る", theme: "表示" }
    : { positioning: "TOMO PENSION's approach", facts: "Japan in context", how: "How it works", first: "First practical step", about: "About", boundaries: "Boundaries", pilot: "Pilot", demo: "Open the demonstration", theme: "Appearance" };

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("ppd-theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setThemeMode(storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setThemeMode("dark");
    }

    const storedAccessibility = window.localStorage.getItem(accessibilityStorageKey);
    if (storedAccessibility) {
      try {
        setAccessibilityPreferences(normalizeAccessibilityPreferences(JSON.parse(storedAccessibility)));
      } catch {
        setAccessibilityPreferences(defaultAccessibilityPreferences);
      }
    }

    const handleScroll = () => setShowBackToTop(window.scrollY > 440);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    window.localStorage.setItem("ppd-theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dataset.textSize = accessibilityPreferences.textSize;
    root.dataset.highContrast = accessibilityPreferences.highContrast ? "true" : "false";
    root.dataset.reducedMotion = accessibilityPreferences.reducedMotion ? "true" : "false";
    root.dataset.underlineLinks = accessibilityPreferences.underlineLinks ? "true" : "false";
    root.dataset.enhancedFocus = accessibilityPreferences.enhancedFocus ? "true" : "false";
    window.localStorage.setItem(accessibilityStorageKey, JSON.stringify(accessibilityPreferences));
  }, [accessibilityPreferences, language]);

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

  function handleSectionNavigation(event: MouseEvent<HTMLAnchorElement>, sectionId: string) {
    if (!sectionId) return;
    event.preventDefault();
    const target = document.getElementById(sectionId);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleConfigLinkNavigation(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#")) return;
    handleSectionNavigation(event, href.slice(1));
  }

  return (
    <main className="coming-soon-page" lang={language}>
      <header className="coming-soon-header">
        <a
          className="coming-soon-logo-frame"
          href="#top"
          onClick={(event) => handleSectionNavigation(event, "top")}
          aria-label="Tomo Pension home"
        >
          <img src="/brand/tomo/logo-horizontal.png" alt={copy.logoAlt} />
        </a>
        <div className="coming-soon-header-actions">
          <nav className="coming-soon-nav" aria-label={language === "ja" ? "サイトナビゲーション" : "Site navigation"}>
            <a href="#how-it-works" onClick={(event) => handleSectionNavigation(event, "how-it-works")}>{labels.how}</a>
            <a href="#about" onClick={(event) => handleSectionNavigation(event, "about")}>{labels.about}</a>
            <a href="#pilot" onClick={(event) => handleSectionNavigation(event, "pilot")}>{labels.pilot}</a>
            <a href="#boundaries" onClick={(event) => handleSectionNavigation(event, "boundaries")}>{labels.boundaries}</a>
            <a href="/dashboard">{labels.demo}</a>
          </nav>
          <div className="coming-soon-preferences" aria-label={labels.theme}>
            <button
              className="coming-soon-theme-toggle"
              type="button"
              aria-pressed={themeMode === "dark"}
              onClick={() => setThemeMode((current) => current === "dark" ? "light" : "dark")}
            >
              {themeMode === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            <AccessibilitySettings
              language={language}
              preferences={accessibilityPreferences}
              onChange={setAccessibilityPreferences}
            />
          </div>
          <div className="coming-soon-language" aria-label={copy.languageLabel}>
            <button type="button" aria-pressed={language === "en"} onClick={() => handleLanguageChange("en")}>EN</button>
            <button type="button" aria-pressed={language === "ja"} onClick={() => handleLanguageChange("ja")}>日本語</button>
          </div>
        </div>
      </header>

      <section id="top" className="coming-soon-hero" aria-labelledby="coming-soon-title">
        <div className="coming-soon-hero-copy">
          <img
            className="coming-soon-hero-symbol"
            src="/brand/tomo/icon.svg"
            alt=""
            aria-hidden="true"
          />
          <p className="coming-soon-eyebrow">{copy.comingSoonText}</p>
          <h1 id="coming-soon-title">{copy.heroTitle}</h1>
          <p className="coming-soon-question">{copy.heroQuestion}</p>
          <p className="coming-soon-body">{copy.heroDescription}</p>
          <div className="coming-soon-actions">
            <a href={copy.primaryCTALink}>{copy.primaryCTA}</a>
            <a
              className="coming-soon-secondary-link"
              href={copy.secondaryCTALink}
              onClick={(event) => handleConfigLinkNavigation(event, copy.secondaryCTALink)}
            >
              {copy.secondaryCTA}
            </a>
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
        <p className="coming-soon-question-tagline">{copy.footerText}</p>
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

      <section id="about" className="coming-soon-founder" aria-labelledby="founder-title">
        <p className="coming-soon-section-kicker">{labels.about}</p>
        <h2 id="founder-title">{copy.sections.founder.title}</h2>
        <div className="coming-soon-founder-copy">
          {copy.sections.founder.body?.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="coming-soon-founder-points">
          {copy.sections.founder.items?.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}
        </div>
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
        <div className="coming-soon-footer-brand-column">
          <div className="coming-soon-footer-brand">
            <img src="/brand/tomo/icon.svg" alt="" aria-hidden="true" />
            <strong>TOMO PENSION</strong>
          </div>
          <p className="coming-soon-footer-founder">{copy.founded}</p>
        </div>
        <div className="coming-soon-footer-contact">
          <span className="coming-soon-footer-label">{copy.footerContact}</span>
          <a href="mailto:info@tomopension.com">info@tomopension.com</a>
          <a
            className="coming-soon-footer-linkedin"
            href="https://www.linkedin.com/in/eyalshahaf/"
            rel="noreferrer"
            target="_blank"
            aria-label="Eyal Shahaf on LinkedIn"
          >
            <span className="coming-soon-linkedin" aria-hidden="true">in</span>
            LinkedIn
          </a>
        </div>
        <nav className="coming-soon-footer-links" aria-label={language === "ja" ? "フッターナビゲーション" : "Footer navigation"}>
          <span className="coming-soon-footer-label">{copy.footerPolicies}</span>
          <a href="/cookie-policy">Cookie Policy</a>
          <a href="/accessibility">{language === "ja" ? "アクセシビリティ" : "Accessibility"}</a>
        </nav>
        <div className="coming-soon-footer-bottom">
          <p>{copy.footerText}</p>
          <small>{copy.footerCopyright}</small>
        </div>
      </footer>
      <CookieConsent language={language} />
      {showBackToTop ? (
        <button
          className="coming-soon-back-to-top"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={language === "ja" ? "ページ上部へ戻る" : "Back to top"}
          title={language === "ja" ? "ページ上部へ戻る" : "Back to top"}
        >
          ↑
        </button>
      ) : null}
    </main>
  );
}
