import { ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ResourcesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentation & Resources</CardTitle>
        <CardDescription>Guides for integrating AgentPay Ops with your AI agents</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button variant="outline" className="w-full justify-between bg-transparent" asChild>
          <a href="#">
            <span>How to integrate your AI agent</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" className="w-full justify-between bg-transparent" asChild>
          <a href="#">
            <span>x402 & CDP Quickstart Guide</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" className="w-full justify-between bg-transparent" asChild>
          <a href="#">
            <span>Policy Engine API Reference</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" className="w-full justify-between bg-transparent" asChild>
          <a href="#">
            <span>Coinbase CDP Documentation</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
