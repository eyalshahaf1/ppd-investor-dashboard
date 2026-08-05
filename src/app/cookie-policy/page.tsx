import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | TOMO PENSION",
  description:
    "Cookie and local storage policy for the TOMO PENSION public website and interactive demo."
};

export default function CookiePolicyPage() {
  return (
    <main className="policy-page">
      <section className="policy-card">
        <p className="policy-eyebrow">TOMO PENSION</p>
        <a className="policy-return" href="/">← Return to website</a>
        <h1>Cookie Policy</h1>
        <p>
          This website and interactive demo use essential local storage to remember
          language, theme, accessibility, cookie preference, and demo settings.
        </p>

        <h2>Analytics</h2>
        <p>
          Google Analytics is optional. Analytics is only enabled after a visitor
          chooses to allow analytics in the cookie banner. Until then, analytics
          storage is denied.
        </p>

        <h2>What we do not use</h2>
        <p>
          We do not use advertising cookies, remarketing pixels, or behavioural
          advertising tools. We do not sell personal data.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about cookies or privacy can be sent to{" "}
          <a href="mailto:info@tomopension.com">info@tomopension.com</a>.
        </p>

        <p className="policy-updated">Last updated: July 2026</p>

        <hr className="policy-divider" />

        <p className="policy-eyebrow">TOMO PENSION</p>
        <a className="policy-return" href="/">← サイトに戻る</a>
        <h1>Cookieポリシー</h1>
        <p>
          このウェブサイトおよびインタラクティブデモでは、言語、テーマ、
          アクセシビリティ設定、Cookieの選択、デモ設定を保存するために、
          必要最小限のローカルストレージを使用します。
        </p>

        <h2>アクセス解析</h2>
        <p>
          Google Analyticsは任意です。Cookieバナーでアクセス解析を許可した
          場合にのみ有効になります。それまでは、アクセス解析用の保存は
          無効化されています。
        </p>

        <h2>使用しないもの</h2>
        <p>
          広告Cookie、リマーケティングピクセル、行動ターゲティング広告
          ツールは使用しません。個人データを販売することはありません。
        </p>

        <h2>お問い合わせ</h2>
        <p>
          Cookieまたはプライバシーに関するお問い合わせは{" "}
          <a href="mailto:info@tomopension.com">info@tomopension.com</a>{" "}
          までお送りください。
        </p>

        <p className="policy-updated">最終更新: 2026年7月</p>
      </section>
    </main>
  );
}
