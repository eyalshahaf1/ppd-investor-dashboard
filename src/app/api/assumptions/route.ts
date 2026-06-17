import { NextRequest, NextResponse } from "next/server";
import { getStoredAssumptions, saveAssumptions } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ ok: true, assumptions: getStoredAssumptions() });
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  return NextResponse.json({ ok: true, assumptions: saveAssumptions(payload) });
}

