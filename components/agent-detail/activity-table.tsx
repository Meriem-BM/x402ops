import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ActivityItem {
  time: string;
  vendor: string;
  amount: number;
  status: string;
  tx: string;
}

interface ActivityTableProps {
  activity: ActivityItem[];
}

export function ActivityTable({ activity }: ActivityTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>Recent transactions from this wallet</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left font-medium text-muted-foreground py-3 px-4">Time</th>
                <th className="text-left font-medium text-muted-foreground py-3 px-4">Vendor / Recipient</th>
                <th className="text-left font-medium text-muted-foreground py-3 px-4">Amount</th>
                <th className="text-left font-medium text-muted-foreground py-3 px-4">Status</th>
                <th className="text-left font-medium text-muted-foreground py-3 px-4">Transaction</th>
              </tr>
            </thead>
            <tbody>
              {activity.map((item, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-4 text-muted-foreground">{item.time}</td>
                  <td className="py-3 px-4 font-medium">{item.vendor}</td>
                  <td className="py-3 px-4">${item.amount.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={item.status === "Success" ? "outline" : "secondary"}
                      className={
                        item.status === "Success"
                          ? "text-green-500 border-green-500/30 bg-green-500/10"
                          : "text-red-500 border-red-500/30 bg-red-500/10"
                      }
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    {item.tx !== "—" ? (
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono text-muted-foreground">{item.tx}</code>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
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
  );
}

