'use client';

import { useState, useEffect, useCallback } from 'react';

import { Copy, ExternalLink, Coins, RefreshCcw } from 'lucide-react';

import { getWalletBalance, fundWallet } from '@/app/actions/cdp';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/useToast';
import { AssetId } from '@/services/cdp';

interface WalletCardProps {
  wallet: string;
  network: string;
}

interface Balance {
  assetId: string;
  amount: string;
}

export function WalletCard({ wallet, network }: WalletCardProps) {
  const { toast } = useToast();
  const [clickedFundButton, setClickedFundButton] = useState<string | null>(null);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchBalances = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const data = await getWalletBalance(wallet);
      // Ensure we have an array, in case of mock or error
      if (Array.isArray(data)) {
        setBalances(data);
      } else {
        console.warn('Unexpected balance format', data);
      }
    } catch (error) {
      console.error('Error fetching balances:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch wallet balances',
        variant: 'destructive',
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [wallet, toast]);

  useEffect(() => {
    if (wallet) {
      fetchBalances();
    }
  }, [wallet, fetchBalances]);

  const handleFund = async (assetId: string) => {
    if (clickedFundButton) return;
    setClickedFundButton(assetId);
    try {
      await fundWallet(wallet, assetId as AssetId);

      toast({
        title: 'Funds Requested',
        description: `Successfully requested ${assetId.toUpperCase()} from faucet.`,
      });

      // Refresh balances after successful funding
      setTimeout(fetchBalances, 2000);
    } catch (error) {
      console.error('Funding error:', error);
      toast({
        title: 'Funding Failed',
        description: error instanceof Error ? error.message : 'Could not fund wallet.',
        variant: 'destructive',
      });
    } finally {
      setClickedFundButton(null);
    }
  };

  const getBalance = (assetId: string) => {
    const balance = balances.find((b) => b.assetId === assetId);
    return balance ? parseFloat(balance.amount).toFixed(4) : '0.0000';
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(wallet);
    toast({
      title: 'Copied',
      description: 'Wallet address copied to clipboard',
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">CDP Wallet</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={fetchBalances}
          disabled={isRefreshing}
        >
          <RefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Address Section */}
        <div>
          <div className="text-xs text-muted-foreground mb-1">Address</div>
          <div className="flex items-center gap-2">
            <code className="text-xs font-mono bg-secondary px-2 py-1 rounded flex-1 truncate">
              {wallet}
            </code>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0"
              onClick={copyToClipboard}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Balances Section */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-3">
            <div className="text-xs text-muted-foreground">ETH Balance</div>
            <div className="text-lg font-bold">{getBalance('eth')}</div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-3">
            <div className="text-xs text-muted-foreground">USDC Balance</div>
            <div className="text-lg font-bold">{getBalance('usdc')}</div>
          </div>
        </div>

        {/* Network Section */}
        <div>
          <div className="text-xs text-muted-foreground mb-1">Network</div>
          <Badge variant="secondary">{network}</Badge>
        </div>

        {/* Faucet Section */}
        <div>
          <div className="text-xs text-muted-foreground mb-1">Testnet Faucet</div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-2"
              onClick={() => handleFund('usdc')}
              disabled={!!clickedFundButton}
            >
              <Coins className="h-3 w-3" />
              {clickedFundButton === 'usdc' ? 'Funding...' : 'Fund USDC'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-2"
              onClick={() => handleFund('eth')}
              disabled={!!clickedFundButton}
            >
              <Coins className="h-3 w-3" />
              {clickedFundButton === 'eth' ? 'Funding...' : 'Fund ETH'}
            </Button>
          </div>
        </div>

        {/* Explorer Link */}
        <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
          <ExternalLink className="h-3 w-3" />
          View on Explorer
        </Button>
      </CardContent>
    </Card>
  );
}
