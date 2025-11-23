/**
 * Utility functions for managing agent data in localStorage
 */

export interface SavedAgent {
  walletAddress: string;
  createdAt: string;
  nickname?: string;
}

const AGENTS_STORAGE_KEY = 'agentmaker_created_agents';

/**
 * Get all saved agents from localStorage
 */
export function getSavedAgents(): SavedAgent[] {
  if (typeof window === 'undefined') return [];

  try {
    const saved = localStorage.getItem(AGENTS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error reading saved agents:', error);
    return [];
  }
}

/**
 * Save a new agent to localStorage
 */
export function saveAgent(walletAddress: string, nickname?: string): void {
  if (typeof window === 'undefined') return;

  try {
    const existing = getSavedAgents();
    const newAgent: SavedAgent = {
      walletAddress,
      createdAt: new Date().toISOString(),
      nickname,
    };

    // Avoid duplicates
    const filtered = existing.filter((agent) => agent.walletAddress !== walletAddress);
    const updated = [newAgent, ...filtered]; // New agents at the top

    localStorage.setItem(AGENTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving agent:', error);
  }
}

/**
 * Format wallet address for display
 */
export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
