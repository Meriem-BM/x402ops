import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { ClientType, IClient } from '@/types/client';

interface CreateAgentParams {
  orgAddress: string;
  name: string;
  type: ClientType;
  network: string;
  dailyLimit: number;
  allowedVendors?: string[];
}

interface UpdateAgentParams {
  id: string;
  name?: string;
  type?: ClientType;
  network?: string;
  dailyLimit?: number;
  allowedVendors?: string[];
  status?: string;
}

// Keys for React Query
export const agentKeys = {
  all: ['agents'] as const,
  list: (orgAddress?: string) => [...agentKeys.all, 'list', orgAddress] as const,
  detail: (id: string) => [...agentKeys.all, 'detail', id] as const,
};

/**
 * Fetch agents for a given organization address.
 * @param orgAddress - The organization address to fetch agents for.
 * @returns The agents for the given organization address.
 */
async function fetchAgents(orgAddress?: string): Promise<IClient[]> {
  const searchParams = new URLSearchParams();
  if (orgAddress) {
    searchParams.set('orgAddress', orgAddress);
  }

  const res = await fetch(`/api/clients?${searchParams.toString()}`);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch agents');
  }
  const data = await res.json();
  return data.clients;
}

export function useFetchAgents(orgAddress?: string) {
  return useQuery({
    queryKey: agentKeys.list(orgAddress),
    queryFn: () => fetchAgents(orgAddress),
    enabled: !!orgAddress,
  });
}

/**
 * Create a new agent.
 * @param params - The parameters for creating the agent.
 * @returns The created agent.
 */
async function createAgent(params: CreateAgentParams): Promise<IClient> {
  const res = await fetch('/api/clients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create agent');
  }
  const data = await res.json();
  return data.client;
}

export function useCreateAgent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAgent,
    onSuccess: () => {
      // Invalidate list to refetch
      queryClient.invalidateQueries({ queryKey: agentKeys.all });
    },
  });
}

/**
 * Update an existing agent.
 * @param params - The parameters for updating the agent.
 * @returns The updated agent.
 */
async function updateAgent(params: UpdateAgentParams): Promise<IClient> {
  const { id, ...body } = params;
  const res = await fetch(`/api/clients?id=${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to update agent');
  }
  const data = await res.json();
  return data.client;
}

export function useUpdateAgent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentKeys.all });
    },
  });
}

/**
 * Delete an existing agent.
 * @param id - The ID of the agent to delete.
 * @returns The deleted agent.
 */
async function deleteAgent(id: string): Promise<IClient> {
  const res = await fetch(`/api/clients?id=${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to delete agent');
  }
  const data = await res.json();
  return data.client;
}

export function useDeleteAgent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentKeys.all });
    },
  });
}
