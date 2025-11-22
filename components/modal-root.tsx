"use client";

import { useModal } from "@/contexts/modal-context";
import { AgentFormModal } from "@/components/modals/agent-form-modal";
import { DeleteAgentModal } from "@/components/modals/delete-agent-modal";

export function ModalRoot() {
  const { isOpen } = useModal();

  if (!isOpen) return null;

  return (
    <>
      <AgentFormModal />
      <DeleteAgentModal />
    </>
  );
}
