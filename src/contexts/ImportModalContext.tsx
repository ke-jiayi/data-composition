import { createContext, useContext, useState, type ReactNode } from 'react';

interface ImportModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ImportModalContext = createContext<ImportModalContextType | undefined>(undefined);

export function ImportModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ImportModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ImportModalContext.Provider>
  );
}

export function useImportModal() {
  const context = useContext(ImportModalContext);
  if (context === undefined) {
    throw new Error('useImportModal must be used within an ImportModalProvider');
  }
  return context;
}
