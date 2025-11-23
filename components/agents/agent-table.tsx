'use client';

import { useState } from 'react';

import { Copy, Pause, Play, Trash, Rocket } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useModal } from '@/contexts/modal-context';
import { useUpdateAgent } from '@/hooks/useAgent';
import { ClientStatusEnum, IClient } from '@/types/client';

interface AgentTableProps {
  agents: IClient[] | [];
  onAction?: () => void;
}

export function AgentTable({ agents, onAction }: AgentTableProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const updateAgent = useUpdateAgent();
  const { openModal } = useModal();

  return (
    <Card>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="text-left font-medium text-muted-foreground px-6 py-3">Agent</th>
              <th className="text-left font-medium text-muted-foreground px-6 py-3">Type</th>
              <th className="text-left font-medium text-muted-foreground px-6 py-3">CDP Wallet</th>
              <th className="text-left font-medium text-muted-foreground px-6 py-3">Daily Limit</th>
              <th className="text-left font-medium text-muted-foreground px-6 py-3">Status</th>
              <th className="text-left font-medium text-muted-foreground px-6 py-3">Vendors</th>
              <th className="text-right font-medium text-muted-foreground px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr
                key={agent.id}
                className="border-b last:border-0 hover:bg-secondary/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <Link href={`/agents/${agent.id}`} className="font-medium hover:underline">
                    {agent.name}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className="font-normal">
                    {agent.type}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono text-muted-foreground">
                      {agent.cdpWalletAddress}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Copy address</span>
                    </Button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-muted-foreground">{agent.dailyLimit} USDC</span>
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant={agent.status === 'OK' ? 'outline' : 'secondary'}
                    className={
                      agent.status === ClientStatusEnum.NEAR_LIMIT
                        ? 'text-amber-500 border-amber-500/30 bg-amber-500/10'
                        : agent.status === ClientStatusEnum.OVER_LIMIT
                          ? 'text-red-500 border-red-500/30 bg-red-500/10'
                          : agent.status === ClientStatusEnum.PAUSED
                            ? 'text-muted-foreground'
                            : ''
                    }
                  >
                    {agent.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 flex-wrap max-w-[200px]">
                    {agent.allowedVendors.slice(0, 2).map((vendor, j) => (
                      <Badge
                        key={j}
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0 h-5 font-normal"
                      >
                        {vendor}
                      </Badge>
                    ))}
                    {agent.allowedVendors.length > 2 && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0 h-5 font-normal"
                      >
                        +{agent.allowedVendors.length - 2}
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/agent/${agent.cdpWalletAddress}`}>
                      <Button variant="ghost" size="sm">
                        <Rocket className="h-4 w-4 mr-2" />
                        Launch
                      </Button>
                    </Link>
                    <Link href={`/agents/${agent.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={async () => {
                          try {
                            setLoadingId(agent.id);
                            const newStatus =
                              agent.status === ClientStatusEnum.PAUSED
                                ? ClientStatusEnum.OK
                                : ClientStatusEnum.PAUSED;
                            await updateAgent.mutateAsync({
                              id: agent.id,
                              status: newStatus,
                            });
                            if (onAction) onAction();
                          } catch (err) {
                            console.error(err);
                          } finally {
                            setLoadingId(null);
                          }
                        }}
                        disabled={loadingId === agent.id}
                      >
                        {agent.status === ClientStatusEnum.PAUSED ? (
                          <Play className="h-4 w-4" />
                        ) : (
                          <Pause className="h-4 w-4" />
                        )}
                        <span className="sr-only">Toggle</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          openModal('DELETE_AGENT', {
                            agentId: agent.id,
                            agentName: agent.name,
                            onDeleted: onAction,
                          });
                        }}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
