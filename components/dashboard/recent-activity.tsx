import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest wallet transactions.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {[
            {
              time: "2m ago",
              action: "Payment to LLM API",
              amount: "-$0.04",
              status: "success",
            },
            {
              time: "15m ago",
              action: "Search Query Fee",
              amount: "-$0.01",
              status: "success",
            },
            {
              time: "1h ago",
              action: "High Value Transfer",
              amount: "$55.00",
              status: "blocked",
            },
            {
              time: "2h ago",
              action: "Hosting Renewal",
              amount: "-$12.00",
              status: "success",
            },
            {
              time: "4h ago",
              action: "Data Feed Access",
              amount: "-$0.50",
              status: "success",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className={`mt-0.5 h-2 w-2 rounded-full ${
                  item.status === "success"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {item.action}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.time}
                </p>
              </div>
              <div
                className={`text-sm font-medium ${
                  item.status === "blocked" ? "text-red-500" : ""
                }`}
              >
                {item.amount}
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full mt-6 text-xs text-muted-foreground hover:text-foreground"
          asChild
        >
          <a href="/activity">
            View all activity <ArrowUpRight className="ml-1 h-3 w-3" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

