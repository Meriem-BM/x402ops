"use client"

import { Search } from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Input } from "@/components/ui/input"
import { AgentHeader } from "@/components/agents/agent-header"
import { AgentTable } from "@/components/agents/agent-table"

const agents = [
  {
    id: "1",
    name: "Research Assistant",
    type: "Agent",
    address: "0x7a1b...23f",
    limit: 10,
    status: "OK",
    vendors: ["OpenAI API", "Perplexity"],
  },
  {
    id: "2",
    name: "Trading Bot Alpha",
    type: "Service",
    address: "0x9b2c...41a",
    limit: 50,
    status: "Near Limit",
    vendors: ["DeFi Llama", "CoinGecko", "1inch API"],
  },
  {
    id: "3",
    name: "Customer Support",
    type: "App",
    address: "0x2c3d...78e",
    limit: 5,
    status: "OK",
    vendors: ["Anthropic API"],
  },
  {
    id: "4",
    name: "Content Generator",
    type: "Agent",
    address: "0x5f4e...19d",
    limit: 20,
    status: "OK",
    vendors: ["OpenAI API", "DALL-E"],
  },
  {
    id: "5",
    name: "Data Scraper",
    type: "Service",
    address: "0x1e5f...64b",
    limit: 15,
    status: "Paused",
    vendors: ["Browserless", "SerpAPI"],
  },
  {
    id: "6",
    name: "Email Classifier",
    type: "Agent",
    address: "0x8g6h...25c",
    limit: 8,
    status: "OK",
    vendors: ["Anthropic API"],
  },
  {
    id: "7",
    name: "Market Monitor",
    type: "Service",
    address: "0x3h7i...92k",
    limit: 30,
    status: "Over",
    vendors: ["CoinMarketCap", "News API"],
  },
]

export default function AgentsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <AgentHeader />

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search agents..." className="pl-9" />
          </div>
        </div>

        <AgentTable agents={agents} />
      </div>
    </DashboardShell>
  )
}
