'use client';

import { useState } from 'react';

import { Settings } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';

interface PolicyCardProps {
  name: string;
  dailyLimit: number;
  maxPerTx: number;
  vendors: string[];
}

export function PolicyCard({ name, dailyLimit, maxPerTx, vendors }: PolicyCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">Policy</CardTitle>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <Settings className="h-3 w-3" />
              Edit
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit Policy</SheetTitle>
              <SheetDescription>
                Configure spending limits and vendor rules for {name}.
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-6 py-6">
              <div className="space-y-4">
                <h3 className="font-medium">Spend Limits</h3>
                <div className="space-y-2">
                  <Label htmlFor="daily-limit">Daily Limit (USDC)</Label>
                  <Input id="daily-limit" type="number" defaultValue={dailyLimit} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-tx">Max Per Transaction (USDC)</Label>
                  <Input id="max-tx" type="number" defaultValue={maxPerTx} step="0.1" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Vendor Rules</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="allowlist" className="font-normal">
                      Block non-allowlisted vendors
                    </Label>
                    <Switch id="allowlist" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>Allowed Vendors</Label>
                    <div className="flex flex-wrap gap-2">
                      {vendors.map((vendor, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {vendor}
                        </Badge>
                      ))}
                    </div>
                    <Input placeholder="Add vendor address or name..." className="text-sm" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Risk Controls</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="review" className="font-normal">
                      Manual review above 2 USDC
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Requires approval for large transactions
                    </p>
                  </div>
                  <Switch id="review" />
                </div>
              </div>
            </div>
            <SheetFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save & Update Policy</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Daily Limit</div>
          <div className="text-sm font-medium">{dailyLimit} USDC</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Max Per Transaction</div>
          <div className="text-sm font-medium">{maxPerTx} USDC</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Allowed Vendors</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {vendors.map((vendor, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="text-[10px] px-1.5 py-0 h-5 font-normal"
              >
                {vendor}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
