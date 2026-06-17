import type { ScenarioKey } from "@/lib/types";
import { scenarios } from "@/lib/defaults";

export type ThemeMode = "light" | "dark";

type TopBarProps = {
  activeScenario: ScenarioKey;
  y5Flow: string;
  backendOnline: boolean;
  themeMode: ThemeMode;
  onThemeToggle: () => void;
  onReset: () => void;
  onSave: () => void;
};

export function TopBar({
  activeScenario,
  y5Flow,
  backendOnline,
  themeMode,
  onThemeToggle,
  onReset,
  onSave
}: TopBarProps) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <div className="eyebrow">Japan investor demo app</div>
          <h1>Pension from AI Productivity</h1>
          <p className="subtitle">
            A SaaS MVP dashboard for the AI Pension Productivity Dividend concept.
            Prepared by Eyal Shahaf. The product wedge is measurement, allocation,
            and reporting while regulated partners handle pension execution.
          </p>
        </div>
        <div className="top-actions">
          <div className="pill">
            <span>Base case</span>
            <strong>{scenarios[activeScenario].label.replace(" adoption", "")}</strong>
          </div>
          <div className="pill">
            <span>Y5 flow</span>
            <strong>{y5Flow}</strong>
          </div>
          <div className="pill">
            <span>Backend</span>
            <strong className={backendOnline ? "status-ok" : "status-off"}>
              {backendOnline ? "SQLite" : "Offline"}
            </strong>
          </div>
          <button
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 text-xs font-black text-[var(--ink)] transition hover:border-[var(--teal)]"
            type="button"
            onClick={onThemeToggle}
            aria-pressed={themeMode === "dark"}
            aria-label={`Switch to ${themeMode === "dark" ? "light" : "dark"} mode`}
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
            Reset
          </button>
          <button className="action-btn" type="button" data-testid="save-snapshot" onClick={onSave}>
            Save
          </button>
          <button className="action-btn primary" type="button" onClick={() => window.print()}>
            Snapshot
          </button>
        </div>
      </div>
    </header>
  );
}
