"use client";
import { UserType } from "@/lib/definitions";
import { getSubjectFromToken, isValidToken } from "@/lib/jwt";
import { fetchUserByEmail } from "@/services/userService";
import { createContext, useContext, useEffect, useState } from "react";

interface SidebarContextInterface {
  isMin: boolean;
  toggle: () => void;
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

  return (
    <SidebarContext.Provider
      value={
        {
          isMin,
          toggle,
        } as SidebarContextInterface
      }
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
