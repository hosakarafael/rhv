"use client";
import { Sidebar } from "@/ui/sidebar/Sidebar";
import { useSidebar } from "@/context/sidebarContext";
import clsx from "clsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isMin } = useSidebar();
  return (
    <>
      {/*min = display , max = display (from parent layout)*/}
      <div className={clsx({ "sm:block hidden": isMin, "hidden ": !isMin })}>
        <Sidebar />
      </div>
      <div
        className={clsx("sm:absolute", {
          "left-[102px] sm:w-[calc(100vw-102px)]": isMin,
          "left-[240px] sm:w-[calc(100vw-240px)]": !isMin,
        })}
      >
        {children}
      </div>
    </>
  );
}
