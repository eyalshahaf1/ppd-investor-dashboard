"use client";

import { useEffect, useMemo, useState } from "react";
import { getDashboardSnapshot, projectScenario } from "@/lib/calculations";
import { defaultAssumptions, scenarios } from "@/lib/defaults";
import { formatYen } from "@/lib/format";
import {
  accessibilityStorageKey,
  defaultAccessibilityPreferences,
  normalizeAccessibilityPreferences,
  type AccessibilityPreferences
} from "@/lib/accessibility";
import type { Language } from "@/lib/i18n";
import { generateInvestorReport } from "@/lib/productFeatures";
import type { Assumptions, JapanStatKey, JapanStatRecord, PilotTasks, ScenarioKey } from "@/lib/types";
import { AboutView } from "./AboutView";
import { AccessibilityStatement } from "./AccessibilityStatement";
import { AppFooter } from "./AppFooter";
import { CalculatorView } from "./CalculatorView";
import { DataConnectionView } from "./DataConnectionView";
import type { DashboardTab } from "./Tabs";
import { InvestorRoom } from "./InvestorRoom";
import { OverviewView } from "./OverviewView";
import { PilotTaskBoard } from "./PilotTaskBoard";
import { ScenarioView } from "./ScenarioView";
import { Tabs } from "./Tabs";
import { TopBar } from "./TopBar";
import type { ThemeMode } from "./TopBar";

type ApiEnvelope<T> = T & { ok: boolean };

async function apiGet<T>(path: string): Promise<ApiEnvelope<T>> {
  const response = await fetch(path, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`GET ${path} failed`);
  return response.json();
}

