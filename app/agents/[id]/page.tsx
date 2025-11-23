'use client';

import { ActivityTable } from '@/components/agent-detail/activity-table';
import { AgentHeader } from '@/components/agent-detail/agent-header';
import { IntegrationCard } from '@/components/agent-detail/integration-card';
import { PolicyCard } from '@/components/agent-detail/policy-card';
import { UsageCard } from '@/components/agent-detail/usage-card';
import { WalletCard } from '@/components/agent-detail/wallet-card';
import { DashboardShell } from '@/components/dashboard-shell';

const agentData = {
  id: '1',
  name: 'Research Assistant',
  type: 'Agent',
  status: 'Active',
  wallet: '0x7a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f89ab',
  network: 'Base Mainnet',
  dailyLimit: 10,
  maxPerTx: 1,
  spentToday: 2.4,
  vendors: ['OpenAI API', 'Perplexity', 'Anthropic API'],
  activity: [
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
  ],
  spendHistory: [
    { day: 'Mon', amount: 3.2 },
    { day: 'Tue', amount: 4.8 },
    { day: 'Wed', amount: 2.1 },
    { day: 'Thu', amount: 5.6 },
    { day: 'Fri', amount: 3.9 },
    { day: 'Sat', amount: 1.2 },
    { day: 'Sun', amount: 2.4 },
  ],
};

export default function AgentDetailPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <AgentHeader
          name={agentData.name}
          type={agentData.type}
          status={agentData.status}
          wallet={agentData.wallet}
        />

        <div className="grid gap-6 md:grid-cols-3">
          <WalletCard wallet={agentData.wallet} network={agentData.network} />
          <PolicyCard
            name={agentData.name}
            dailyLimit={agentData.dailyLimit}
            maxPerTx={agentData.maxPerTx}
            vendors={agentData.vendors}
          />
          <UsageCard spentToday={agentData.spentToday} dailyLimit={agentData.dailyLimit} />
        </div>

        <ActivityTable activity={agentData.activity} />

        <IntegrationCard id={agentData.id} network={agentData.network} />
      </div>
    </DashboardShell>
  );
}
