import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ActivityStatsProps {
  totalSpend: number
  blockedCount: number
  mostActiveAgentName: string
  mostActiveAgentCount: number
}

export function ActivityStats({
  totalSpend,
  blockedCount,
  mostActiveAgentName,
  mostActiveAgentCount,
}: ActivityStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalSpend.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Blocked Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-500">
            {blockedCount}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Policy violations
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Most Active Agent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-base font-bold truncate">
            {mostActiveAgentName}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {mostActiveAgentCount} transactions
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

