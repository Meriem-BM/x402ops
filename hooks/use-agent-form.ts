"use client";

import { useState } from "react";
import { useCreateAgent } from "@/hooks/useAgent";
import { useOrg } from "@/contexts/org-context";
import { ClientType } from "@/types/client";

export type AgentFormValues = {
  name: string;
  type: ClientType;
  network: string;
  preset: "low" | "standard" | "high";
};

const defaultValues: AgentFormValues = {
  name: "",
  type: "agent",
  network: "base",
  preset: "standard",
};

export function useAgentForm(onSuccess?: () => void) {
  const { orgAddress } = useOrg();
  const [values, setValues] = useState<AgentFormValues>(defaultValues);
  const { mutateAsync: createAgent, isPending: loading } = useCreateAgent();

  const handleChange = (key: keyof AgentFormValues, value: string | number) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const presetToLimit = (p: string) => {
    switch (p) {
      case "low":
        return 1;
      case "high":
        return 20;
      default:
        return 5;
    }
  };

  const handleSubmit = async () => {
    if (!values.name.trim()) return;
    if (!orgAddress) return;

    try {
      await createAgent({
        orgAddress,
        name: values.name.trim(),
        type: values.type,
        network: values.network,
        dailyLimit: presetToLimit(values.preset),
        allowedVendors: [],
      });

      setValues(defaultValues);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return {
    values,
    loading,
    handleChange,
    handleSubmit,
    setValues,
  };
}
