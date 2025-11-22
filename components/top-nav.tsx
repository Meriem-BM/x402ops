"use client";

import { Bell, LogOut, Menu, User, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarContent } from "@/components/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { useState } from "react";
import { useOrg } from "@/contexts/org-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { shortenAddress } from "@/utils/address";

export function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { logout, orgAddress, login } = useOrg();

  const getTitle = () => {
    if (pathname === "/") return "Dashboard";
    const segment = pathname.split("/")[1];
    return segment
      ? segment.charAt(0).toUpperCase() + segment.slice(1)
      : "Dashboard";
  };

  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6 sticky top-0 z-10 bg-opacity-100">
      <div className="flex items-center gap-4 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="-ml-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-sidebar border-r">
            <div className="h-full" onClick={() => setOpen(false)}>
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
        <span className="font-semibold">x402Ops</span>
      </div>

      <div className="hidden md:flex items-center">
        <h1 className="text-lg font-medium">{getTitle()}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border bg-secondary/30 text-sm">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-muted-foreground">Base Mainnet</span>
        </div>
        <ModeToggle />
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground rounded-full hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Account</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {orgAddress ? shortenAddress(orgAddress) : "Not connected"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => login()}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Disconnect</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
