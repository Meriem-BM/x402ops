import type React from 'react';

import type { Metadata } from 'next';
import '../styles/globals.css';
import { Geist, Geist_Mono } from 'next/font/google';

import { Providers } from '@/app/providers';

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'x402Ops',
  description: 'Modern control panel for AI agents and services using Coinbase CDP wallets.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
