import { ArrowLeft, Pause } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AgentHeaderProps {
  name: string;
  type: string;
  status: string;
}

export function AgentHeader({ name, type, status }: AgentHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Link href="/agents">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </Link>
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
          <Badge variant="outline">{type}</Badge>
        </div>
        <p className="text-muted-foreground mt-1">CDP wallet and policy details</p>
      </div>
      <div className="flex items-center gap-2">
        <Badge
          variant={status === 'Active' ? 'outline' : 'secondary'}
          className="text-green-500 border-green-500/30 bg-green-500/10"
        >
          {status}
        </Badge>
        <Button variant="outline" size="sm">
          <Pause className="h-4 w-4 mr-2" />
          Pause
        </Button>
      </div>
    </div>
  );
}
