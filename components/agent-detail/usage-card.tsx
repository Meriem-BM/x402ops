import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UsageCardProps {
  spentToday: number;
  dailyLimit: number;
}

export function UsageCard({ spentToday, dailyLimit }: UsageCardProps) {
  const percentUsed = (spentToday / dailyLimit) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Usage Today</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-end justify-between mb-2">
            <div>
              <div className="text-2xl font-bold">${spentToday}</div>
              <div className="text-xs text-muted-foreground">of ${dailyLimit} limit</div>
            </div>
            <Badge variant="outline" className="text-green-500 border-green-500/30 bg-green-500/10">
              {percentUsed.toFixed(0)}%
            </Badge>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
              style={{ width: `${Math.min(percentUsed, 100)}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
          <TrendingUp className="h-3 w-3" />
          <span>7-day average: $3.6</span>
        </div>
      </CardContent>
    </Card>
  );
}

