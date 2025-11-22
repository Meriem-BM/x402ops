"use client";

import { OrgProvider } from "@/contexts/org-context";
import { ThemeProvider } from "@/components/theme-provider";
import PrivyProvider from "@/providers/privy-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider>
      <QueryClientProvider client={queryClient}>
        <OrgProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </OrgProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
