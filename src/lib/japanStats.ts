import { listJapanStats, saveJapanStats } from "./db";
import type { JapanStatKey, JapanStatRecord } from "./types";

const STATS_BUREAU_POPULATION_URL =
  "https://www.stat.go.jp/english/data/jinsui/2024np/index.html";
const ESTAT_VITAL_STATS_URL =
  "https://www.e-stat.go.jp/en/stat-search/files?page=1&toukei=00450011";

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const defaultJapanStats: JapanStatRecord[] = [
  {
    metric_key: "population_65_share",
    value: 29.3,
    unit: "%",
    period: "Oct 1, 2024",
    source_name: "Statistics Bureau of Japan, Current Population Estimates",
    source_url: STATS_BUREAU_POPULATION_URL,
    source_date: "2024-10-01",
    fetched_at: 0,
    status: "seeded"
  },
  {
    metric_key: "population_65_count",
    value: 36243000,
    unit: "people",
    period: "Oct 1, 2024",
    source_name: "Statistics Bureau of Japan, Current Population Estimates",
    source_url: STATS_BUREAU_POPULATION_URL,
    source_date: "2024-10-01",
    fetched_at: 0,
    status: "seeded"
  },
  {
    metric_key: "births_2024",
    value: 686061,
    unit: "births",
    period: "2024",
    source_name: "MHLW Vital Statistics via e-Stat",
    source_url: ESTAT_VITAL_STATS_URL,
    source_date: "2024",
    fetched_at: 0,
    status: "seeded"
  }
];

function nowMs() {
  return Date.now();
}

function withFetchedAt(records: JapanStatRecord[], status: JapanStatRecord["status"]) {
  const fetchedAt = nowMs();
  return records.map((record) => ({ ...record, fetched_at: fetchedAt, status }));
}

function toRecordMap(records: JapanStatRecord[]) {
  return Object.fromEntries(records.map((record) => [record.metric_key, record])) as Record<
    JapanStatKey,
    JapanStatRecord
  >;
}

function isCacheFresh(records: JapanStatRecord[]) {
  if (records.length < defaultJapanStats.length) return false;
  return records.every((record) => nowMs() - record.fetched_at < CACHE_TTL_MS);
}

async function fetchStatsBureauPopulation(): Promise<JapanStatRecord[]> {
  const response = await fetch(STATS_BUREAU_POPULATION_URL, {
    headers: { Accept: "text/html" },
    signal: AbortSignal.timeout(7000)
  });

  if (!response.ok) throw new Error(`Statistics Bureau fetch failed: ${response.status}`);

  const normalized = (await response.text()).replace(/\s+/g, " ");
  const match = normalized.match(
    /population aged 65 years old and over was ([\d,]+)\s*thousand\s*\(([\d.]+)\s*percent/i
  );

  if (!match) throw new Error("Could not parse Statistics Bureau population 65+ values");

  const count = Number(match[1].replace(/,/g, "")) * 1000;
  const share = Number(match[2]);

  return [
    {
      ...defaultJapanStats[0],
      value: share,
      fetched_at: nowMs(),
      status: "refreshed"
    },
    {
      ...defaultJapanStats[1],
      value: count,
      fetched_at: nowMs(),
      status: "refreshed"
    }
  ];
}

export async function getJapanStats(refresh = false) {
  let records = listJapanStats();

  if (records.length === 0) {
    records = saveJapanStats(withFetchedAt(defaultJapanStats, "seeded"));
  }

  if (!refresh && isCacheFresh(records)) {
    return { metrics: toRecordMap(records), refreshed: false };
  }

  try {
    const populationRecords = await fetchStatsBureauPopulation();
    const existingMap = toRecordMap(records);
    const next = defaultJapanStats.map((record) => ({
      ...record,
      ...(existingMap[record.metric_key] ?? {}),
      status: "stale" as const
    }));

    const populationMap = toRecordMap(populationRecords);
    const merged = next.map((record) => populationMap[record.metric_key] ?? record);
    records = saveJapanStats(merged);

    return { metrics: toRecordMap(records), refreshed: true };
  } catch {
    const stale = records.map((record) => ({ ...record, status: "stale" as const }));
    records = saveJapanStats(stale);
    return { metrics: toRecordMap(records), refreshed: false };
  }
}
