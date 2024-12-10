"use client";
import { SideNav } from "@/components/SideNav";
import { useSidebar } from "@/context/sidebarContext";
import clsx from "clsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isMin } = useSidebar();
  return (
    <>
      {/*min = display , max = display (from parent layout)*/}
      <div className={clsx({ "sm:block hidden": isMin, "hidden ": !isMin })}>
        <SideNav />
      </div>
      <div
        className={clsx("sm:absolute", {
          "left-[102px] sm:w-[calc(100vw-120px)]": isMin,
        })}
      >
        {children}
      </div>
    </>
  );
}
