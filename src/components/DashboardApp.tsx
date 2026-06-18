"use client";

import { useEffect, useMemo, useState } from "react";
import {
  calculateOperationalGain,
  getDashboardSnapshot,
  projectScenario
} from "@/lib/calculations";
import { defaultAssumptions, scenarios } from "@/lib/defaults";
import { formatYen } from "@/lib/format";
import type { Language } from "@/lib/i18n";
import { generateInvestorReport } from "@/lib/productFeatures";
import type { Assumptions, JapanStatKey, JapanStatRecord, PilotTasks, ScenarioKey } from "@/lib/types";
import { AboutView } from "./AboutView";
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
    document.documentElement.dataset.theme = themeMode;
    window.localStorage.setItem("ppd-theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("ppd-language", language);
  }, [language]);

  async function persistAssumptions(nextAssumptions: Assumptions) {
    if (!backendOnline) return;
    try {
      await apiPost<{ assumptions: Assumptions }>("/api/assumptions", nextAssumptions);
    } catch {
      setBackendOnline(false);
    }
  }

  function updateAssumption(key: keyof Assumptions, value: number) {
    const next = { ...assumptions, [key]: value };
    setAssumptions(next);
    persistAssumptions(next);
  }

  function applyAssumptions(nextAssumptions: Assumptions) {
    setAssumptions(nextAssumptions);
    persistAssumptions(nextAssumptions);
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

  function applyOperationalGain() {
    const operational = calculateOperationalGain(assumptions);
    updateAssumption("gainPerEmployee", Math.round(operational.perEmployee / 10000) * 10000);
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
      <div className="app-chrome">
        <TopBar
          activeScenario={activeScenario}
          y5Flow={y5Flow}
          backendOnline={backendOnline}
          themeMode={themeMode}
          language={language}
          onThemeToggle={toggleTheme}
          onLanguageChange={setLanguage}
          onReset={resetModel}
          onSave={saveSnapshot}
        />
        <Tabs activeTab={activeTab} language={language} onChange={changeTab} />
      </div>
      <div className="save-status" aria-live="polite">{saveLabel !== "Save" ? saveLabel : ""}</div>
      <main>
        {activeTab === "overview" && (
          <OverviewView
            assumptions={assumptions}
            mediumProjection={mediumProjection}
            japanStats={japanStats}
            language={language}
          />
        )}
        {activeTab === "calculator" && (
          <CalculatorView
            assumptions={assumptions}
            language={language}
            onAssumptionChange={updateAssumption}
            onApplyOperationalGain={applyOperationalGain}
          />
        )}
        {activeTab === "scenarios" && (
          <ScenarioView
            assumptions={assumptions}
            activeScenario={activeScenario}
            onScenarioChange={setActiveScenario}
            onApplyAssumptions={applyAssumptions}
          />
        )}
        {activeTab === "pilot" && (
          <PilotTaskBoard tasks={pilotTasks} onTaskChange={updateTask} />
        )}
        {activeTab === "data" && <DataConnectionView />}
        {activeTab === "about" && <AboutView language={language} />}
        {activeTab === "investor" && (
          <InvestorRoom reportText={investorReport} onNavigate={changeTab} />
        )}
      </main>
      <AppFooter language={language} />
    </div>
  );
}
