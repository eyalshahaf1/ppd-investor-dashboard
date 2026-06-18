type KpiCardProps = {
  label: string;
  value: string;
  note: string;
  accent?: "teal" | "coral" | "amber" | "indigo" | "blue";
};

export function KpiCard({ label, value, note, accent = "teal" }: KpiCardProps) {
  return (
    <article className={`kpi-card accent-${accent}`} title={note}>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      <p className="kpi-note">{note}</p>
    </article>
  );
}
