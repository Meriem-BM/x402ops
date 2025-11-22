"use client";

import { PrivyProvider as ReactPrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig } from "@privy-io/wagmi";
import { base } from "viem/chains";
import { http } from "wagmi";

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});

export default function PrivyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactPrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        loginMethods: ["wallet", "email", "google"],
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
        },
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
        defaultChain: base,
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ReactPrivyProvider>
  );
}
