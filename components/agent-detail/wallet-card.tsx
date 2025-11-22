import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WalletCardProps {
  wallet: string;
  network: string;
}

export function WalletCard({ wallet, network }: WalletCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">CDP Wallet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Address</div>
          <div className="flex items-center gap-2">
            <code className="text-xs font-mono bg-secondary px-2 py-1 rounded flex-1 truncate">
              {wallet}
            </code>
            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Network</div>
          <Badge variant="secondary">{network}</Badge>
        </div>
        <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
          <ExternalLink className="h-3 w-3" />
          View on Explorer
        </Button>
      </CardContent>
    </Card>
  );
}