async function apiPost<T>(path: string, payload: unknown): Promise<ApiEnvelope<T>> {
  const response = await fetch(path, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(`POST ${path} failed`);
  return response.json();
}

export function DashboardApp() {
  const [assumptions, setAssumptions] = useState<Assumptions>(defaultAssumptions);
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("medium");
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [pilotTasks, setPilotTasks] = useState<PilotTasks>({});
  const [backendOnline, setBackendOnline] = useState(false);
  const [saveLabel, setSaveLabel] = useState("Save");
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [language, setLanguage] = useState<Language>("en");
  const [accessibilityPreferences, setAccessibilityPreferences] =
    useState<AccessibilityPreferences>(defaultAccessibilityPreferences);
  const [showAccessibilityStatement, setShowAccessibilityStatement] = useState(false);
  const [japanStats, setJapanStats] = useState<Record<JapanStatKey, JapanStatRecord> | null>(null);

  const mediumProjection = useMemo(
    () => projectScenario("medium", assumptions),
    [assumptions]
  );
  const activeProjection = useMemo(
    () => projectScenario(activeScenario, assumptions),
    [activeScenario, assumptions]
  );
  const y5Flow = formatYen(activeProjection[activeProjection.length - 1].annualContribution);
  const investorReport = useMemo(
    () => generateInvestorReport(assumptions, activeScenario),
    [assumptions, activeScenario]
  );

  useEffect(() => {
    async function loadBackendState() {
      try {
        await apiGet<{ service: string }>("/api/health");
        setBackendOnline(true);

        const assumptionResponse = await apiGet<{ assumptions: Assumptions }>("/api/assumptions");
        setAssumptions({ ...defaultAssumptions, ...assumptionResponse.assumptions });

        const taskResponse = await apiGet<{ tasks: PilotTasks }>("/api/tasks");
        setPilotTasks(taskResponse.tasks ?? {});

        const statsResponse = await apiGet<{
          metrics: Record<JapanStatKey, JapanStatRecord>;
        }>("/api/japan-stats");
        setJapanStats(statsResponse.metrics);
      } catch {
        setBackendOnline(false);
      }
    }

    loadBackendState();
  }, []);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("ppd-theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setThemeMode(storedTheme);
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setThemeMode(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("ppd-language");
    if (storedLanguage === "en" || storedLanguage === "ja") {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    const storedAccessibility = window.localStorage.getItem(accessibilityStorageKey);

    if (storedAccessibility) {
      try {
        setAccessibilityPreferences(
          normalizeAccessibilityPreferences(JSON.parse(storedAccessibility))
        );
        return;
      } catch {
        setAccessibilityPreferences(defaultAccessibilityPreferences);
      }
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAccessibilityPreferences({
        ...defaultAccessibilityPreferences,
        reducedMotion: true
      });
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    window.localStorage.setItem("ppd-theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("ppd-language", language);
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.textSize = accessibilityPreferences.textSize;
    root.dataset.highContrast = accessibilityPreferences.highContrast ? "true" : "false";
    root.dataset.reducedMotion = accessibilityPreferences.reducedMotion ? "true" : "false";
    root.dataset.underlineLinks = accessibilityPreferences.underlineLinks ? "true" : "false";
    root.dataset.enhancedFocus = accessibilityPreferences.enhancedFocus ? "true" : "false";
    window.localStorage.setItem(
      accessibilityStorageKey,
      JSON.stringify(accessibilityPreferences)
    );
  }, [accessibilityPreferences]);

  async function persistAssumptions(nextAssumptions: Assumptions) {
    if (!backendOnline) return;
    try {
      await apiPost<{ assumptions: Assumptions }>("/api/assumptions", nextAssumptions);
    } catch {
      setBackendOnline(false);
    }
  }

  function updateAssumption<K extends keyof Assumptions>(key: K, value: Assumptions[K]) {
    const next = { ...assumptions, [key]: value };
    setAssumptions(next);
    persistAssumptions(next);
  }

  function applyAssumptions(nextAssumptions: Assumptions) {
    const normalized = { ...defaultAssumptions, ...nextAssumptions };
    setAssumptions(normalized);
    persistAssumptions(normalized);
  }

  async function updateTask(taskKey: string, completed: boolean) {
    const next = { ...pilotTasks, [taskKey]: completed };
    setPilotTasks(next);
    if (!backendOnline) return;
    try {
      await apiPost<{ tasks: PilotTasks }>("/api/tasks", next);
    } catch {
      setBackendOnline(false);
    }
  }

  async function saveSnapshot() {
    if (!backendOnline) {
      setSaveLabel("Offline");
      setTimeout(() => setSaveLabel("Save"), 1200);
      return;
    }

    try {
      await apiPost("/api/snapshots", {
        name: `Investor dashboard snapshot - ${new Date().toISOString()}`,
        assumptions,
        outputs: getDashboardSnapshot(assumptions, activeScenario)
      });
      setSaveLabel("Saved");
    } catch {
      setSaveLabel("Error");
    } finally {
      setTimeout(() => setSaveLabel("Save"), 1200);
    }
  }

  function resetModel() {
    setActiveScenario("medium");
    setAssumptions(defaultAssumptions);
    persistAssumptions(defaultAssumptions);
  }

  function changeTab(tab: DashboardTab) {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function toggleTheme() {
    setThemeMode((current) => (current === "dark" ? "light" : "dark"));
  }

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="app-chrome">
        <TopBar
          activeScenario={activeScenario}
          y5Flow={y5Flow}
          backendOnline={backendOnline}
          themeMode={themeMode}
          language={language}
          accessibilityPreferences={accessibilityPreferences}
          onThemeToggle={toggleTheme}
          onLanguageChange={setLanguage}
          onAccessibilityChange={setAccessibilityPreferences}
          onReset={resetModel}
          onSave={saveSnapshot}
        />
        <Tabs activeTab={activeTab} language={language} onChange={changeTab} />
      </div>
      <div className="save-status" aria-live="polite">{saveLabel !== "Save" ? saveLabel : ""}</div>
      <main id="main-content" tabIndex={-1}>
        {activeTab === "overview" && (
          <OverviewView
            assumptions={assumptions}
            mediumProjection={mediumProjection}
            japanStats={japanStats}
            language={language}
            onNavigate={changeTab}
          />
        )}
        {activeTab === "calculator" && (
          <CalculatorView
            assumptions={assumptions}
            language={language}
            onAssumptionChange={updateAssumption}
          />
        )}
        {activeTab === "scenarios" && (
          <ScenarioView
            assumptions={assumptions}
            activeScenario={activeScenario}
            language={language}
            onScenarioChange={setActiveScenario}
            onApplyAssumptions={applyAssumptions}
          />
        )}
        {activeTab === "pilot" && (
          <PilotTaskBoard tasks={pilotTasks} language={language} onTaskChange={updateTask} />
        )}
        {activeTab === "data" && <DataConnectionView language={language} />}
        {activeTab === "about" && <AboutView language={language} />}
        {activeTab === "investor" && (
          <InvestorRoom reportText={investorReport} language={language} onNavigate={changeTab} />
        )}
      </main>
      <AppFooter
        language={language}
        onAccessibilityOpen={() => setShowAccessibilityStatement(true)}
      />
      {showAccessibilityStatement && (
        <AccessibilityStatement
          language={language}
          onClose={() => setShowAccessibilityStatement(false)}
        />
      )}
    </div>
  );
}
