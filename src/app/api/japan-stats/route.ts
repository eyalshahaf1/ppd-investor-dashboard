import { NextRequest, NextResponse } from "next/server";
import { getJapanStats } from "@/lib/japanStats";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const refresh = request.nextUrl.searchParams.get("refresh") === "1";
  const result = await getJapanStats(refresh);

  return NextResponse.json({
    ok: true,
    ...result
  });
}
