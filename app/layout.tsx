import type React from "react";
import type { Metadata } from "next";
import "../styles/globals.css";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "x402Ops",
  description:
    "Modern control panel for AI agents and services using Coinbase CDP wallets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
