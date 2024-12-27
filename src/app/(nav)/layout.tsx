"use client";
import Navbar from "@/ui/Navbar";
import { Sidebar } from "@/ui/sidebar/Sidebar";
import { useSidebar } from "@/context/sidebarContext";
import clsx from "clsx";
import { useUser } from "@/context/userContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isMin } = useSidebar();
  const { loadingUser } = useUser();
  return loadingUser ? (
    <div></div>
  ) : (
    <>
      <Navbar />
      <div className="absolute h-[calc(100vh-64px)] overflow-auto w-screen dark:bg-black top-16">
        {/* min = hidden , max = displayed*/}
        <div
          className={clsx({
            "hidden ": isMin,
            "sm:block hidden": !isMin,
          })}
        >
          <Sidebar />
        </div>
        {children}
      </div>
    </>
  );
}
