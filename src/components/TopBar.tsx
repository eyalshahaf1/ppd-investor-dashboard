"use client";

import { useEffect, useRef, useState } from "react";
import type { AccessibilityPreferences } from "@/lib/accessibility";
import { dashboardNavigation, type DashboardTab } from "@/lib/dashboard-navigation";
import { getCopy, languages, type Language } from "@/lib/i18n";
import { AccessibilitySettings } from "./AccessibilitySettings";

export type ThemeMode = "light" | "dark";

type TopBarProps = {
  activeTab: DashboardTab;
  backendOnline: boolean;
  themeMode: ThemeMode;
  language: Language;
  accessibilityPreferences: AccessibilityPreferences;
  onThemeToggle: () => void;
  onLanguageChange: (language: Language) => void;
  onAccessibilityChange: (preferences: AccessibilityPreferences) => void;
  onNavigate: (tab: DashboardTab) => void;
  onReset: () => void;
  onSave: () => void;
};

export function TopBar({
  activeTab,
  backendOnline,
  themeMode,
  language,
  accessibilityPreferences,
  onThemeToggle,
  onLanguageChange,
  onAccessibilityChange,
  onNavigate,
  onReset,
  onSave
}: TopBarProps) {
  const t = getCopy(language);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const topbarRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleDrawerKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMobileMenu();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleDrawerKeydown);
    window.requestAnimationFrame(() => {
      drawerRef.current?.querySelector<HTMLElement>("button")?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleDrawerKeydown);
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

  function handleReset() {
    if (window.confirm(t.topbar.resetConfirm)) {
      onReset();
      closeMobileMenu();
    }
  }

  function handleMobileNavigate(tab: DashboardTab) {
    onNavigate(tab);
    closeMobileMenu();
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
  }

  function setThemeMode(nextTheme: ThemeMode) {
    if (themeMode !== nextTheme) onThemeToggle();
  }

  return (
    <header className={`topbar ${isMobileMenuOpen ? "mobile-menu-open" : ""}`} ref={topbarRef}>
      <div className="topbar-inner">
        <div className="brand">
          <div className="eyebrow">
            <span className="eyebrow-full">{t.topbar.eyebrow}</span>
            <span className="eyebrow-mobile">{t.topbar.mobileEyebrow}</span>
          </div>
          <div className="brand-identity-row">
            <div className="brand-lockup" aria-label={t.topbar.title}>
              <img
                className="brand-logo-horizontal"
                src="/brand/tomo/logo-horizontal.png"
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
          <span className="mobile-menu-icon" aria-hidden="true">
            {isMobileMenuOpen ? "×" : "☰"}
          </span>
          <span className="mobile-menu-label">{t.topbar.openControls}</span>
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
            <span>{t.topbar.backend}</span>
            <strong
              className={backendOnline ? "status-ok" : "status-demo"}
              title={backendOnline ? undefined : t.topbar.offlineDetail}
            >
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
          <button className="action-btn" type="button" onClick={handleReset}>
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
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeMobileMenu();
        }}
      >
        <div
          className="mobile-drawer-panel"
          role="dialog"
          aria-modal="true"
          aria-label={t.topbar.menuTitle}
          ref={drawerRef}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div className="mobile-drawer-head">
            <h2>{t.topbar.menuTitle}</h2>
            <button
              className="mobile-drawer-close"
              type="button"
              aria-label={t.topbar.closeControls}
              onClick={closeMobileMenu}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <section className="mobile-drawer-section" aria-labelledby="mobile-navigation-title">
            <h2 id="mobile-navigation-title">{t.topbar.navigate}</h2>
            <div className="mobile-nav-list">
              {dashboardNavigation.map((item) => (
                <button
                  key={item.key}
                  className="mobile-nav-item"
                  type="button"
                  aria-current={activeTab === item.key ? "page" : undefined}
                  onClick={() => handleMobileNavigate(item.key)}
                >
                  {t.drawerTabs[item.key]}
                </button>
              ))}
            </div>
          </section>

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
            <div className="mobile-control-row">
              <span>{t.topbar.appearance}</span>
              <div className="appearance-switch" role="group" aria-label={t.topbar.appearance}>
                <button
                  type="button"
                  aria-pressed={themeMode === "light"}
                  onClick={() => setThemeMode("light")}
                >
                  {t.topbar.light}
                </button>
                <button
                  type="button"
                  aria-pressed={themeMode === "dark"}
                  onClick={() => setThemeMode("dark")}
                >
                  {t.topbar.dark}
                </button>
              </div>
            </div>
            <div className="mobile-control-row mobile-accessibility-row">
              <AccessibilitySettings
                presentation="inline"
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
            <button className="action-btn mobile-reset-btn" type="button" onClick={handleReset}>
              {t.topbar.reset}
            </button>
          </section>
        </div>
      </div>
    </header>
  );
}
