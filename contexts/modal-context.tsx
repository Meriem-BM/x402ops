'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export type ModalType = 'AGENT_FORM' | 'DELETE_AGENT' | null;

interface ModalContextType {
  isOpen: boolean;
  type: ModalType;
  props: Record<string, unknown>;
  openModal: (type: ModalType, props?: Record<string, unknown>) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<ModalType>(null);
  const [props, setProps] = useState<Record<string, unknown>>({});

  const openModal = useCallback((type: ModalType, props: Record<string, unknown> = {}) => {
    setType(type);
    setProps(props);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setType(null);
      setProps({});
    }, 300); // Wait for animation
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        type,
        props,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
