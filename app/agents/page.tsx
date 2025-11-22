"use client"

import { useCallback, useEffect, useState } from "react"
import { Search } from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Input } from "@/components/ui/input"
import { AgentHeader } from "@/components/agents/agent-header"
import { AgentTable } from "@/components/agents/agent-table"

interface RawClient {
  id: string
  name: string
  type: string
  cdpWalletAddress?: string
  dailyLimit: string | number
  spentToday: string | number
  allowedVendors: string[]
  status: string
}

interface Agent {
  id: string
  name: string
  type: string
  address: string
  limit: number
  status: string
  vendors: string[]
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])

  const fetchClients = useCallback(async () => {
    try {
      const res = await fetch(`/api/clients`)
      if (!res.ok) return
      const data = await res.json()
      const rows: RawClient[] = data.clients ?? []
      const mapped = rows.map((r) => ({
        id: r.id,
        name: r.name,
        type: r.type.charAt(0).toUpperCase() + r.type.slice(1),
        address: r.cdpWalletAddress ?? "",
        limit: Number(r.dailyLimit),
        status:
          r.status === "NEAR_LIMIT"
            ? "Near Limit"
            : r.status === "OVER_LIMIT"
            ? "Over"
            : r.status === "PAUSED"
            ? "Paused"
            : "OK",
        vendors: r.allowedVendors ?? [],
      }))
      setAgents(mapped)
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      void fetchClients()
    }, 0)
    return () => clearTimeout(t)
  }, [fetchClients])

  return (
    <DashboardShell>
      <div className="space-y-6">
        <AgentHeader orgAddress={process.env.NEXT_PUBLIC_ORG_ADDRESS} onCreated={fetchClients} />

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search agents..." className="pl-9" />
          </div>
        </div>

        <AgentTable agents={agents} onAction={fetchClients} />
      </div>
    </DashboardShell>
  )
}
