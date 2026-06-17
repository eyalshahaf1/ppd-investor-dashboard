#!/usr/bin/env python3
"""
Local lightweight backend for the Pension from AI Productivity dashboard.

No external packages are required. It serves index.html, exposes a small JSON
API, and stores demo data in SQLite.
"""

from __future__ import annotations

import argparse
import json
import mimetypes
import sqlite3
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse


APP_DIR = Path(__file__).resolve().parent
DATA_DIR = APP_DIR / "data"
DB_PATH = DATA_DIR / "ppd_demo.sqlite3"


DEFAULT_ASSUMPTIONS = {
    "coveredEmployees": 10000,
    "employers": 1,
    "gainPerEmployee": 1200000,
    "dividendRate": 5,
    "confidence": 100,
    "annualReturn": 3,
    "setupFeeM": 20,
    "monthlySaas": 500,
    "takeRate": 0.5,
    "auditFeeM": 2,
    "grossMargin": 70,
    "implementationCostM": 15,
    "cacM": 25,
    "retentionYears": 5,
    "hoursSaved": 1600000,
    "costPerHour": 5500,
    "overtimeM": 2400,
    "outsourcingM": 1200,
    "qualityM": 900,
    "aiCostM": 1300,
}

DEFAULT_CUSTOMERS = [
    (
        "demo-insurance-ops",
        "Demo Insurance Operations",
        "pilot",
        "claims, call-center wrap-up, invoice processing",
        "CSV/SFTP pilot export",
        "regulated partner pending",
    )
]


def now_ms() -> int:
    return int(time.time() * 1000)


