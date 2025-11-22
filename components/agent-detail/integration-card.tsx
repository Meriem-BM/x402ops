import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IntegrationCardProps {
  id: string;
  network: string;
}

export function IntegrationCard({ id, network }: IntegrationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration</CardTitle>
        <CardDescription>Configure your AI agent to use this CDP wallet when making x402 payments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm font-medium mb-2">Environment Variables</div>
          <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs space-y-1">
            <div>AGENTPAY_WALLET_ID={id}</div>
            <div>CDP_API_KEY=your_api_key_here</div>
            <div>CDP_NETWORK={network.toLowerCase().replace(" ", "-")}</div>
          </div>
        </div>
        <div>
          <div className="text-sm font-medium mb-2">Example Code</div>
          <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto">
            <pre className="text-muted-foreground">{`import { CDP, fetchWithPaymentX402 } from '@agentpay/sdk'

const cdp = new CDP({
  walletId: process.env.AGENTPAY_WALLET_ID,
  apiKey: process.env.CDP_API_KEY,
})

// Make a payment with automatic policy enforcement
const response = await fetchWithPaymentX402(
  'https://api.example.com/endpoint',
  { 
    wallet: cdp,
    amount: 0.05, // USDC
  }
)`}</pre>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Policy rules will be enforced automatically on every transaction. Blocked transactions will throw an
          error.
        </p>
      </CardContent>
    </Card>
  );
}

