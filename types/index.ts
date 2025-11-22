export type ClientType = "agent" | "service" | "app";

export type ClientStatus = "OK" | "NEAR_LIMIT" | "OVER_LIMIT" | "PAUSED";

export type VendorId = "llm-api" | "news-api" | "search-api";

export interface Client {
  id: string;
  orgAddress: string; // owner wallet
  name: string;
  type: ClientType;
  cdpWalletId?: string;
  cdpWalletAddress?: string;
  network: string; // e.g. "base-sepolia"
  dailyLimit: number; // in USDC
  spentToday: number;
  lastResetDate: string; // YYYY-MM-DD
  allowedVendors: VendorId[];
  status: ClientStatus;
  createdAt: number;
  updatedAt: number;
}

export type ActivityStatus = "SUCCESS" | "BLOCKED" | "FAILED";

export interface ActivityEvent {
  id: string;
  clientId: string;
  orgAddress: string;
  walletAddress?: string;
  vendor?: VendorId;
  amount: number;
  assetSymbol: string; // "USDC"
  status: ActivityStatus;
  reason?: string; // "over_limit" | "non_allowlisted" | "paused" | "cdp_error"
  txHash?: string;
  createdAt: number;
}
