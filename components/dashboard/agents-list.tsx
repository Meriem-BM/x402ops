import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function BotIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

export function AgentsList() {
  return (
    <Card className="md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle>Top Agents</CardTitle>
          <CardDescription>
            Usage and status of your most active agents.
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href="/agents">View All</a>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            {
              name: "Research Assistant",
              type: "Agent",
              address: "0x7a...3f",
              limit: 10,
              spent: 2.4,
              status: "OK",
            },
            {
              name: "Trading Bot Alpha",
              type: "Service",
              address: "0x9b...1a",
              limit: 50,
              spent: 48.5,
              status: "Near Limit",
            },
            {
              name: "Customer Support",
              type: "App",
              address: "0x2c...8e",
              limit: 5,
              spent: 0.5,
              status: "OK",
            },
            {
              name: "Content Generator",
              type: "Agent",
              address: "0x5f...9d",
              limit: 20,
              spent: 1.2,
              status: "OK",
            },
            {
              name: "Data Scraper",
              type: "Service",
              address: "0x1e...4b",
              limit: 15,
              spent: 0,
              status: "Paused",
            },
          ].map((agent, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 hover:bg-secondary/50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
                  <BotIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{agent.name}</p>
                    <Badge
                      variant="outline"
                      className="text-[10px] h-5 px-1.5 font-normal"
                    >
                      {agent.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    {agent.address}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-right">
                <div className="hidden sm:block">
                  <p className="text-xs text-muted-foreground">
                    Spend / Limit
                  </p>
                  <p className="text-sm font-medium">
                    ${agent.spent} / ${agent.limit}
                  </p>
                </div>
                <Badge
                  variant={
                    agent.status === "OK"
                      ? "outline"
                      : agent.status === "Near Limit"
                      ? "secondary"
                      : "secondary"
                  }
                  className={
                    agent.status === "Near Limit"
                      ? "text-amber-500 border-amber-500/30 bg-amber-500/10"
                      : ""
                  }
                >
                  {agent.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

