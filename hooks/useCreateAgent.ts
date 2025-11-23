import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { saveAgent } from '@/utils/agentStorage';

interface CreateAgentResponse {
  success: boolean;
  message: string;
  walletAddress?: string;
  error?: string;
}

/**
 * Hook to handle creating new agents with wallets
 */
export function useCreateAgent() {
  const [isCreating, setIsCreating] = useState(false);
  const [lastCreatedAgent, setLastCreatedAgent] = useState<{
    walletAddress: string;
    message: string;
  } | null>(null);
  const router = useRouter();

  /**
   * Creates a new agent with a fresh wallet
   * @returns Promise with the creation result
   */
  const createNewAgent = async (): Promise<CreateAgentResponse> => {
    setIsCreating(true);

    try {
      const response = await fetch('/api/agent/create-new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = (await response.json()) as CreateAgentResponse;

      if (data.success && data.walletAddress) {
        setLastCreatedAgent({
          walletAddress: data.walletAddress,
          message: data.message,
        });

        // Save to localStorage for future reference
        saveAgent(data.walletAddress);
      }

      return data;
    } catch (error) {
      console.error('Error creating new agent:', error);
      return {
        success: false,
        message: 'Failed to create new agent',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    } finally {
      setIsCreating(false);
    }
  };

  /**
   * Creates a new agent and navigates to its page
   */
  const createAndNavigateToAgent = async (): Promise<void> => {
    const result = await createNewAgent();
    if (result.success && result.walletAddress) {
      router.push(`/agent/${result.walletAddress}`);
    }
  };

  return {
    createNewAgent,
    createAndNavigateToAgent,
    isCreating,
    lastCreatedAgent,
    clearLastCreated: () => setLastCreatedAgent(null),
  };
}
