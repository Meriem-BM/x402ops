import { OrgProvider } from "@/contexts/org-context";
import { ThemeProvider } from "@/components/theme-provider";
import PrivyProvider from "@/providers/privy-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider>
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
    </PrivyProvider>
  );
}
