import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { createDataUpload, listDataUploads } from "@/lib/db";

export const runtime = "nodejs";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const uploadDir = resolve(process.env.PPD_UPLOAD_DIR ?? "./data/uploads");
const allowedExtensions = new Set([".csv", ".txt"]);
const allowedUploadTypes = new Set([
  "workflow_metrics",
  "aggregated_hr",
  "finance_costs",
  "partner_instruction_test",
  "assurance_evidence"
]);

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

function normalizeUploadType(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "workflow_metrics";
  return allowedUploadTypes.has(value) ? value : "workflow_metrics";
}

function normalizeLimit(value: string | null) {
  const requested = Number(value ?? 20);
  if (!Number.isFinite(requested)) return 20;
  return Math.min(Math.max(Math.trunc(requested), 1), 100);
}

export async function GET(request: NextRequest) {
  const limit = normalizeLimit(request.nextUrl.searchParams.get("limit"));
  return NextResponse.json({ ok: true, uploads: listDataUploads(limit) });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const entry = formData.get("file");

    if (!entry || typeof entry === "string") {
      return NextResponse.json({ ok: false, error: "Missing upload file." }, { status: 400 });
    }

    if (entry.size === 0) {
      return NextResponse.json({ ok: false, error: "Upload file is empty." }, { status: 400 });
    }

    const extension = extname(entry.name).toLowerCase();
    if (!allowedExtensions.has(extension)) {
      return NextResponse.json(
        { ok: false, error: "Only CSV and TXT pilot exports are accepted." },
        { status: 400 }
      );
    }

    if (entry.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { ok: false, error: "File is larger than the 5 MB local pilot limit." },
        { status: 413 }
      );
    }

    const uploadType = normalizeUploadType(formData.get("uploadType"));
    const originalName = sanitizeFileName(entry.name || `pilot-upload${extension}`);
    const storedName = `${Date.now()}-${randomUUID()}-${originalName}`;
    const buffer = Buffer.from(await entry.arrayBuffer());

    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, storedName), buffer, { flag: "wx" });

    const upload = createDataUpload({
      upload_type: uploadType,
      original_name: originalName,
      stored_name: storedName,
      size_bytes: entry.size,
      status: "stored_for_review"
    });

    return NextResponse.json({ ok: true, upload }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: "Upload failed." }, { status: 500 });
  }
}
