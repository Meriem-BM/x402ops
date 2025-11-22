import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clients } from "@/lib/db/schema";
import { eq, type InferInsertModel } from "drizzle-orm";
import { ClientType, VendorId } from "@/types";
import { z } from "zod";

const id = () => crypto.randomUUID();

function todayDateString() {
  return new Date().toISOString().slice(0, 10);
}

export async function GET(req: NextRequest) {
  try {
    const orgAddress = req.nextUrl.searchParams.get("orgAddress") ?? undefined;

    const rows = await db
      .select()
      .from(clients)
      .where(
        orgAddress
          ? eq(clients.orgAddress, orgAddress.toLowerCase())
          : undefined
      )
      .execute()
      .catch(async () => {
        // Fallback: no where clause if orgAddress not provided
        return await db.select().from(clients);
      });

    // Parse allowedVendors JSON
    const data = rows.map((row) => ({
      ...row,
      allowedVendors: JSON.parse(row.allowedVendors) as VendorId[],
    }));

    return NextResponse.json({ clients: data });
  } catch (err) {
    // Surface the error as JSON in development to aid debugging
    const msg = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error && err.stack ? err.stack : undefined;
    return NextResponse.json({ error: msg, stack }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  const postSchema = z.object({
    orgAddress: z.string().min(1),
    name: z.string().min(1),
    type: z.enum(["agent", "service", "app"]),
    network: z.string().min(1),
    dailyLimit: z.number().nonnegative(),
    allowedVendors: z.array(z.string()).optional(),
  });

  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  const { orgAddress, name, type, network, dailyLimit, allowedVendors } = parsed.data;

  const now = todayDateString();

  const [inserted] = await db
    .insert(clients)
    .values({
      id: id(),
      orgAddress: orgAddress.toLowerCase(),
      name: name.trim(),
      type,
      network,
      dailyLimit: String(dailyLimit),
      spentToday: "0",
      lastResetDate: now,
      allowedVendors: JSON.stringify(allowedVendors ?? []),
      status: "OK",
    })
    .returning();

  // TODO: here you’d:
  // - create CDP wallet for this agent
  // - create & attach Policy Engine policy
  // - db.update(clients).set({ cdpWalletId, cdpWalletAddress }).where(eq(clients.id, inserted.id))

  const client = {
    ...inserted,
    dailyLimit: Number(inserted.dailyLimit),
    spentToday: Number(inserted.spentToday),
    allowedVendors: JSON.parse(inserted.allowedVendors) as VendorId[],
  };

  return NextResponse.json({ client }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const idParam = req.nextUrl.searchParams.get("id");
  if (!idParam) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));

  const patchSchema = z
    .object({
      name: z.string().min(1).optional(),
      type: z.enum(["agent", "service", "app"]).optional(),
      network: z.string().min(1).optional(),
      dailyLimit: z.number().nonnegative().optional(),
      allowedVendors: z.array(z.string()).optional(),
      status: z.string().optional(),
    })
    .partial();

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  const parsedBody = parsed.data as Partial<{
    name: string;
    type: ClientType;
    network: string;
    dailyLimit: number;
    allowedVendors: VendorId[];
    status: string;
  }>;

  const patch: Partial<InferInsertModel<typeof clients>> = {
    updatedAt: new Date(),
  };

  if (parsedBody.name) patch.name = parsedBody.name.trim();
  if (parsedBody.type) patch.type = parsedBody.type;
  if (parsedBody.network) patch.network = parsedBody.network;
  if (typeof parsedBody.dailyLimit === "number")
    patch.dailyLimit = String(parsedBody.dailyLimit);
  if (parsedBody.allowedVendors)
    patch.allowedVendors = JSON.stringify(parsedBody.allowedVendors);
  if (parsedBody.status) patch.status = parsedBody.status;

  const [updated] = await db
    .update(clients)
    .set(patch)
    .where(eq(clients.id, idParam))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const client = {
    ...updated,
    dailyLimit: Number(updated.dailyLimit),
    spentToday: Number(updated.spentToday),
    allowedVendors: JSON.parse(updated.allowedVendors) as VendorId[],
  };

  return NextResponse.json({ client });
}

export async function DELETE(req: NextRequest) {
  const idParam = req.nextUrl.searchParams.get("id");
  if (!idParam) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const deleted = await db
    .delete(clients)
    .where(eq(clients.id, idParam))
    .returning();

  if (!deleted || deleted.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ client: deleted[0] });
}
