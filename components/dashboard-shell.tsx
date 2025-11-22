'use client';

import type React from 'react';

import { Sidebar } from '@/components/sidebar';
import { TopNav } from '@/components/top-nav';
import { Button } from '@/components/ui/button';
import { useOrg } from '@/contexts/org-context';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, login, orgAddress } = useOrg();

  if (!isAuthenticated || !orgAddress) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Welcome to x402Ops</h1>
          <p className="mb-8 text-muted-foreground">
            Connect your wallet to manage your AI agents.
          </p>
          <Button onClick={login} size="lg">
            Connect Wallet
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-6xl mx-auto p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
