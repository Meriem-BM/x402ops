import { AgentsList } from '@/components/dashboard/agents-list';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { DashboardShell } from '@/components/dashboard-shell';

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your AI agents, wallets, and policies.
          </p>
        </div>

        {/* Stats Row */}
        <StatsCards />

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Agents Overview */}
          <AgentsList />

          {/* Recent Activity */}
          <RecentActivity />
        </div>
      </div>
    </DashboardShell>
  );
}
