'use client';

import { useState } from 'react';

import { ActivityHeader } from '@/components/activity/activity-header';
import { ActivityHistoryTable } from '@/components/activity/activity-history-table';
import { ActivityStats } from '@/components/activity/activity-stats';
import { DashboardShell } from '@/components/dashboard-shell';

const activities = [
  {
    time: '2024-01-15 10:24',
    agent: 'Research Assistant',
    type: 'Agent',
    wallet: '0x7a...3f',
    vendor: 'OpenAI API',
    amount: 0.04,
    asset: 'USDC',
    status: 'Success',
    reason: '—',
    tx: '0x1a2b...3c4d',
  },
  {
    time: '2024-01-15 10:15',
    agent: 'Trading Bot Alpha',
    type: 'Service',
    wallet: '0x9b...1a',
    vendor: 'CoinGecko API',
    amount: 0.08,
    asset: 'USDC',
    status: 'Success',
    reason: '—',
    tx: '0x5e6f...7g8h',
  },
  {
    time: '2024-01-15 09:45',
    agent: 'Customer Support',
    type: 'App',
    wallet: '0x2c...8e',
    vendor: 'Anthropic API',
    amount: 0.12,
    asset: 'USDC',
    status: 'Success',
    reason: '—',
    tx: '0x9i0j...1k2l',
  },
  {
    time: '2024-01-15 09:30',
    agent: 'Research Assistant',
    type: 'Agent',
    wallet: '0x7a...3f',
    vendor: 'Unknown Contract',
    amount: 5.0,
    asset: 'USDC',
    status: 'Blocked',
    reason: 'Non-allowlisted vendor',
    tx: '—',
  },
  {
    time: '2024-01-15 09:12',
    agent: 'Content Generator',
    type: 'Agent',
    wallet: '0x5f...9d',
    vendor: 'DALL-E API',
    amount: 0.25,
    asset: 'USDC',
    status: 'Success',
    reason: '—',
    tx: '0x3m4n...5o6p',
  },
  {
    time: '2024-01-15 08:50',
    agent: 'Trading Bot Alpha',
    type: 'Service',
    wallet: '0x9b...1a',
    vendor: '1inch API',
    amount: 2.4,
    asset: 'USDC',
    status: 'Success',
    reason: '—',
    tx: '0x7q8r...9s0t',
  },
  {
    time: '2024-01-15 08:35',
    agent: 'Market Monitor',
    type: 'Service',
    wallet: '0x3h...92k',
    vendor: 'News API',
    amount: 0.5,
    asset: 'USDC',
    status: 'Success',
    reason: '—',
    tx: '0x1u2v...3w4x',
  },
  {
    time: '2024-01-15 08:20',
    agent: 'Trading Bot Alpha',
    type: 'Service',
    wallet: '0x9b...1a',
    vendor: 'DeFi Llama',
    amount: 1.2,
    asset: 'USDC',
    status: 'Success',
    reason: '—',
    tx: '0x5y6z...7a8b',
  },
  {
    time: '2024-01-15 08:10',
    agent: 'Market Monitor',
    type: 'Service',
    wallet: '0x3h...92k',
    vendor: 'CoinMarketCap',
    amount: 15.0,
    asset: 'USDC',
    status: 'Blocked',
    reason: 'Over daily limit',
    tx: '—',
  },
  {
    time: '2024-01-15 07:45',
    agent: 'Email Classifier',
    type: 'Agent',
    wallet: '0x8g...25c',
    vendor: 'Anthropic API',
    amount: 0.08,
    asset: 'USDC',
    status: 'Success',
    reason: '—',
    tx: '0x9c0d...1e2f',
  },
  {
    time: '2024-01-15 07:30',
    agent: 'Research Assistant',
    type: 'Agent',
    wallet: '0x7a...3f',
    vendor: 'Perplexity',
    amount: 0.15,
    asset: 'USDC',
    status: 'Success',
    reason: '—',
    tx: '0x3g4h...5i6j',
  },
  {
    time: '2024-01-15 07:15',
    agent: 'Content Generator',
    type: 'Agent',
    wallet: '0x5f...9d',
    vendor: 'OpenAI API',
    amount: 0.06,
    asset: 'USDC',
    status: 'Success',
    reason: '—',
    tx: '0x7k8l...9m0n',
  },
  {
    time: '2024-01-14 23:50',
    agent: 'Data Scraper',
    type: 'Service',
    wallet: '0x1e...4b',
    vendor: 'SerpAPI',
    amount: 0.3,
    asset: 'USDC',
    status: 'Failed',
    reason: 'Network error',
    tx: '—',
  },
];

export default function ActivityPage() {
  const [agentFilter, setAgentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const totalSpend = activities
    .filter((a) => a.status === 'Success')
    .reduce((sum, a) => sum + a.amount, 0);

  const blockedCount = activities.filter((a) => a.status === 'Blocked').length;
  const mostActiveAgent = 'Trading Bot Alpha';
  const mostActiveAgentCount = activities.filter((a) => a.agent === mostActiveAgent).length;

  // Filter logic could be added here, but keeping it visual for now as per original
  // const filteredActivities = activities.filter(...)

  return (
    <DashboardShell>
      <div className="space-y-6">
        <ActivityHeader
          agentFilter={agentFilter}
          setAgentFilter={setAgentFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <ActivityStats
          totalSpend={totalSpend}
          blockedCount={blockedCount}
          mostActiveAgentName={mostActiveAgent}
          mostActiveAgentCount={mostActiveAgentCount}
        />

        <ActivityHistoryTable activities={activities} />
      </div>
    </DashboardShell>
  );
}
