import crypto from 'crypto';

import {
  AgentKit,
  CdpEvmWalletProvider,
  cdpApiActionProvider,
  cdpEvmWalletActionProvider,
  erc20ActionProvider,
  pythActionProvider,
  walletActionProvider,
  wethActionProvider,
  x402ActionProvider,
} from '@coinbase/agentkit';
import { CdpClient } from '@coinbase/cdp-sdk';
import { parseEther } from 'viem';

import { CHAIN_CONFIG } from '@/lib/constants';

export class CdpService {
  private client: CdpClient | null = null;

  constructor() {
    const apiKeyId = process.env.CDP_API_KEY_ID;
    const apiKeySecret = process.env.CDP_API_KEY_SECRET;

    if (apiKeyId && apiKeySecret) {
      try {
        this.client = new CdpClient();
      } catch (error) {
        console.error('Failed to initialize CdpClient:', error);
      }
    } else {
      console.warn(
        'CDP_API_KEY_ID or CDP_API_KEY_SECRET not found. CdpService running in mock mode.'
      );
    }
  }

  private getClient(): CdpClient {
    if (!this.client) {
      throw new Error('CdpService is not initialized with valid credentials.');
    }
    return this.client;
  }

  public async createWallet() {
    if (!this.client) {
      return this.getMockWallet();
    }

    try {
      // Initialize WalletProvider with a fresh wallet (no address parameter)
      const walletProvider = await CdpEvmWalletProvider.configureWithWallet({
        apiKeyId: process.env.CDP_API_KEY_ID,
        apiKeySecret: process.env.CDP_API_KEY_SECRET,
        walletSecret: process.env.CDP_WALLET_SECRET,
        networkId: process.env.NETWORK_ID || 'base-sepolia',
        rpcUrl: process.env.RPC_URL,
      });

      // Initialize AgentKit
      // We create the agent to ensure the wallet is properly set up with agent capabilities
      await AgentKit.from({
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

      const exportedWallet = await walletProvider.exportWallet();
      const address = exportedWallet.address;
      const walletId = address;

      console.log(`Created Agent with wallet: ${address}`);

      return {
        address: address,
        walletId: walletId,
      };
    } catch (error) {
      console.error('Error creating agent and wallet:', error);
      throw error;
    }
  }

  public async fundWallet(address: string) {
    if (!this.client) {
      console.log(`[Mock] Funding wallet ${address}`);
      return { transactionHash: '0xMockTxHash' };
    }

    try {
      const faucetResponse = await this.getClient().evm.requestFaucet({
        address,
        network: CHAIN_CONFIG.NETWORK_ID,
        token: CHAIN_CONFIG.ASSET_ID,
      });
      console.log(
        `Requested funds: https://sepolia.basescan.org/tx/${faucetResponse.transactionHash}`
      );
      return faucetResponse;
    } catch (error) {
      console.error('Error funding wallet:', error);
      throw error;
    }
  }

  public async applyPolicy(address: string, dailyLimit: number) {
    if (!this.client) {
      console.log(`[Mock] Applying policy (limit: ${dailyLimit}) to ${address}`);
      return;
    }

    try {
      // Convert dailyLimit (ETH) to Wei
      const limitInWei = parseEther(dailyLimit.toString());

      // Create project policy
      const projectPolicy = await this.getClient().policies.createPolicy({
        policy: {
          scope: 'project',
          description: `Transaction Limit`,
          rules: [
            {
              action: 'accept',
              operation: 'signEvmTransaction',
              criteria: [
                {
                  type: 'ethValue',
                  ethValue: limitInWei.toString(),
                  operator: '<=',
                },
              ],
            },
          ],
        },
      });
      console.log('Created project policy:', projectPolicy.id);

      const updatedAccount = await this.getClient().evm.updateAccount({
        address: address as `0x${string}`,
        update: {
          accountPolicy: projectPolicy.id,
        },
      });
      console.log(`Updated account ${updatedAccount.address} with policy ${projectPolicy.id}.`);
    } catch (error) {
      console.error('Error applying policy:', error);
      // Don't throw if policy creation fails, just log it to prevent blocking client creation
    }
  }

  public async getBalance(address: string) {
    if (!this.client) {
      return '0.00'; // Mock balance
    }

    try {
      const balance = await this.getClient().evm.listTokenBalances({
        address: address as `0x${string}`,
        network: CHAIN_CONFIG.NETWORK_ID,
      });
      // Assuming first balance is the native token
      return balance.balances[0]?.amount || '0';
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }

  private getMockWallet() {
    const suffix = crypto.randomUUID().slice(0, 8);
    return {
      walletId: `wallet_mock_${suffix}`,
      address: `0xMockAddress${suffix}`,
    };
  }
}

export const cdpService = new CdpService();
