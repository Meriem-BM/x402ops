import { activityEvents } from "@/lib/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type ActivityStatus = "SUCCESS" | "BLOCKED" | "FAILED";

export enum ActivityStatusEnum {
  SUCCESS = "SUCCESS",
  BLOCKED = "BLOCKED",
  FAILED = "FAILED",
}

export type IActivity = InferSelectModel<typeof activityEvents>;
