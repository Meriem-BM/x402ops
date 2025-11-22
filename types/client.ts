import { clients } from "@/lib/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type ClientType = "agent" | "service" | "app";

export type ClientStatus = "OK" | "NEAR_LIMIT" | "OVER_LIMIT" | "PAUSED";

export enum ClientStatusEnum {
  OK = "OK",
  NEAR_LIMIT = "NEAR_LIMIT",
  OVER_LIMIT = "OVER_LIMIT",
  PAUSED = "PAUSED",
}

export type IClient = Omit<InferSelectModel<typeof clients>, "allowedVendors"> & {
  allowedVendors: string[];
};
