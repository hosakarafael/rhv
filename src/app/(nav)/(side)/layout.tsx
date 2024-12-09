"use client";
import { SideNav } from "@/components/SideNav";
import { useSidebar } from "@/context/sidebarContext";
import clsx from "clsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isMin } = useSidebar();
  return (
    <>
      <div className="sm:block hidden">
        <SideNav />
      </div>
      <div
        className={clsx("sm:absolute", {
          "left-[102px] sm:w-[calc(100vw-120px)]": isMin,
          "left-[240px] sm:w-[calc(100vw-240px)]": !isMin,
        })}
      >
        {children}
      </div>
    </>
  );
}
