export type ActivityStatus = "SUCCESS" | "BLOCKED" | "FAILED";

export enum ActivityStatusEnum {
  SUCCESS = "SUCCESS",
  BLOCKED = "BLOCKED",
  FAILED = "FAILED",
}

export interface ActivityEvent {
  id: string;
  clientId: string;
  orgAddress: string;
  walletAddress?: string;
  vendor?: string;
  amount: number;
  assetSymbol: string; // "USDC"
  status: ActivityStatusEnum;
  reason?: string; // "over_limit" | "non_allowlisted" | "paused" | "cdp_error"
  txHash?: string;
  createdAt: number;
}
