"use client";

import { useState } from "react";

type LandingLanguage = "en" | "ja";

const landingCopy = {
  en: {
    logoAlt: "TOMO PENSION",
    languageLabel: "Language",
    eyebrow: "COMING SOON",
    headline: "Measured gains. Verified value. Shared future.",
    body:
      "TOMO PENSION is building the trusted measurement and reporting layer that helps organisations turn a small, verified share of AI productivity gains into long-term retirement value.",
    imageAlt: "West Shinjuku business district skyline",
    position: "Measure. Verify. Share.",
    boundary:
      "TOMO PENSION does not operate pensions, hold assets, or move funds. Regulated partners remain responsible for pension administration, custody, and execution.",
    japan:
      "Japan is the first market for TOMO PENSION, where demographic change, long-term financial resilience, and responsible AI adoption increasingly intersect.",
    cta: "Start a pilot conversation",
    secondary: "The full TOMO PENSION website is currently being prepared.",
    founded: "Founded by Eyal Shahaf",
    tagline: "Measured gains. Verified value. Shared future."
  },
  ja: {
    logoAlt: "TOMO PENSION",
    languageLabel: "言語",
    eyebrow: "COMING SOON",
    headline: "共に未来をつくる。",
    body:
      "TOMO PENSIONは、AIによる生産性向上のうち、検証可能な価値の一部を長期的な老後資産形成につなげるための、測定・検証・レポーティングのレイヤーを構築しています。",
    imageAlt: "西新宿のビジネス街",
    position: "測定。検証。分かち合い。",
    boundary:
      "TOMO PENSIONは年金の運営、資産保管、資金移動を行いません。年金管理、資産保管、執行は規制対象のパートナーが担います。",
    japan:
      "日本は、人口動態の変化、長期的な安心、そして責任あるAI導入が交差する最初の市場です。",
    cta: "パイロットについて相談する",
    secondary: "TOMO PENSIONの正式ウェブサイトを現在準備しています。",
    founded: "Founded by Eyal Shahaf",
    tagline: "Measured gains. Verified value. Shared future."
  }
} as const;

export function ComingSoonPage() {
  const [language, setLanguage] = useState<LandingLanguage>("en");
  const copy = landingCopy[language];

  return (
    <main className="coming-soon-page" lang={language}>
      <header className="coming-soon-header">
        <div className="coming-soon-logo-frame" aria-label={copy.logoAlt}>
          <img src="/brand/tomo/logo-horizontal.png" alt={copy.logoAlt} />
        </div>
        <div className="coming-soon-language" aria-label={copy.languageLabel}>
          <button
            type="button"
            aria-pressed={language === "en"}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
          <button
            type="button"
            aria-pressed={language === "ja"}
            onClick={() => setLanguage("ja")}
          >
            日本語
          </button>
        </div>
      </header>

      <section id="coming-soon-main" className="coming-soon-hero" aria-labelledby="coming-soon-title">
        <div className="coming-soon-mark" aria-hidden="true">
          <img src="/brand/tomo/icon.svg" alt="" />
        </div>
        <p className="coming-soon-eyebrow">{copy.eyebrow}</p>
        <h1 id="coming-soon-title">{copy.headline}</h1>
        <p className="coming-soon-body">{copy.body}</p>
        <div className="coming-soon-position">{copy.position}</div>
        <figure className="coming-soon-image">
          <img src="/brand/tomo/west-shinjuku.jpg" alt={copy.imageAlt} />
        </figure>
      </section>

      <section className="coming-soon-statements" aria-label="TOMO PENSION positioning">
        <article>
          <span aria-hidden="true" />
          <p>{copy.boundary}</p>
        </article>
        <article>
          <span aria-hidden="true" />
          <p>{copy.japan}</p>
        </article>
      </section>

      <section className="coming-soon-cta" aria-label={copy.cta}>
        <a href="mailto:info@tomopension.com">{copy.cta}</a>
        <p>{copy.secondary}</p>
      </section>

      <footer className="coming-soon-footer">
        <div>
          <strong>TOMO PENSION</strong>
          <span>{copy.founded}</span>
        </div>
        <p>{copy.tagline}</p>
        <small>© 2026 TOMO PENSION</small>
      </footer>
    </main>
  );
}
