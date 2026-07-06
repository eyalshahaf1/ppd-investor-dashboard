"use client";

import { useEffect, useRef, useState } from "react";
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
  const topbarRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closeMobileMenu();
    }

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMobileMenuOpen]);

  function closeMobileMenu() {
    topbarRef.current
      ?.querySelectorAll<HTMLDetailsElement>(".accessibility-settings[open]")
      .forEach((details) => {
        details.open = false;
      });
    setIsMobileMenuOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }

  function toggleMobileMenu() {
    if (isMobileMenuOpen) {
      closeMobileMenu();
      return;
    }

    setIsMobileMenuOpen(true);
  }

  return (
    <header className="topbar" ref={topbarRef}>
      <div className="topbar-inner">
        <div className="brand">
          <div className="eyebrow">
            <span className="eyebrow-full">{t.topbar.eyebrow}</span>
            <span className="eyebrow-mobile">{t.topbar.mobileEyebrow}</span>
          </div>
          <div className="brand-identity-row">
            <div className="brand-lockup" aria-label={t.topbar.title}>
              <img
                className="brand-logo-horizontal brand-logo-desktop"
                src="/brand/tomo/logo-horizontal.png"
                alt={t.topbar.title}
              />
              <img
                className="brand-logo-horizontal brand-logo-mobile"
                src="/brand/tomo/logo-horizontal.svg"
                alt={t.topbar.title}
              />
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
          ref={menuButtonRef}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-shell-drawer"
          aria-label={isMobileMenuOpen ? t.topbar.closeControls : t.topbar.openControls}
          onClick={toggleMobileMenu}
        >
          <span aria-hidden="true">{isMobileMenuOpen ? "×" : "☰"}</span>
        </button>
        <div className="top-actions desktop-controls">
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

      <div
        id="mobile-shell-drawer"
        className={`mobile-shell-drawer ${isMobileMenuOpen ? "is-open" : ""}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mobile-drawer-panel" role="dialog" aria-modal="true" aria-label={t.topbar.openControls}>
          <section className="mobile-drawer-section" aria-labelledby="mobile-preferences-title">
            <h2 id="mobile-preferences-title">{t.topbar.preferences}</h2>
            <div className="mobile-control-row">
              <span>{t.topbar.language}</span>
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
            </div>
            <button
              className="mobile-control-row mobile-control-button"
              type="button"
              onClick={onThemeToggle}
              aria-pressed={themeMode === "dark"}
            >
              <span>{t.topbar.appearance}</span>
              <b>{themeMode === "dark" ? "Light" : "Dark"}</b>
            </button>
            <div className="mobile-control-row mobile-accessibility-row">
              <AccessibilitySettings
                language={language}
                preferences={accessibilityPreferences}
                onChange={onAccessibilityChange}
              />
            </div>
          </section>

          <section className="mobile-drawer-section" aria-labelledby="mobile-actions-title">
            <h2 id="mobile-actions-title">{t.topbar.actions}</h2>
            <div className="mobile-action-grid">
              <button className="action-btn" type="button" data-testid="save-snapshot-mobile" onClick={onSave}>
                {t.topbar.save}
              </button>
              <button className="action-btn primary" type="button" onClick={() => window.print()}>
                {t.topbar.snapshot}
              </button>
            </div>
            <button className="action-btn mobile-reset-btn" type="button" onClick={onReset}>
              {t.topbar.reset}
            </button>
          </section>
        </div>
      </div>
    </header>
  );
}
