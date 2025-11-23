import { useQuery } from '@tanstack/react-query';

import { IActivity } from '@/types/activity';

// Keys for React Query
export const activityKeys = {
  all: ['activities'] as const,
  list: (orgAddress?: string, clientId?: string) =>
    [...activityKeys.all, 'list', orgAddress, clientId] as const,
};

interface UseFetchActivitiesOptions {
  orgAddress?: string;
  clientId?: string;
}

/**
 * Fetch activities for a given organization address or client ID.
 */
async function fetchActivities(orgAddress?: string, clientId?: string): Promise<IActivity[]> {
  const searchParams = new URLSearchParams();
  if (orgAddress) {
    searchParams.set('orgAddress', orgAddress);
  }
  if (clientId) {
    searchParams.set('clientId', clientId);
  }

  const res = await fetch(
    `https://api.coinbase.com/v2/accounts/${clientId}/transactions?${searchParams.toString()}`
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch activities');
  }
  const data = await res.json();
  return data.events;
}

export function useFetchActivities({ orgAddress, clientId }: UseFetchActivitiesOptions) {
  return useQuery({
    queryKey: activityKeys.list(orgAddress, clientId),
    queryFn: () => fetchActivities(orgAddress, clientId),
    enabled: !!orgAddress || !!clientId,
  });
}
