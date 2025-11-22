import {
  pgTable,
  text,
  varchar,
  timestamp,
  numeric,
  date,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const clients = pgTable("clients", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  orgAddress: varchar("org_address", { length: 80 }).notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  type: varchar("type", { length: 20 }).notNull(), // "agent" | "service" | "app"
  network: varchar("network", { length: 80 }).notNull(),

  dailyLimit: numeric("daily_limit", { precision: 18, scale: 6 }).notNull(),
  spentToday: numeric("spent_today", { precision: 18, scale: 6 })
    .notNull()
    .default("0"),
  lastResetDate: date("last_reset_date").notNull(),

  allowedVendors: text("allowed_vendors").notNull().default("[]"), // store as JSON string

  status: varchar("status", { length: 20 }).notNull().default("OK"),

  cdpWalletId: text("cdp_wallet_id"),
  cdpWalletAddress: varchar("cdp_wallet_address", { length: 80 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

export const activityEvents = pgTable("activity_events", {
  id: text("id").primaryKey(),
  clientId: text("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "cascade" }),
  orgAddress: varchar("org_address", { length: 80 }).notNull(),
  walletAddress: varchar("wallet_address", { length: 80 }),
  vendor: varchar("vendor", { length: 80 }),
  amount: numeric("amount", { precision: 18, scale: 6 }).notNull(),
  assetSymbol: varchar("asset_symbol", { length: 16 }).notNull(), // e.g. "USDC"
  status: varchar("status", { length: 20 }).notNull(), // "SUCCESS" | "BLOCKED" | "FAILED"
  reason: text("reason"),
  txHash: varchar("tx_hash", { length: 100 }),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
});
