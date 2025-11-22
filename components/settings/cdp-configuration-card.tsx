import { ExternalLink, Key, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function CDPConfigurationCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <CardTitle>CDP Configuration</CardTitle>
        </div>
        <CardDescription>
          Coinbase Developer Platform integration settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="text-sm font-medium mb-1">CDP Project ID</div>
            <code className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
              proj_abc123xyz
            </code>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">API Key Status</div>
            <Badge
              variant="outline"
              className="text-green-500 border-green-500/30 bg-green-500/10"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5" />
              Connected
            </Badge>
          </div>
        </div>
        <Separator />
        <div>
          <div className="text-sm font-medium mb-2">Default Network</div>
          <div className="text-sm text-muted-foreground">Base Mainnet</div>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Key className="h-4 w-4" />
          Manage Keys in CDP
          <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
      </CardContent>
    </Card>
  )
}

