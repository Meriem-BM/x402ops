"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCreateAgent } from "@/hooks/useAgent"
import { useOrg } from "@/contexts/org-context"

export function AgentHeader({
  onCreated,
}: {
  onCreated?: () => void;
}) {
  const { orgAddress } = useOrg();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<"agent" | "service" | "app">("agent");
  const [network, setNetwork] = useState("base");
  const [preset, setPreset] = useState<"low" | "standard" | "high">("standard");
  
  const { mutateAsync: createAgent, isPending: loading } = useCreateAgent();

  const presetToLimit = (p: string) => {
    switch (p) {
      case "low":
        return 1;
      case "high":
        return 20;
      default:
        return 5;
    }
  };

  async function handleCreate() {
    if (!name.trim()) return;
    if (!orgAddress) return; // Should maybe show error or disable button
    
    try {
      await createAgent({
        orgAddress,
        name: name.trim(),
        type,
        network,
        dailyLimit: presetToLimit(preset),
        allowedVendors: [],
      });

      setOpen(false);
      setName("");
      setType("agent");
      setNetwork("base");
      setPreset("standard");
      onCreated?.();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Agents</h1>
        <p className="text-muted-foreground mt-1">
          Manage AI agents, services, and their CDP wallets.
        </p>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Agent
          </Button>
        </DialogTrigger>
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
              <Input id="name" value={name} onChange={(e) => setName((e.target as HTMLInputElement).value)} placeholder="e.g. Research Assistant" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={(v: string) => setType(v as "agent" | "service" | "app") }>
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
              <Select value={network} onValueChange={(v) => setNetwork(v)}>
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
              <RadioGroup value={preset} onValueChange={(v: string) => setPreset(v as "low" | "standard" | "high") } className="space-y-3">
                <div className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="font-normal cursor-pointer">
                    <div className="font-medium">Low Spend</div>
                    <div className="text-sm text-muted-foreground">1 USDC per day</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="font-normal cursor-pointer">
                    <div className="font-medium">Standard</div>
                    <div className="text-sm text-muted-foreground">5 USDC per day</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="font-normal cursor-pointer">
                    <div className="font-medium">High Spend</div>
                    <div className="text-sm text-muted-foreground">20 USDC per day</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={loading}>
              {loading ? "Creating..." : "Create Agent Wallet"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

