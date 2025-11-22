"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useModal } from "@/contexts/modal-context";
import { useAgentForm } from "@/hooks/use-agent-form";

export function AgentFormModal() {
  const { isOpen, type, closeModal, props } = useModal();
  const { values, loading, handleChange, handleSubmit } = useAgentForm(() => {
    closeModal();
    (props.onCreated as () => void)?.();
  });

  const isModalOpen = isOpen && type === "AGENT_FORM";

  const handleOpenChange = (open: boolean) => {
    if (!open) closeModal();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
          <DialogDescription>
            Create a dedicated CDP wallet with policy controls for your AI agent.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Agent Name</Label>
            <Input
              id="name"
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Research Assistant"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={values.type}
              onValueChange={(v) => handleChange("type", v)}
            >
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="app">App</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="network">Network</Label>
            <Select
              value={values.network}
              onValueChange={(v) => handleChange("network", v)}
            >
              <SelectTrigger id="network">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="base">Base Mainnet</SelectItem>
                <SelectItem value="base-sepolia">Base Sepolia</SelectItem>
                <SelectItem value="ethereum">Ethereum</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label>Policy Preset</Label>
            <RadioGroup
              value={values.preset}
              onValueChange={(v) => handleChange("preset", v)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 space-y-0">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low" className="font-normal cursor-pointer">
                  <div className="font-medium">Low Spend</div>
                  <div className="text-sm text-muted-foreground">
                    1 USDC per day
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 space-y-0">
                <RadioGroupItem value="standard" id="standard" />
                <Label
                  htmlFor="standard"
                  className="font-normal cursor-pointer"
                >
                  <div className="font-medium">Standard</div>
                  <div className="text-sm text-muted-foreground">
                    5 USDC per day
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 space-y-0">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="font-normal cursor-pointer">
                  <div className="font-medium">High Spend</div>
                  <div className="text-sm text-muted-foreground">
                    20 USDC per day
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Agent Wallet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
