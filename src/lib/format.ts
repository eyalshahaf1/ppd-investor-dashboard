const YEN = "\u00a5";

export function formatNumber(value: number, decimals = 0): string {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

export function formatEmployees(value: number): string {
  if (value >= 1000000) {
    return `${formatNumber(value / 1000000, value % 1000000 === 0 ? 1 : 2)}M`;
  }
  if (value >= 1000) {
    return `${formatNumber(value / 1000, value % 1000 === 0 ? 0 : 1)}k`;
  }
  return formatNumber(value);
}

export function formatYen(value: number, decimals = 1): string {
  const abs = Math.abs(value);
  if (abs >= 1000000000000) return `${YEN}${formatNumber(value / 1000000000000, decimals)}T`;
  if (abs >= 1000000000) return `${YEN}${formatNumber(value / 1000000000, decimals)}B`;
  if (abs >= 1000000) return `${YEN}${formatNumber(value / 1000000, decimals)}M`;
  if (abs >= 1000) return `${YEN}${formatNumber(value / 1000, decimals)}k`;
  return `${YEN}${formatNumber(value, 0)}`;
}

