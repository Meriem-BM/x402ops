import { ClientStatusEnum } from "@/types/client";

export const ClientStatusMap = {
  [ClientStatusEnum.NEAR_LIMIT]: "Near Limit",
  [ClientStatusEnum.OVER_LIMIT]: "Over Limit",
  [ClientStatusEnum.PAUSED]: "Paused",
  [ClientStatusEnum.OK]: "OK",
};
