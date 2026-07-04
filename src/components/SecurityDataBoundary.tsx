import { getCopy, type Language } from "@/lib/i18n";

type SecurityDataBoundaryProps = {
  language: Language;
};

export function SecurityDataBoundary({ language }: SecurityDataBoundaryProps) {
  const copy = getCopy(language).securityBoundary;

  return (
    <section className="span-12 panel security-boundary">
      <div className="security-boundary-head">
        <div>
          <p>{copy.eyebrow}</p>
          <h3>{copy.title}</h3>
        </div>
        <span>{copy.status}</span>
      </div>
      <p>{copy.body}</p>

      <div className="security-boundary-grid">
        {copy.cards.map((card) => (
          <article className="security-boundary-card" key={card[0]}>
            <span>{card[0]}</span>
            <h4>{card[1]}</h4>
            <p>{card[2]}</p>
          </article>
        ))}
      </div>

      <div className="security-boundary-note">
        <b>{copy.noteTitle}</b>
        <p>{copy.noteBody}</p>
      </div>
    </section>
  );
}
