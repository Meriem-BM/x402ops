import { useState, useCallback } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'agent';
}

interface UseAgentByWalletReturn {
  messages: Message[];
  sendMessage: (message: string) => Promise<void>;
  isThinking: boolean;
}

export function useAgentByWallet(walletAddress: string): UseAgentByWalletReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  const sendMessage = useCallback(
    async (message: string) => {
      // Add user message
      const userMsg: Message = { text: message, sender: 'user' };
      setMessages((prev) => [...prev, userMsg]);
      setIsThinking(true);

      try {
        const response = await fetch('/api/agent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userMessage: message,
            walletAddress, // Pass wallet address if the backend needs context, though the current backend seems to ignore it or create a new agent each time.
            // Note: app/api/agent/route.ts currently calls createAgent() which seems to use env vars.
            // If we need specific wallet context, we might need to update the backend too,
            // but for now I'll stick to the interface.
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch response');
        }

        const data = await response.json();

        // Add agent response
        const agentMsg: Message = {
          text: data.response || data.error || 'No response from agent',
          sender: 'agent',
        };
        setMessages((prev) => [...prev, agentMsg]);
      } catch (error) {
        console.error('Error sending message:', error);
        const errorMsg: Message = {
          text: 'Error connecting to agent. Please try again.',
          sender: 'agent',
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsThinking(false);
      }
    },
    [walletAddress]
  );

  return {
    messages,
    sendMessage,
    isThinking,
  };
}
