import { InferSelectModel } from 'drizzle-orm';

import { activityEvents } from '@/lib/db/schema';

export type ActivityStatus = 'SUCCESS' | 'BLOCKED' | 'FAILED';

export enum ActivityStatusEnum {
  SUCCESS = 'SUCCESS',
  BLOCKED = 'BLOCKED',
  FAILED = 'FAILED',
}

export type IActivity = InferSelectModel<typeof activityEvents>;
