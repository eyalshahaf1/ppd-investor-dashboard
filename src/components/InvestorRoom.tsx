import type { Language } from "@/lib/i18n";
import type { DashboardTab } from "./Tabs";

type InvestorRoomProps = {
  reportText: string;
  language: Language;
  onNavigate: (tab: DashboardTab) => void;
};

const investorCopy = {
  en: {
    title: "Best-practice investor demonstration",
    body:
      "Run this app like a proof of operating discipline. The point is not to dazzle with big TAM; it is to show that the model survives scrutiny.",
    modeTitle: "Investor demo mode",
    modeBody:
      "A guided path for live meetings: open the story, stress-test the math, show customer data discipline, then close with the partner execution room.",
    nav: ["1. Overview", "2. Verified Ledger", "3. Partner Execution", "Export report"],
    sequenceTitle: "Recommended demo sequence",
    steps: [
      ["Open with the wedge", "We are not replacing Japan's pension system. Measurement is the product; pension value is the outcome."],
      ["Show the operating flow", "Walk left to right: AI workflow, verified gain, dividend rule, regulated rails, impact reporting."],
      ["Stress-test the ledger live", "Change O, S, Q, M, AI costs, or the evidence adjustment rate, then show that no verified gain means no pension allocation."],
      ["Separate value buckets", "Repeat that retirement value is worker value. Startup revenue is SaaS, verification, setup, and contribution-instruction reconciliation fees."],
      ["Make risk feel managed", "Show the risk board and emphasize measurement integrity, privacy, anti-layoff guardrails, and regulated partner execution."],
      ["Close with the partner triangle", "Ask for a 90-day measurement-only pilot: 1 operating employer, 1 benefits / pension rail partner, and 1 assurance partner. No pension contribution is routed during the measurement pilot."]
    ],
    doAvoidTitle: "Do and avoid",
    doTitle: "Do",
    doBody:
      "Use conservative assumptions, show formulas, invite challenge, name the regulated partners, and keep policy upside as optionality.",
    avoidTitle: "Avoid",
    avoidBody:
      "Do not imply custody, guaranteed returns, investment advice, national legislation dependency, pension reform, a new tax, or that layoff savings count as eligible gains.",
    closeTitle: "Investor close",
    closeBody:
      "Production begins only after verification, CFO reconciliation, quality review, and rail-partner confirmation."
  },
  ja: {
    title: "投資家向けデモの推奨進行",
    body:
      "このアプリは運用規律の証明として見せます。大きな市場規模で驚かせることではなく、モデルが精査に耐えることを示すのが目的です。",
    modeTitle: "投資家デモモード",
    modeBody:
      "ライブ面談用の進行です。ストーリーを開き、計算を検証し、顧客データ管理を示し、最後にパートナー実行ルームで締めます。",
    nav: ["1. 概要", "2. 検証台帳", "3. パートナー実行", "レポート出力"],
    sequenceTitle: "推奨デモ手順",
    steps: [
      ["切り口を明確にする", "日本の年金制度を置き換えるものではありません。測定がプロダクトであり、年金価値が成果です。"],
      ["運用フローを示す", "左から右へ、AI業務、検証済み効果、配分ルール、規制対象レール、インパクト報告を説明します。"],
      ["台帳をライブで検証する", "O、S、Q、M、AIコスト、エビデンス調整率を変更し、検証済み効果がなければ年金配分もないことを示します。"],
      ["価値の箱を分ける", "退職価値は従業員価値です。スタートアップ収益はSaaS、検証、初期設定、拠出指示・照合フィーです。"],
      ["リスク管理を見せる", "リスクボードを示し、測定の完全性、プライバシー、人員削減除外、規制対象パートナー実行を強調します。"],
      ["パートナー三角形で締める", "90日間の測定限定パイロットを依頼します。運用企業1社、福利厚生・年金レールパートナー1社、保証パートナー1社。測定パイロット中は年金拠出を実行しません。"]
    ],
    doAvoidTitle: "推奨事項と避ける表現",
    doTitle: "推奨",
    doBody:
      "保守的な前提を使い、数式を見せ、反論を歓迎し、規制対象パートナーを明示し、政策面の上振れは任意性として扱います。",
    avoidTitle: "避ける",
    avoidBody:
      "資産保管、保証リターン、投資助言、国の法改正依存、年金改革、新税、人員削減節減を適格利益に含めることを示唆しません。",
    closeTitle: "投資家向けクロージング",
    closeBody:
      "本番運用は、検証、CFO照合、品質レビュー、レールパートナー確認の後にのみ開始します。"
  }
} as const;

export function InvestorRoom({ reportText, language, onNavigate }: InvestorRoomProps) {
  const copy = investorCopy[language];

  const reportHref = `data:text/markdown;charset=utf-8,${encodeURIComponent(reportText)}`;

  return (
    <div className="dashboard-grid">
      <section className="span-12 section-title">
        <div>
          <h2>{copy.title}</h2>
          <p>{copy.body}</p>
        </div>
      </section>

      <section className="span-12 panel investor-console">
        <div>
          <h3>{copy.modeTitle}</h3>
          <p>{copy.modeBody}</p>
        </div>
        <div className="investor-actions">
          <button className="action-btn" type="button" onClick={() => onNavigate("overview")}>
            {copy.nav[0]}
          </button>
          <button className="action-btn" type="button" onClick={() => onNavigate("calculator")}>
            {copy.nav[1]}
          </button>
          <button className="action-btn" type="button" onClick={() => onNavigate("data")}>
            {copy.nav[2]}
          </button>
          <a className="action-btn primary" download="ppd-investor-demo-snapshot.md" href={reportHref}>
            {copy.nav[3]}
          </a>
        </div>
      </section>

      <section className="span-7 panel">
        <h3>{copy.sequenceTitle}</h3>
        <div className="demo-grid">
          {copy.steps.map(([title, body], index) => (
            <article className="demo-step" key={title}>
              <div className="num">{index + 1}</div>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="span-5 panel">
        <h3>{copy.doAvoidTitle}</h3>
        <div className="callout positive">
          <h3>{copy.doTitle}</h3>
          <p>{copy.doBody}</p>
        </div>
        <div className="callout">
          <h3>{copy.avoidTitle}</h3>
          <p>{copy.avoidBody}</p>
        </div>
        <div className="plain-note">
          <h3>{copy.closeTitle}</h3>
          <p>{copy.closeBody}</p>
        </div>
      </aside>
    </div>
  );
}
