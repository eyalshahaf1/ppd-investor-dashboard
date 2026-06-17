import { NextResponse } from "next/server";
import { getDbPath } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "ppd-nextjs-backend",
    db: getDbPath()
  });
}

