"use client";
import { useUser } from "@/context/userContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { updateToken } = useUser();

  const logout = () => {
    if (updateToken) {
      localStorage.removeItem("token");
      updateToken("");
      redirect("/");
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return <></>;
}
