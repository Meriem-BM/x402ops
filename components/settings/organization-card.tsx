import { Building2 } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function OrganizationCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Organization</CardTitle>
        </div>
        <CardDescription>Organization details and connected wallet</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="text-sm font-medium mb-1">Organization Name</div>
            <div className="text-sm text-muted-foreground">Acme Corp</div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Owner Wallet</div>
            <code className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
              0x1234...89ab
            </code>
          </div>
        </div>
        <Separator />
        <p className="text-sm text-muted-foreground">
          This wallet manages your AgentPay Ops configuration and has administrative access to all
          agent wallets.
        </p>
      </CardContent>
    </Card>
  );
}
