"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Bot, Activity, Settings, Wallet } from "lucide-react"
import { cn } from "@/utils/tw-utils"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Agents", href: "/agents", icon: Bot },
  { name: "Activity", href: "/activity", icon: Activity },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function SidebarContent() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-sidebar bg-opacity-100">
      <div className="h-16 flex items-center px-6 border-b">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
            <div className="h-2 w-2 bg-primary-foreground rounded-full" />
          </div>
          x402Ops
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 p-2 rounded-md bg-secondary/50">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <Wallet className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium">Connected Org</span>
            <span className="text-xs text-muted-foreground font-mono">0x12...89ab</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  return (
    <div className="w-64 border-r bg-sidebar bg-opacity-100 flex-col h-screen sticky top-0 hidden md:flex">
      <SidebarContent />
    </div>
  )
}
