import { NextRequest, NextResponse } from "next/server";
import { getPilotTasks, savePilotTasks } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ ok: true, tasks: getPilotTasks() });
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  return NextResponse.json({ ok: true, tasks: savePilotTasks(payload) });
}

