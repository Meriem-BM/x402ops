'use client';

import { AgentFormModal } from '@/components/modals/agent-form-modal';
import { DeleteAgentModal } from '@/components/modals/delete-agent-modal';
import { useModal } from '@/contexts/modal-context';

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
