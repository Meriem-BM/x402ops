import {
  CdpEvmWalletProvider,
  AgentKit,
  cdpApiActionProvider,
  cdpEvmWalletActionProvider,
  erc20ActionProvider,
  pythActionProvider,
  walletActionProvider,
  wethActionProvider,
  x402ActionProvider,
} from '@coinbase/agentkit';
import { NextResponse } from 'next/server';

interface CreateAgentResponse {
  success: boolean;
  message: string;
  walletAddress?: string;
  error?: string;
}

/**
 * Creates a new AgentKit and WalletProvider with a fresh wallet.
 * Unlike the main prepare function, this always creates a new wallet.
 */
async function createFreshAgentkitAndWallet(): Promise<{
  agentkit: AgentKit;
  walletProvider: CdpEvmWalletProvider;
}> {
  if (!process.env.CDP_API_KEY_ID || !process.env.CDP_API_KEY_SECRET) {
    throw new Error(
      'CDP_API_KEY_ID and CDP_API_KEY_SECRET are required in your .env file to connect to the Coinbase Developer Platform.'
    );
  }

  // Initialize WalletProvider with a fresh wallet (no address parameter)
  const walletProvider = await CdpEvmWalletProvider.configureWithWallet({
    apiKeyId: process.env.CDP_API_KEY_ID,
    apiKeySecret: process.env.CDP_API_KEY_SECRET,
    walletSecret: process.env.CDP_WALLET_SECRET,
    networkId: process.env.NETWORK_ID || 'base-sepolia',
    // No address parameter to create a fresh wallet
    rpcUrl: process.env.RPC_URL,
  });

  // Initialize AgentKit
  const agentkit = await AgentKit.from({
    walletProvider,
    actionProviders: [
      wethActionProvider(),
      pythActionProvider(),
      walletActionProvider(),
      erc20ActionProvider(),
      cdpApiActionProvider(),
      cdpEvmWalletActionProvider(),
      x402ActionProvider(),
    ],
  });

  return { agentkit, walletProvider };
}

/**
 * Handles POST requests to create a new agent with a fresh wallet.
 * This endpoint creates a new agent instance with a brand new wallet.
 *
 * @returns {Promise<NextResponse<CreateAgentResponse>>} JSON response containing success status and wallet details
 */
export async function POST(): Promise<NextResponse<CreateAgentResponse>> {
  try {
    console.log('Creating new agent with fresh wallet...');

    // Create a new agent and wallet
    const { walletProvider } = await createFreshAgentkitAndWallet();

    // Get wallet address from exported wallet data
    const exportedWallet = await walletProvider.exportWallet();
    const walletAddress = exportedWallet.address;

    console.log(`New agent created with wallet address: ${walletAddress}`);

    return NextResponse.json({
      success: true,
      message: `Successfully created new agent with wallet address: ${walletAddress}`,
      walletAddress: walletAddress,
    });
  } catch (error) {
    console.error('Error creating new agent:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create new agent',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
