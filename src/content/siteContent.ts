export type SiteLanguage = "en" | "ja";

export type HoldingPageContent = {
  logoAlt: string;
  languageLabel: string;
  comingSoonText: string;
  heroTitle: string;
  heroTagline: string;
  heroDescription: string;
  primaryCTA: string;
  primaryCTALink: string;
  secondaryCTA: string;
  secondaryCTALink: string;
  position: string;
  boundary: string;
  japan: string;
  imageAlt: string;
  footerText: string;
  founded: string;
};

// Edit this file for basic public website text updates.
// UI components import this copy so routine wording changes stay in one place.
export const holdingPageContent: Record<SiteLanguage, HoldingPageContent> = {
  en: {
    logoAlt: "Tomo Pension",
    languageLabel: "Language",
    comingSoonText: "COMING SOON",
    heroTitle: "Turning verified AI productivity into retirement security",
    heroTagline: "Measured gains. Verified value. Shared future.",
    heroDescription:
      "Tomo Pension is building the trusted measurement and reporting layer that helps organisations turn a small, verified share of AI productivity gains into long-term retirement value.",
    primaryCTA: "Start a pilot conversation",
    primaryCTALink: "mailto:info@tomopension.com",
    secondaryCTA: "The full TOMO PENSION website is currently being prepared.",
    secondaryCTALink: "",
    position: "Measure. Verify. Share.",
    boundary:
      "TOMO PENSION does not operate pensions, hold assets, or move funds. Regulated partners remain responsible for pension administration, custody, and execution.",
    japan:
      "Japan is the first market for TOMO PENSION, where demographic change, long-term financial resilience, and responsible AI adoption increasingly intersect.",
    imageAlt: "West Shinjuku business district skyline",
    footerText: "Measured gains. Verified value. Shared future.",
    founded: "Founded by Eyal Shahaf"
  },
  ja: {
    logoAlt: "Tomo Pension",
    languageLabel: "言語",
    comingSoonText: "COMING SOON",
    heroTitle: "検証されたAI生産性を、老後の安心へ",
    heroTagline: "Measured gains. Verified value. Shared future.",
    heroDescription:
      "Tomo Pensionは、AIによる生産性向上のうち、検証可能な価値の一部を長期的な老後資産形成につなげるための、測定・検証・レポーティングのレイヤーを構築しています。",
    primaryCTA: "パイロットについて相談する",
    primaryCTALink: "mailto:info@tomopension.com",
    secondaryCTA: "TOMO PENSIONの正式ウェブサイトを現在準備しています。",
    secondaryCTALink: "",
    position: "測定。検証。分かち合い。",
    boundary:
      "TOMO PENSIONは年金の運営、資産保管、資金移動を行いません。年金管理、資産保管、執行は規制対象のパートナーが担います。",
    japan:
      "日本は、人口動態の変化、長期的な安心、そして責任あるAI導入が交差する最初の市場です。",
    imageAlt: "西新宿のビジネス街",
    footerText: "Measured gains. Verified value. Shared future.",
    founded: "Founded by Eyal Shahaf"
  }
};