def get_db() -> sqlite3.Connection:
    DATA_DIR.mkdir(exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with get_db() as conn:
        conn.executescript(
            """
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
            """
        )

        existing = conn.execute("select value from settings where key = 'assumptions'").fetchone()
        if not existing:
            conn.execute(
                "insert into settings (key, value, updated_at) values (?, ?, ?)",
                ("assumptions", json.dumps(DEFAULT_ASSUMPTIONS), now_ms()),
            )

        count = conn.execute("select count(*) as c from customers").fetchone()["c"]
        if count == 0:
            conn.executemany(
                """
                insert into customers
                  (customer_id, name, status, workflows, data_connection, rail_partner, updated_at)
                values (?, ?, ?, ?, ?, ?, ?)
                """,
                [row + (now_ms(),) for row in DEFAULT_CUSTOMERS],
            )


def json_response(handler: BaseHTTPRequestHandler, payload: object, status: int = 200) -> None:
    body = json.dumps(payload, indent=2).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.send_header("Cache-Control", "no-store")
    handler.end_headers()
    handler.wfile.write(body)


def error_response(handler: BaseHTTPRequestHandler, message: str, status: int = 400) -> None:
    json_response(handler, {"ok": False, "error": message}, status)


def read_json(handler: BaseHTTPRequestHandler) -> dict:
    length = int(handler.headers.get("Content-Length", "0"))
    if length <= 0:
        return {}
    raw = handler.rfile.read(length).decode("utf-8")
    return json.loads(raw)


def get_assumptions() -> dict:
    with get_db() as conn:
        row = conn.execute("select value from settings where key = 'assumptions'").fetchone()
    if not row:
        return dict(DEFAULT_ASSUMPTIONS)
    return json.loads(row["value"])


def set_assumptions(payload: dict) -> dict:
    assumptions = dict(DEFAULT_ASSUMPTIONS)
    for key, value in payload.items():
        if key in assumptions and isinstance(value, (int, float)):
            assumptions[key] = value
    with get_db() as conn:
        conn.execute(
            """
            insert into settings (key, value, updated_at) values (?, ?, ?)
            on conflict(key) do update set value = excluded.value, updated_at = excluded.updated_at
            """,
            ("assumptions", json.dumps(assumptions), now_ms()),
        )
    return assumptions


def get_tasks() -> dict:
    with get_db() as conn:
        rows = conn.execute("select task_key, completed from pilot_tasks order by task_key").fetchall()
    return {row["task_key"]: bool(row["completed"]) for row in rows}


def set_tasks(payload: dict) -> dict:
    with get_db() as conn:
        for key, completed in payload.items():
            if not isinstance(key, str):
                continue
            conn.execute(
                """
                insert into pilot_tasks (task_key, completed, updated_at) values (?, ?, ?)
                on conflict(task_key) do update set
                  completed = excluded.completed,
                  updated_at = excluded.updated_at
                """,
                (key, 1 if completed else 0, now_ms()),
            )
    return get_tasks()


def list_customers() -> list[dict]:
    with get_db() as conn:
        rows = conn.execute(
            """
            select customer_id, name, status, workflows, data_connection, rail_partner, updated_at
            from customers
            order by name
            """
        ).fetchall()
    return [dict(row) for row in rows]


def save_snapshot(payload: dict) -> dict:
    name = str(payload.get("name") or "Dashboard snapshot")
    assumptions = payload.get("assumptions")
    outputs = payload.get("outputs")
    if not isinstance(assumptions, dict) or not isinstance(outputs, dict):
        raise ValueError("snapshot requires assumptions and outputs objects")
    with get_db() as conn:
        cur = conn.execute(
            """
            insert into calculation_snapshots (name, assumptions_json, outputs_json, created_at)
            values (?, ?, ?, ?)
            """,
            (name, json.dumps(assumptions), json.dumps(outputs), now_ms()),
        )
        snapshot_id = cur.lastrowid
    return {"id": snapshot_id, "name": name}


def list_snapshots(limit: int = 20) -> list[dict]:
    with get_db() as conn:
        rows = conn.execute(
            """
            select id, name, assumptions_json, outputs_json, created_at
            from calculation_snapshots
            order by id desc
            limit ?
            """,
            (limit,),
        ).fetchall()
    return [
        {
            "id": row["id"],
            "name": row["name"],
            "assumptions": json.loads(row["assumptions_json"]),
            "outputs": json.loads(row["outputs_json"]),
            "created_at": row["created_at"],
        }
        for row in rows
    ]


class PPDHandler(BaseHTTPRequestHandler):
    server_version = "PPDLocalBackend/0.1"

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/api/health":
            json_response(self, {"ok": True, "service": "ppd-local-backend", "db": str(DB_PATH)})
            return
        if path == "/api/assumptions":
            json_response(self, {"ok": True, "assumptions": get_assumptions()})
            return
        if path == "/api/tasks":
            json_response(self, {"ok": True, "tasks": get_tasks()})
            return
        if path == "/api/customers":
            json_response(self, {"ok": True, "customers": list_customers()})
            return
        if path == "/api/snapshots":
            params = parse_qs(parsed.query)
            limit = int(params.get("limit", ["20"])[0])
            json_response(self, {"ok": True, "snapshots": list_snapshots(limit)})
            return

        self.serve_static(path)

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        try:
            payload = read_json(self)
            if parsed.path == "/api/assumptions":
                json_response(self, {"ok": True, "assumptions": set_assumptions(payload)})
                return
            if parsed.path == "/api/tasks":
                json_response(self, {"ok": True, "tasks": set_tasks(payload)})
                return
            if parsed.path == "/api/snapshots":
                json_response(self, {"ok": True, "snapshot": save_snapshot(payload)}, 201)
                return
            error_response(self, f"unknown endpoint: {parsed.path}", 404)
        except json.JSONDecodeError:
            error_response(self, "invalid JSON", 400)
        except ValueError as exc:
            error_response(self, str(exc), 400)
        except Exception as exc:  # noqa: BLE001 - local demo server should return JSON errors.
            error_response(self, f"server error: {exc}", 500)

    def serve_static(self, path: str) -> None:
        if path in ("", "/"):
            rel_path = "index.html"
        else:
            rel_path = path.lstrip("/")

        requested = (APP_DIR / rel_path).resolve()
        if not str(requested).startswith(str(APP_DIR)) or not requested.is_file():
            self.send_error(404, "File not found")
            return

        content_type = mimetypes.guess_type(str(requested))[0] or "application/octet-stream"
        data = requested.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, fmt: str, *args: object) -> None:
        print(f"{self.address_string()} - {fmt % args}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Run the local PPD dashboard backend.")
    parser.add_argument("--host", default="127.0.0.1", help="host to bind, default: 127.0.0.1")
    parser.add_argument("--port", type=int, default=8765, help="port to bind, default: 8765")
    args = parser.parse_args()

    init_db()
    server = ThreadingHTTPServer((args.host, args.port), PPDHandler)
    print(f"PPD dashboard running at http://{args.host}:{args.port}")
    print(f"SQLite database: {DB_PATH}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
