export type ClientType = "agent" | "service" | "app";

export type ClientStatus = "OK" | "NEAR_LIMIT" | "OVER_LIMIT" | "PAUSED";

export enum ClientStatusEnum {
  OK = "OK",
  NEAR_LIMIT = "NEAR_LIMIT",
  OVER_LIMIT = "OVER_LIMIT",
  PAUSED = "PAUSED",
}

export interface IClient {
  id: string;
  orgAddress: string;
  name: string;
  type: ClientType;
  cdpWalletId?: string;
  cdpWalletAddress?: string;
  network: string; // e.g. "base-sepolia"
  dailyLimit: number; // in USDC
  spentToday: number;
  lastResetDate: string; // YYYY-MM-DD
  allowedVendors: string[];
  status: ClientStatusEnum;
  createdAt: number;
  updatedAt: number;
}
