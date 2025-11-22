import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { activityEvents } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const orgAddress = req.nextUrl.searchParams.get("orgAddress") ?? undefined;

  const rows = await (orgAddress
    ? db
        .select()
        .from(activityEvents)
        .where(eq(activityEvents.orgAddress, orgAddress.toLowerCase()))
    : db.select().from(activityEvents));

  // If you want, you can sort by createdAt desc:
  // .orderBy(desc(activityEvents.createdAt))

  return NextResponse.json({ events: rows });
}
