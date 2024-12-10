"use client";
import NavBar from "@/components/NavBar";
import { SideNav } from "@/components/SideNav";
import { useSidebar } from "@/context/sidebarContext";
import clsx from "clsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isMin } = useSidebar();
  return (
    <>
      <NavBar />
      <div className="absolute h-[calc(100vh-64px)] overflow-auto w-screen dark:bg-black top-16">
        {/* min = hidden , max = displayed*/}
        <div
          className={clsx({
            "hidden ": isMin,
            "sm:block hidden": !isMin,
          })}
        >
          <SideNav />
        </div>
        <div
          className={clsx("sm:absolute", {
            "left-[240px] sm:w-[calc(100vw-240px)]": !isMin,
          })}
        >
          {children}
        </div>
      </div>
    </>
  );
}
