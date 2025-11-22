"use client";

import { Search } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Input } from "@/components/ui/input";
import { AgentHeader } from "@/components/agents/agent-header";
import { AgentTable } from "@/components/agents/agent-table";
import { useFetchAgents } from "@/hooks/useAgent";
import { useOrg } from "@/contexts/org-context";

export default function AgentsPage() {
  const { orgAddress } = useOrg();
  const { data: clients, refetch } = useFetchAgents(orgAddress);


  return (
    <DashboardShell>
      <div className="space-y-6">
        <AgentHeader onCreated={() => refetch()} />

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search agents..." className="pl-9" />
          </div>
        </div>

        <AgentTable agents={clients ?? []} onAction={() => refetch()} />
      </div>
    </DashboardShell>
  );
}
