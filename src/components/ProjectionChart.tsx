import { formatYen } from "@/lib/format";
import type { ProjectionRow } from "@/lib/types";

type ProjectionChartProps = {
  rows: ProjectionRow[];
};

export function ProjectionChart({ rows }: ProjectionChartProps) {
  const maxValue = Math.max(
    1,
    ...rows.flatMap((row) => [row.annualContribution, row.aum, row.platformRevenue])
  );
  const chartHeight = 260;
  const chartWidth = 760;
  const padding = { left: 70, right: 30, top: 20, bottom: 42 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;
  const groupWidth = plotWidth / rows.length;
  const barWidth = 28;

  const yFor = (value: number) =>
    padding.top + plotHeight - (value / (maxValue * 1.15)) * plotHeight;

  const aumPoints = rows
    .map((row, index) => {
      const x = padding.left + groupWidth * index + groupWidth / 2;
      return `${x},${yFor(row.aum)}`;
    })
    .join(" ");

  return (
    <svg className="projection-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img">
      <title>Five year projection chart</title>
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
        const annualY = yFor(row.annualContribution);
        const revenueY = yFor(row.platformRevenue);
        return (
          <g key={row.year}>
            <rect
              className="bar annual"
              x={center - barWidth - 4}
              y={annualY}
              width={barWidth}
              height={padding.top + plotHeight - annualY}
            />
            <rect
              className="bar revenue"
              x={center + 4}
              y={revenueY}
              width={barWidth}
              height={padding.top + plotHeight - revenueY}
            />
            <text x={center} y={chartHeight - 14} textAnchor="middle" className="year-label">
              {row.year}
            </text>
          </g>
        );
      })}

      <polyline className="aum-line" points={aumPoints} />
      {rows.map((row, index) => {
        const x = padding.left + groupWidth * index + groupWidth / 2;
        return <circle key={row.year} cx={x} cy={yFor(row.aum)} r="4" className="aum-dot" />;
      })}
    </svg>
  );
}

