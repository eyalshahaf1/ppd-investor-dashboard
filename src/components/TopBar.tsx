"use client";

import { useState } from "react";
import type { ScenarioKey } from "@/lib/types";
import { scenarios } from "@/lib/defaults";
import type { AccessibilityPreferences } from "@/lib/accessibility";
import { getCopy, languages, type Language } from "@/lib/i18n";
import { AccessibilitySettings } from "./AccessibilitySettings";

export type ThemeMode = "light" | "dark";

type TopBarProps = {
  activeScenario: ScenarioKey;
  y5Flow: string;
  backendOnline: boolean;
  themeMode: ThemeMode;
  language: Language;
  accessibilityPreferences: AccessibilityPreferences;
  onThemeToggle: () => void;
  onLanguageChange: (language: Language) => void;
  onAccessibilityChange: (preferences: AccessibilityPreferences) => void;
  onReset: () => void;
  onSave: () => void;
};

export function TopBar({
  activeScenario,
  y5Flow,
  backendOnline,
  themeMode,
  language,
  accessibilityPreferences,
  onThemeToggle,
  onLanguageChange,
  onAccessibilityChange,
  onReset,
  onSave
}: TopBarProps) {
  const t = getCopy(language);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <div className="eyebrow">{t.topbar.eyebrow}</div>
          <div className="brand-identity-row">
            <div className="brand-lockup" aria-label={t.topbar.title}>
              <img
                className="brand-logo-horizontal"
                src="/brand/tomo/logo-horizontal.svg"
                alt={t.topbar.title}
              />
              <span className="brand-mobile-lockup">
                <img className="brand-mobile-icon" src="/brand/tomo/icon.svg" alt="" aria-hidden="true" />
                <span>{t.topbar.title}</span>
              </span>
            </div>
            {t.topbar.tagline ? <p className="brand-tagline">{t.topbar.tagline}</p> : null}
          </div>
          <h1 className="sr-only">{t.topbar.title}</h1>
          <p className="subtitle">
            {t.topbar.subtitle}
          </p>
        </div>
        <button
          className="mobile-menu-btn"
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-controls="topbar-controls"
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        >
          <span aria-hidden="true">{isMobileMenuOpen ? "×" : "☰"}</span>
          {isMobileMenuOpen ? t.topbar.closeControls : t.topbar.openControls}
        </button>
        <div id="topbar-controls" className={`top-actions ${isMobileMenuOpen ? "is-open" : ""}`}>
          <div className="language-switch" aria-label="Language">
            {languages.map((item) => (
              <button
                key={item.key}
                type="button"
                aria-pressed={language === item.key}
                onClick={() => onLanguageChange(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <AccessibilitySettings
            language={language}
            preferences={accessibilityPreferences}
            onChange={onAccessibilityChange}
          />
          <div className="pill">
            <span>{t.topbar.baseCase}</span>
            <strong>{scenarios[activeScenario].label.replace(" adoption", "")}</strong>
          </div>
          <div className="pill">
            <span>{t.topbar.y5Flow}</span>
            <strong>{y5Flow}</strong>
          </div>
          <div className="pill">
            <span>{t.topbar.backend}</span>
            <strong className={backendOnline ? "status-ok" : "status-off"}>
              {backendOnline ? "SQLite" : t.topbar.offline}
            </strong>
          </div>
          <button
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 text-xs font-black text-[var(--ink)] transition hover:border-[var(--teal)]"
            type="button"
            onClick={onThemeToggle}
            aria-pressed={themeMode === "dark"}
            aria-label={t.topbar.switchTheme}
          >
            <span
              className={`h-3 w-3 rounded-full ${
                themeMode === "dark" ? "bg-[var(--amber)]" : "bg-[var(--teal)]"
              }`}
              aria-hidden="true"
            />
            {themeMode === "dark" ? "Light" : "Dark"}
          </button>
          <button className="action-btn" type="button" onClick={onReset}>
            {t.topbar.reset}
          </button>
          <button className="action-btn" type="button" data-testid="save-snapshot" onClick={onSave}>
            {t.topbar.save}
          </button>
          <button className="action-btn primary" type="button" onClick={() => window.print()}>
            {t.topbar.snapshot}
          </button>
        </div>
      </div>
    </header>
  );
}
