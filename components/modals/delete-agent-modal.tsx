'use client';

import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useModal } from '@/contexts/modal-context';
import { useDeleteAgent } from '@/hooks/useAgent';

export function DeleteAgentModal() {
  const { isOpen, type, closeModal, props } = useModal();
  const deleteAgent = useDeleteAgent();
  const [loading, setLoading] = useState(false);

  const isModalOpen = isOpen && type === 'DELETE_AGENT';
  const agentId = props.agentId as string;
  const agentName = props.agentName as string;

  const handleOpenChange = (open: boolean) => {
    if (!open) closeModal();
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteAgent.mutateAsync(agentId);
      (props.onDeleted as () => void)?.();
      closeModal();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={isModalOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the agent <strong>{agentName}</strong> and remove it from
            your organization. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="bg-destructive text-white hover:bg-destructive/90"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Agent'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
