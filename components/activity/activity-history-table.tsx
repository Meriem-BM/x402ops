import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface Activity {
  time: string
  agent: string
  type: string
  wallet: string
  vendor: string
  amount: number
  asset: string
  status: string
  reason: string
  tx: string
}

interface ActivityHistoryTableProps {
  activities: Activity[]
}

export function ActivityHistoryTable({ activities }: ActivityHistoryTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>
          Complete log of all agent wallet activity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left font-medium text-muted-foreground py-3 px-4">
                  Time
                </th>
                <th className="text-left font-medium text-muted-foreground py-3 px-4">
                  Agent
                </th>
                <th className="text-left font-medium text-muted-foreground py-3 px-4">
                  Wallet
                </th>
                <th className="text-left font-medium text-muted-foreground py-3 px-4">
                  Vendor
                </th>
                <th className="text-left font-medium text-muted-foreground py-3 px-4">
                  Amount
                </th>
                <th className="text-left font-medium text-muted-foreground py-3 px-4">
                  Status
                </th>
                <th className="text-left font-medium text-muted-foreground py-3 px-4">
                  Reason
                </th>
                <th className="text-left font-medium text-muted-foreground py-3 px-4">
                  Tx Hash
                </th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, i) => (
                <tr
                  key={i}
                  className="border-b last:border-0 hover:bg-secondary/50 transition-colors"
                >
                  <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium">{activity.agent}</div>
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1 py-0 h-4 mt-0.5"
                      >
                        {activity.type}
                      </Badge>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-xs font-mono text-muted-foreground">
                      {activity.wallet}
                    </code>
                  </td>
                  <td className="py-3 px-4">{activity.vendor}</td>
                  <td className="py-3 px-4 font-medium">
                    {activity.amount.toFixed(2)} {activity.asset}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        activity.status === "Success" ? "outline" : "secondary"
                      }
                      className={
                        activity.status === "Success"
                          ? "text-green-500 border-green-500/30 bg-green-500/10"
                          : activity.status === "Blocked"
                          ? "text-amber-500 border-amber-500/30 bg-amber-500/10"
                          : "text-red-500 border-red-500/30 bg-red-500/10"
                      }
                    >
                      {activity.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground max-w-[200px] truncate">
                    {activity.reason}
                  </td>
                  <td className="py-3 px-4">
                    {activity.tx !== "—" ? (
                      <code className="text-xs font-mono text-muted-foreground">
                        {activity.tx}
                      </code>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

