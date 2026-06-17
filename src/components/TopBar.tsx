import type { ScenarioKey } from "@/lib/types";
import { scenarios } from "@/lib/defaults";
import { getCopy, languages, type Language } from "@/lib/i18n";

export type ThemeMode = "light" | "dark";

type TopBarProps = {
  activeScenario: ScenarioKey;
  y5Flow: string;
  backendOnline: boolean;
  themeMode: ThemeMode;
  language: Language;
  onThemeToggle: () => void;
  onLanguageChange: (language: Language) => void;
  onReset: () => void;
  onSave: () => void;
};

export function TopBar({
  activeScenario,
  y5Flow,
  backendOnline,
  themeMode,
  language,
  onThemeToggle,
  onLanguageChange,
  onReset,
  onSave
}: TopBarProps) {
  const t = getCopy(language);

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <div className="eyebrow">{t.topbar.eyebrow}</div>
          <h1>{t.topbar.title}</h1>
          <p className="subtitle">
            {t.topbar.subtitle}
          </p>
        </div>
        <div className="top-actions">
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
