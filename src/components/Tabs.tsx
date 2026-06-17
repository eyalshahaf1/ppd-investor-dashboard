export type DashboardTab = "overview" | "calculator" | "scenarios" | "pilot" | "investor";

const tabs: Array<{ key: DashboardTab; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "calculator", label: "Calculator" },
  { key: "scenarios", label: "Scenarios" },
  { key: "pilot", label: "Pilot Tasks" },
  { key: "investor", label: "Investor Room" }
];

type TabsProps = {
  activeTab: DashboardTab;
  onChange: (tab: DashboardTab) => void;
};

export function Tabs({ activeTab, onChange }: TabsProps) {
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
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
