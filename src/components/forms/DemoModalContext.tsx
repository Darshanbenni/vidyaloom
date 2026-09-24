"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type DemoRequestType = "demo" | "workshop" | "contact";

export interface DemoModalOptions {
  requestType?: DemoRequestType;
  interest?: string;
  source?: string;
}

interface DemoModalContextType {
  isOpen: boolean;
  options: DemoModalOptions;
  openDemoModal: (options?: DemoModalOptions) => void;
  closeDemoModal: () => void;
}

const DemoModalContext = createContext<DemoModalContextType | undefined>(undefined);

export function DemoModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<DemoModalOptions>({
    requestType: "demo",
    source: "header",
  });

  const openDemoModal = useCallback((opts?: DemoModalOptions) => {
    setOptions({
      requestType: opts?.requestType || "demo",
      interest: opts?.interest,
      source: opts?.source || "header",
    });
    setIsOpen(true);
  }, []);

  const closeDemoModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <DemoModalContext.Provider
      value={{ isOpen, options, openDemoModal, closeDemoModal }}
    >
      {children}
    </DemoModalContext.Provider>
  );
}

export function useDemoModal() {
  const context = useContext(DemoModalContext);
  if (!context) {
    throw new Error("useDemoModal must be used within a DemoModalProvider");
  }
  return context;
}
