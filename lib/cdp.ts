import { CDP_API_KEY, CDP_BASE_URL, CDP_PROJECT_ID } from '@/config/cdp.config';

if (!CDP_API_KEY) {
  console.warn('CDP_API_KEY is not set. CDP integration will be mocked.');
}

export async function createCdpWalletForAgent(args: { network: string; label: string }) {
  // TODO: call CDP wallet API
  // For hackathon, you can mock this return:
  return {
    walletId: 'wallet_mock_123',
    address: '0xMockAddress',
  };
}

export async function applyPolicyForAgentWallet(args: {
  walletId: string;
  dailyLimit: number;
  // etc.
}) {
  // TODO: call Policy Engine API to create/update policy
  return { ok: true };
}
