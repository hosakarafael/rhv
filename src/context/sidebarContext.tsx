"use client";

import { createContext, useContext, useState } from "react";

interface SidebarContextInterface {
  isMin: boolean;
  toggle: () => void;
  update: (isMin: boolean) => void;
}

const SidebarContext = createContext<Partial<SidebarContextInterface>>({});

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const localValue = localStorage.getItem("min");

  const [isMin, setIsMin] = useState(localValue === "true" ? true : false);

  const toggle = () => {
    setIsMin(!isMin);
    localStorage.setItem("min", String(!isMin));
  };

  const update = (isMin: boolean) => {
    setIsMin(isMin);
  };

  return (
    <SidebarContext.Provider
      value={
        {
          isMin,
          toggle,
          update,
        } as SidebarContextInterface
      }
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
