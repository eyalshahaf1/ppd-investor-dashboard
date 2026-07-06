import { getCopy, type Language } from "@/lib/i18n";
import { dashboardNavigation, type DashboardTab } from "@/lib/dashboard-navigation";

export type { DashboardTab };

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
        {dashboardNavigation.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className="tab-btn"
            data-tab={tab.key}
            aria-selected={activeTab === tab.key}
            aria-label={t.tabs[tab.key]}
            onClick={() => onChange(tab.key)}
          >
            <span className="tab-label-full">{t.tabs[tab.key]}</span>
            <span className="tab-label-mobile">{t.mobileTabs[tab.key]}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
