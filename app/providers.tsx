'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { ModalRoot } from '@/components/modal-root';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ModalProvider } from '@/contexts/modal-context';
import { OrgProvider } from '@/contexts/org-context';
import PrivyProvider from '@/providers/privy-provider';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider>
      <QueryClientProvider client={queryClient}>
        <OrgProvider>
          <ModalProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <ModalRoot />
              <Toaster />
            </ThemeProvider>
          </ModalProvider>
        </OrgProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
