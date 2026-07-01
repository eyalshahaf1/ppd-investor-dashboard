import { formatYen } from "@/lib/format";

export type ImpactHorizonRow = {
  label: string;
  contribution: number;
  platformRevenue: number;
  trackedValue: number;
};

type ImpactHorizonChartProps = {
  rows: ImpactHorizonRow[];
};

export function ImpactHorizonChart({ rows }: ImpactHorizonChartProps) {
  const maxValue = Math.max(
    1,
    ...rows.flatMap((row) => [row.contribution, row.platformRevenue, row.trackedValue])
  );
  const chartHeight = 260;
  const chartWidth = 760;
  const padding = { left: 70, right: 30, top: 20, bottom: 46 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;
  const groupWidth = plotWidth / rows.length;
  const barWidth = rows.length > 4 ? 24 : 30;

  const yFor = (value: number) =>
    padding.top + plotHeight - (value / (maxValue * 1.15)) * plotHeight;

  const trackedPoints = rows
    .map((row, index) => {
      const x = padding.left + groupWidth * index + groupWidth / 2;
      return `${x},${yFor(row.trackedValue)}`;
    })
    .join(" ");

  return (
    <svg className="projection-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img">
      <title>Impact horizon chart</title>
      {[0, 1, 2, 3, 4].map((step) => {
        const y = padding.top + (plotHeight * step) / 4;
        const label = formatYen(maxValue * (1 - step / 4));
        return (
          <g key={step}>
            <line x1={padding.left} x2={chartWidth - padding.right} y1={y} y2={y} />
            <text x={padding.left - 8} y={y + 4} textAnchor="end">
              {label}
            </text>
          </g>
        );
      })}

      {rows.map((row, index) => {
        const center = padding.left + groupWidth * index + groupWidth / 2;
        const contributionY = yFor(row.contribution);
        const revenueY = yFor(row.platformRevenue);
        return (
          <g key={row.label}>
            <rect
              className="bar annual"
              x={center - barWidth - 4}
              y={contributionY}
              width={barWidth}
              height={padding.top + plotHeight - contributionY}
            />
            <rect
              className="bar revenue"
              x={center + 4}
              y={revenueY}
              width={barWidth}
              height={padding.top + plotHeight - revenueY}
            />
            <text x={center} y={chartHeight - 16} textAnchor="middle" className="year-label">
              {row.label}
            </text>
          </g>
        );
      })}

      <polyline className="aum-line" points={trackedPoints} />
      {rows.map((row, index) => {
        const x = padding.left + groupWidth * index + groupWidth / 2;
        return <circle key={row.label} cx={x} cy={yFor(row.trackedValue)} r="4" className="aum-dot" />;
      })}
    </svg>
  );
}
