"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateEvidenceReview } from "@/lib/calculations";
import {
  defaultAssumptions,
  defaultEmployerPolicy,
  defaultEvidenceItems,
  defaultFinanceDecision,
  defaultQualityGates,
  defaultWorkflowDefinition
} from "@/lib/defaults";
import {
  accessibilityStorageKey,
  defaultAccessibilityPreferences,
  normalizeAccessibilityPreferences,
  type AccessibilityPreferences
} from "@/lib/accessibility";
import { getCopy, type Language } from "@/lib/i18n";
import type {
  EmployerPolicy,
  EvidenceItem,
  FinanceDecision,
  QualityGateStatus,
  WorkflowDefinition
} from "@/lib/types";
import { AboutView } from "./AboutView";
import { AccessibilityStatement } from "./AccessibilityStatement";
import { AppFooter } from "./AppFooter";
import { CookieConsent } from "./CookieConsent";
import { EvidenceWorkflowView } from "./EvidenceWorkflowView";
import type { DashboardTab } from "./Tabs";
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
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [backendOnline, setBackendOnline] = useState(false);
  const [saveLabel, setSaveLabel] = useState("Save");
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [language, setLanguage] = useState<Language>("en");
  const [accessibilityPreferences, setAccessibilityPreferences] =
    useState<AccessibilityPreferences>(defaultAccessibilityPreferences);
  const [showAccessibilityStatement, setShowAccessibilityStatement] = useState(false);
  const t = getCopy(language);

  const [workflow, setWorkflow] = useState<WorkflowDefinition>(defaultWorkflowDefinition);
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>(defaultEvidenceItems);
  const [qualityGates, setQualityGates] = useState(defaultQualityGates);
  const [evidenceAdjustmentRate, setEvidenceAdjustmentRate] = useState(10);
  const [financeDecision, setFinanceDecision] = useState<FinanceDecision>(defaultFinanceDecision);
  const [employerPolicy, setEmployerPolicy] = useState<EmployerPolicy>(defaultEmployerPolicy);
  const evidenceReview = useMemo(
    () => calculateEvidenceReview(evidenceItems, qualityGates, evidenceAdjustmentRate),
    [evidenceItems, qualityGates, evidenceAdjustmentRate]
  );

  useEffect(() => {
    async function loadBackendState() {
      try {
        await apiGet<{ service: string }>("/api/health");
        setBackendOnline(true);

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

  async function saveSnapshot() {
    if (!backendOnline) {
      setSaveLabel("Demo data mode");
      setTimeout(() => setSaveLabel("Save"), 1200);
      return;
    }

    try {
      await apiPost("/api/snapshots", {
        name: `Evidence decision snapshot - ${new Date().toISOString()}`,
        assumptions: defaultAssumptions,
        outputs: { workflow, evidenceItems, qualityGates, evidenceReview, financeDecision, employerPolicy }
      });
      setSaveLabel("Saved");
    } catch {
      setSaveLabel("Error");
    } finally {
      setTimeout(() => setSaveLabel("Save"), 1200);
    }
  }

  function resetModel() {
    setWorkflow(defaultWorkflowDefinition);
    setEvidenceItems(defaultEvidenceItems);
    setQualityGates(defaultQualityGates);
    setEvidenceAdjustmentRate(10);
    setFinanceDecision(defaultFinanceDecision);
    setEmployerPolicy(defaultEmployerPolicy);
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
          activeTab={activeTab}
          backendOnline={backendOnline}
          themeMode={themeMode}
          language={language}
          accessibilityPreferences={accessibilityPreferences}
          onThemeToggle={toggleTheme}
          onLanguageChange={setLanguage}
          onAccessibilityChange={setAccessibilityPreferences}
          onNavigate={changeTab}
          onReset={resetModel}
          onSave={saveSnapshot}
        />
        <Tabs activeTab={activeTab} language={language} onChange={changeTab} />
      </div>
      <aside className="prototype-notice" aria-label={t.prototypeNotice.title}>
        <strong>{t.prototypeNotice.title}</strong>
        <p>{t.prototypeNotice.body}</p>
      </aside>
      <div className="save-status" aria-live="polite">{saveLabel !== "Save" ? saveLabel : ""}</div>
      <main id="main-content" tabIndex={-1}>
        {activeTab !== "about" && <EvidenceWorkflowView
          activeTab={activeTab}
          workflow={workflow}
          evidenceItems={evidenceItems}
          qualityGates={qualityGates}
          evidenceAdjustmentRate={evidenceAdjustmentRate}
          review={evidenceReview}
          financeDecision={financeDecision}
          employerPolicy={employerPolicy}
          language={language}
          onWorkflowChange={(key, value) => setWorkflow((current) => ({ ...current, [key]: value }))}
          onEvidenceAmountChange={(id, amountJpy) => setEvidenceItems((items) => items.map((item) => item.id === id ? { ...item, amountJpy } : item))}
          onQualityGateChange={(id, status: QualityGateStatus) => setQualityGates((gates) => gates.map((gate) => gate.id === id ? { ...gate, status } : gate))}
          onAdjustmentChange={setEvidenceAdjustmentRate}
          onFinanceChange={(key, value) => setFinanceDecision((current) => ({ ...current, [key]: value }))}
          onPolicyChange={(key, value) => setEmployerPolicy((current) => ({ ...current, [key]: value }))}
          onNavigate={changeTab}
        />}
        {activeTab === "about" && <AboutView language={language} />}
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
      <CookieConsent language={language} />
    </div>
  );
}
