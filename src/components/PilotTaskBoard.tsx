import { defaultPilotTasks } from "@/lib/defaults";
import type { Language } from "@/lib/i18n";
import type { PilotTasks } from "@/lib/types";

type PilotTaskBoardProps = {
  tasks: PilotTasks;
  language: Language;
  onTaskChange: (taskKey: string, completed: boolean) => void;
};

const pilotCopy = {
  en: {
    title: "90-day pilot operating dashboard",
    body: "What must be proven before scaling.",
    checklistTitle: "Task checklist",
    checklistBody: "Saved locally when backend is online.",
    complete: "complete",
    phases: defaultPilotTasks,
    partnerTriangle: "Partner triangle",
    partnerCards: [
      ["Design employer", "Measurable workflow data. HR and CFO sponsor."],
      ["Regulated rail partner", "Executes through existing infrastructure."],
      ["Assurance partner", "Validates method and evidence."]
    ],
    riskBoard: "Risk board",
    risks: [
      ["Measurement trust", "High", "Use rigorous method and third-party checks."],
      ["Regulatory overreach", "High", "Instructions only. No custody or advice."],
      ["Employer resistance", "Med", "Lead with retention and CFO reporting."],
      ["Copycat incumbents", "Med", "Build benchmarks and partner trust."]
    ],
    partnerRoles: "Candidate partner roles",
    roleCards: [
      ["Sompo-like insurer", "Credibility and employer access."],
      ["SoftBank-like sponsor", "AI ecosystem and pilot channels."],
      ["METI / MHLW observers", "Observer first, sponsor later."]
    ]
  },
  ja: {
    title: "90日間パイロット運用ダッシュボード",
    body: "拡大前に証明すべき事項。",
    checklistTitle: "タスクチェックリスト",
    checklistBody: "バックエンド接続時にローカル保存されます。",
    complete: "完了",
    phases: [
      {
        phase: "1-3週目: 基準値",
        tasks: [
          ["kpi-dictionary", "3-5個の測定可能な業務ワークフロー向けKPI辞書。"],
          ["privacy-pack", "プライバシーおよび労使コミュニケーション資料。"],
          ["counterfactual", "対応する対照群または反実仮想設計。"]
        ]
      },
      {
        phase: "4-8週目: 導入",
        tasks: [
          ["ai-use-cases", "雇用主ごとに1-2件のAIユースケースを導入。"],
          ["net-costs", "AIコストを把握し、効果から控除。"],
          ["dividend-file", "測定限定パイロット報告書を作成。パイロット中は拠出を実行しません。"]
        ]
      },
      {
        phase: "9-12週目: 検証",
        tasks: [
          ["assurance-sampling", "第三者によるエビデンスサンプリングを完了。"],
          ["ppd-report", "CFO、人事、労使関係者向けPPDパイロット報告書を作成。"],
          ["board-readout", "投資家およびパートナー向け報告を予定。"]
        ]
      }
    ],
    partnerTriangle: "パートナー三角形",
    partnerCards: [
      ["設計参加企業", "測定可能な業務データ。人事とCFOがスポンサー。"],
      ["規制対象レールパートナー", "既存インフラを通じて実行。"],
      ["保証パートナー", "手法とエビデンスを検証。"]
    ],
    riskBoard: "リスクボード",
    risks: [
      ["測定信頼性", "高", "厳格な手法と第三者チェックを使用。"],
      ["規制上の過剰解釈", "高", "指示のみ。資産保管や助言は行いません。"],
      ["雇用主の抵抗", "中", "定着率とCFO報告を前面に出す。"],
      ["既存企業による模倣", "中", "ベンチマークとパートナー信頼を構築。"]
    ],
    partnerRoles: "候補パートナー役割",
    roleCards: [
      ["Sompo型保険会社", "信頼性と雇用主アクセス。"],
      ["SoftBank型スポンサー", "AIエコシステムとパイロットチャネル。"],
      ["METI / MHLWオブザーバー", "まずはオブザーバー、後にスポンサー。"]
    ]
  }
} as const;

export function PilotTaskBoard({ tasks, language, onTaskChange }: PilotTaskBoardProps) {
  const copy = pilotCopy[language];
  const taskEntries = defaultPilotTasks.flatMap((phase) => phase.tasks);
  const completed = taskEntries.filter(([key]) => tasks[key] === true).length;
  const percent = taskEntries.length ? Math.round((completed / taskEntries.length) * 100) : 0;

  return (
    <div className="dashboard-grid">
      <section className="span-12 section-title">
        <div>
          <h2>{copy.title}</h2>
          <p>{copy.body}</p>
        </div>
      </section>

      <section className="span-8 panel">
        <div className="task-toolbar">
          <div>
            <h3>{copy.checklistTitle}</h3>
            <p>{copy.checklistBody}</p>
          </div>
          <div>
            <div className="kpi-label">{percent}% {copy.complete}</div>
            <div className="progress-shell">
              <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>
          </div>
        </div>
        <div className="task-grid">
          {copy.phases.map((phase) => (
            <article className="task-card" key={phase.phase}>
              <h3>{phase.phase}</h3>
              {phase.tasks.map(([key, label]) => (
                <label className="checkline" key={key}>
                  <input
                    type="checkbox"
                    checked={Boolean(tasks[key])}
                    onChange={(event) => onTaskChange(key, event.target.checked)}
                  />
                  {label}
                </label>
              ))}
            </article>
          ))}
        </div>
      </section>

      <aside className="span-4 panel">
        <h3>{copy.partnerTriangle}</h3>
        <div className="partner-grid single">
          {copy.partnerCards.map(([title, body]) => (
            <PartnerCard key={title} title={title} body={body} />
          ))}
        </div>
      </aside>

      <section className="span-6 panel">
        <h3>{copy.riskBoard}</h3>
        <div className="risk-list">
          {copy.risks.map(([title, severity, body]) => (
            <RiskRow key={title} title={title} severity={severity} body={body} />
          ))}
        </div>
      </section>

      <section className="span-6 panel">
        <h3>{copy.partnerRoles}</h3>
        <div className="partner-grid">
          {copy.roleCards.map(([title, body]) => (
            <PartnerCard key={title} title={title} body={body} />
          ))}
        </div>
      </section>
    </div>
  );
}

function PartnerCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="partner-card">
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

function RiskRow({ title, severity, body }: { title: string; severity: string; body: string }) {
  const isHigh = severity === "High" || severity === "高";

  return (
    <div className="risk-row">
      <b>{title}</b>
      <span className={`risk-badge ${isHigh ? "high" : "medium"}`}>{severity}</span>
      <p>{body}</p>
    </div>
  );
}
