import { getCopy, type Language } from "@/lib/i18n";

export type DashboardTab =
  | "overview"
  | "calculator"
  | "scenarios"
  | "pilot"
  | "data"
  | "about"
  | "investor";

const tabs: Array<{ key: DashboardTab }> = [
  { key: "overview" },
  { key: "calculator" },
  { key: "scenarios" },
  { key: "pilot" },
  { key: "data" },
  { key: "about" },
  { key: "investor" }
];

type TabsProps = {
  activeTab: DashboardTab;
  language: Language;
  onChange: (tab: DashboardTab) => void;
};

export function Tabs({ activeTab, language, onChange }: TabsProps) {
  const t = getCopy(language);

  return (
    <div className="tabs-wrap">
      <nav className="tabs" aria-label="Dashboard views">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className="tab-btn"
            data-tab={tab.key}
            aria-selected={activeTab === tab.key}
            onClick={() => onChange(tab.key)}
          >
            {t.tabs[tab.key]}
          </button>
        ))}
      </nav>
    </div>
  );
}
