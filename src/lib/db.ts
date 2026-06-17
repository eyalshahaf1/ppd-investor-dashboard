import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { defaultAssumptions } from "./defaults";
import type { Assumptions, CustomerConnection, PilotTasks, SnapshotPayload } from "./types";

type DbRow<T> = T & Record<string, unknown>;

const dbPath = resolve(process.env.PPD_DB_PATH ?? "./data/ppd_next.sqlite3");

let db: Database.Database | null = null;

function getDb() {
  if (!db) {
    mkdirSync(dirname(dbPath), { recursive: true });
    db = new Database(dbPath);
    db.pragma("journal_mode = WAL");
    initializeDb(db);
  }
  return db;
}

function nowMs() {
  return Date.now();
}

function initializeDb(database: Database.Database) {
  database.exec(`
    create table if not exists settings (
      key text primary key,
      value text not null,
      updated_at integer not null
    );

    create table if not exists pilot_tasks (
      task_key text primary key,
      completed integer not null default 0,
      updated_at integer not null
    );

    create table if not exists calculation_snapshots (
      id integer primary key autoincrement,
      name text not null,
      assumptions_json text not null,
      outputs_json text not null,
      created_at integer not null
    );

    create table if not exists customers (
      customer_id text primary key,
      name text not null,
      status text not null,
      workflows text not null,
      data_connection text not null,
      rail_partner text not null,
      updated_at integer not null
    );
  `);

  const settingsCount = database
    .prepare("select count(*) as count from settings where key = 'assumptions'")
    .get() as DbRow<{ count: number }>;

  if (settingsCount.count === 0) {
    database
      .prepare("insert into settings (key, value, updated_at) values (?, ?, ?)")
      .run("assumptions", JSON.stringify(defaultAssumptions), nowMs());
  }

  const customerCount = database
    .prepare("select count(*) as count from customers")
    .get() as DbRow<{ count: number }>;

  if (customerCount.count === 0) {
    database
      .prepare(
        `insert into customers
          (customer_id, name, status, workflows, data_connection, rail_partner, updated_at)
         values (?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        "demo-insurance-ops",
        "Demo Insurance Operations",
        "pilot",
        "claims, call-center wrap-up, invoice processing",
        "CSV/SFTP pilot export",
        "regulated partner pending",
        nowMs()
      );
  }
}

export function getDbPath() {
  return dbPath;
}

export function getStoredAssumptions(): Assumptions {
  const row = getDb()
    .prepare("select value from settings where key = 'assumptions'")
    .get() as DbRow<{ value: string }> | undefined;

  if (!row) return defaultAssumptions;
  return { ...defaultAssumptions, ...JSON.parse(row.value) };
}

export function saveAssumptions(payload: Partial<Assumptions>): Assumptions {
  const next = { ...defaultAssumptions };
  for (const [key, value] of Object.entries(payload)) {
    if (key in next && typeof value === "number" && Number.isFinite(value)) {
      next[key as keyof Assumptions] = value;
    }
  }

  getDb()
    .prepare(
      `insert into settings (key, value, updated_at) values (?, ?, ?)
       on conflict(key) do update set
         value = excluded.value,
         updated_at = excluded.updated_at`
    )
    .run("assumptions", JSON.stringify(next), nowMs());

  return next;
}

export function getPilotTasks(): PilotTasks {
  const rows = getDb()
    .prepare("select task_key, completed from pilot_tasks order by task_key")
    .all() as DbRow<{ task_key: string; completed: number }>[];

  return Object.fromEntries(rows.map((row) => [row.task_key, Boolean(row.completed)]));
}

export function savePilotTasks(tasks: PilotTasks): PilotTasks {
  const statement = getDb().prepare(
    `insert into pilot_tasks (task_key, completed, updated_at) values (?, ?, ?)
     on conflict(task_key) do update set
       completed = excluded.completed,
       updated_at = excluded.updated_at`
  );

  const write = getDb().transaction((payload: PilotTasks) => {
    for (const [key, completed] of Object.entries(payload)) {
      statement.run(key, completed ? 1 : 0, nowMs());
    }
  });

  write(tasks);
  return getPilotTasks();
}

export function listCustomers(): CustomerConnection[] {
  return getDb()
    .prepare(
      `select customer_id, name, status, workflows, data_connection, rail_partner, updated_at
       from customers
       order by name`
    )
    .all() as CustomerConnection[];
}

export function createSnapshot(payload: SnapshotPayload) {
  const result = getDb()
    .prepare(
      `insert into calculation_snapshots
        (name, assumptions_json, outputs_json, created_at)
       values (?, ?, ?, ?)`
    )
    .run(
      payload.name,
      JSON.stringify(payload.assumptions),
      JSON.stringify(payload.outputs),
      nowMs()
    );

  return { id: Number(result.lastInsertRowid), name: payload.name };
}

export function listSnapshots(limit = 20) {
  const rows = getDb()
    .prepare(
      `select id, name, assumptions_json, outputs_json, created_at
       from calculation_snapshots
       order by id desc
       limit ?`
    )
    .all(limit) as DbRow<{
    id: number;
    name: string;
    assumptions_json: string;
    outputs_json: string;
    created_at: number;
  }>[];

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    assumptions: JSON.parse(row.assumptions_json),
    outputs: JSON.parse(row.outputs_json),
    created_at: row.created_at
  }));
}

