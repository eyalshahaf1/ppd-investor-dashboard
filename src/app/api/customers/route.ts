import { NextResponse } from "next/server";
import { listCustomers } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ ok: true, customers: listCustomers() });
}

