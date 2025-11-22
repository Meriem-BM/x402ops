"use client"

import { Download, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ActivityHeaderProps {
  agentFilter: string
  setAgentFilter: (value: string) => void
  statusFilter: string
  setStatusFilter: (value: string) => void
}

export function ActivityHeader({
  agentFilter,
  setAgentFilter,
  statusFilter,
  setStatusFilter,
}: ActivityHeaderProps) {
  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Activity</h1>
        <p className="text-muted-foreground mt-1">
          Onchain activity and policy decisions across all agent wallets.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={agentFilter} onValueChange={setAgentFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Agents" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Agents</SelectItem>
              <SelectItem value="research">Research Assistant</SelectItem>
              <SelectItem value="trading">Trading Bot Alpha</SelectItem>
              <SelectItem value="support">Customer Support</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <div className="ml-auto">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
    </>
  )
}

