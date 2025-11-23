'use client';

import { useParams } from 'next/navigation';

import { ActivityTable } from '@/components/agent-detail/activity-table';
import { AgentHeader } from '@/components/agent-detail/agent-header';
import { PolicyCard } from '@/components/agent-detail/policy-card';
import { UsageCard } from '@/components/agent-detail/usage-card';
import { WalletCard } from '@/components/agent-detail/wallet-card';
import { DashboardShell } from '@/components/dashboard-shell';
import { useFetchAgent } from '@/hooks/useAgent';

// Static data for analytics (kept as requested)
const activityData = [
  {
    time: '10:24 AM',
    vendor: 'OpenAI API',
    amount: 0.04,
    status: 'Success',
    tx: '0x1a2b...3c4d',
  },
  {
    time: '10:15 AM',
    vendor: 'Perplexity',
    amount: 0.08,
    status: 'Success',
    tx: '0x5e6f...7g8h',
  },
  {
    time: '09:45 AM',
    vendor: 'Anthropic API',
    amount: 0.12,
    status: 'Success',
    tx: '0x9i0j...1k2l',
  },
  { time: '09:30 AM', vendor: 'Unknown Vendor', amount: 5.0, status: 'Blocked', tx: '—' },
  {
    time: '08:50 AM',
    vendor: 'OpenAI API',
    amount: 0.06,
    status: 'Success',
    tx: '0x3m4n...5o6p',
  },
];

export default function AgentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: agent, isLoading, error } = useFetchAgent(id);

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="animate-pulse">Loading agent details...</div>
        </div>
      </DashboardShell>
    );
  }

  if (error || !agent) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-[calc(100vh-200px)] text-destructive">
          {error ? `Error: ${error.message}` : 'Agent not found'}
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <AgentHeader
          name={agent.name}
          type={agent.type}
          status={agent.status}
          wallet={agent.cdpWalletAddress || 'N/A'}
        />

        <div className="grid gap-6 md:grid-cols-3">
          <WalletCard wallet={agent.cdpWalletAddress || ''} network={agent.network} />
          <PolicyCard
            name={agent.name}
            dailyLimit={Number(agent.dailyLimit)}
            maxPerTx={Number(agent.dailyLimit)} // Using dailyLimit as placeholder for maxPerTx since it's not in schema
            vendors={agent.allowedVendors}
          />
          <UsageCard spentToday={Number(agent.spentToday)} dailyLimit={Number(agent.dailyLimit)} />
        </div>

        <ActivityTable activity={activityData} />
      </div>
    </DashboardShell>
  );
}
