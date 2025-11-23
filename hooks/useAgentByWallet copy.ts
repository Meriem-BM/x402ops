import { useState } from 'react';

import { AgentRequest, AgentResponse } from '@/types/api';

/**
 * Sends a user message to the AgentKit backend API with a specific wallet context
 *
 * @async
 * @function messageAgentWithWallet
 * @param {string} userMessage - The message sent by the user.
 * @param {string} walletAddress - The wallet address context for the agent.
 * @returns {Promise<string | null>} The agent's response message or `null` if an error occurs.
 *
 * @throws {Error} Logs an error if the request fails.
 */
async function messageAgentWithWallet(
  userMessage: string,
  walletAddress: string
): Promise<string | null> {
  try {
    // For now, we'll include the wallet context in the message
    const contextualMessage = `[Agent Context: Wallet ${walletAddress}] ${userMessage}`;

    const response = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMessage: contextualMessage } as AgentRequest),
    });

    const data = (await response.json()) as AgentResponse;
    return data.response ?? data.error ?? null;
  } catch (error) {
    console.error('Error communicating with agent:', error);
    return null;
  }
}

/**
 * Hook for managing interactions with a specific agent by wallet address
 *
 * @param walletAddress - The wallet address of the specific agent
 * @returns Hook methods and state for agent interactions
 */
export function useAgentByWallet(walletAddress: string) {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'agent' }[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  /**
   * Sends a user message, updates local state, and retrieves the agent's response.
   *
   * @param {string} input - The message from the user.
   */
  const sendMessage = async (input: string) => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
    setIsThinking(true);

    const responseMessage = await messageAgentWithWallet(input, walletAddress);

    if (responseMessage) {
      setMessages((prev) => [...prev, { text: responseMessage, sender: 'agent' }]);
    }

    setIsThinking(false);
  };

  return { messages, sendMessage, isThinking };
}
