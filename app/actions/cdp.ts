'use server';

import { cdpService, AssetId } from '@/services/cdp';

export async function getWalletBalance(address: string) {
  try {
    return await cdpService.getBalance(address);
  } catch (error) {
    console.error('Error getting balance:', error);
    throw new Error('Failed to fetch balance');
  }
}

export async function fundWallet(address: string, assetId: AssetId) {
  try {
    return await cdpService.fundWallet(address, assetId);
  } catch (error) {
    console.error('Error funding wallet:', error);
    throw new Error('Failed to fund wallet');
  }
}
