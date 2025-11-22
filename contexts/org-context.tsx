"use client";

import { createContext, useContext } from "react";
import { usePrivy } from "@privy-io/react-auth";

interface OrgContextType {
  orgAddress: string | undefined;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => Promise<void>;
}

const OrgContext = createContext<OrgContextType | undefined>(undefined);

export function OrgProvider({ children }: { children: React.ReactNode }) {
  const { user, authenticated, login, logout } = usePrivy();

  const orgAddress =
    authenticated && user?.wallet?.address
      ? user.wallet.address.toLowerCase()
      : undefined;

  return (
    <OrgContext.Provider
      value={{
        orgAddress,
        isAuthenticated: authenticated,
        login,
        logout,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
}

export function useOrg() {
  const context = useContext(OrgContext);
  if (context === undefined) {
    throw new Error("useOrg must be used within an OrgProvider");
  }
  return context;
}
