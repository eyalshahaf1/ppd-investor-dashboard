import { NextRequest, NextResponse } from "next/server";
import { createSnapshot, listSnapshots } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const limit = Number(request.nextUrl.searchParams.get("limit") ?? 20);
  return NextResponse.json({ ok: true, snapshots: listSnapshots(limit) });
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  return NextResponse.json({ ok: true, snapshot: createSnapshot(payload) }, { status: 201 });
}

