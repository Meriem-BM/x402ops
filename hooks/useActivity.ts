import { useQuery } from '@tanstack/react-query';

import { IActivity } from '@/types/activity';

// Keys for React Query
export const activityKeys = {
  all: ['activities'] as const,
  list: (orgAddress?: string) => [...activityKeys.all, 'list', orgAddress] as const,
};

/**
 * Fetch activities for a given organization address.
 * @param orgAddress - The organization address to fetch activities for.
 * @returns The activities for the given organization address.
 */
async function fetchActivities(orgAddress?: string): Promise<IActivity[]> {
  const searchParams = new URLSearchParams();
  if (orgAddress) {
    searchParams.set('orgAddress', orgAddress);
  }

  const res = await fetch(`/api/activity?${searchParams.toString()}`);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch activities');
  }
  const data = await res.json();
  return data.events;
}

export function useFetchActivities(orgAddress?: string) {
  return useQuery({
    queryKey: activityKeys.list(orgAddress),
    queryFn: () => fetchActivities(orgAddress),
    enabled: !!orgAddress,
  });
}
