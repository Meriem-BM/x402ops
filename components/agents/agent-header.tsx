"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/modal-context";

export function AgentHeader({ onCreated }: { onCreated?: () => void }) {
  const { openModal } = useModal();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Agents</h1>
        <p className="text-muted-foreground mt-1">
          Manage AI agents, services, and their CDP wallets.
        </p>
      </div>
      <Button
        className="gap-2"
        onClick={() => openModal("AGENT_FORM", { onCreated })}
      >
        <Plus className="h-4 w-4" />
        Add Agent
      </Button>
    </div>
  );
}
