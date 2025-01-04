"use client";
import Avatar from "../../components/Avatar";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ArrowRightStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "@/context/userContext";
import { Logo } from "../../components/Logo";
import { LoginButton } from "../../components/LoginButton";
import { redirect, usePathname } from "next/navigation";
import { useSidebar } from "@/context/sidebarContext";
import Link from "next/link";
import { useState } from "react";
import { GuestMenu } from "./GuestMenu";
import { ThemeMenuItem } from "./ThemeMenuItem";
import { UserMenu } from "./UserMenu";

const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const { toggle } = useSidebar();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    redirect("/search?query=" + query);
  };

  const renderUserSection = () => {
    return (
      <div className="flex gap-5">
        <Link
          href={"/upload"}
          className="btn dark:btn-neutral rounded-full text-sm"
        >
          Upload video
        </Link>
        <UserMenu />
      </div>
    );
  };

  const renderGuestSection = () => {
    return (
      <div className="flex gap-5">
        <GuestMenu />
        <LoginButton continueTo={pathname} />
      </div>
    );
  };

  return (
    <div className="navbar bg-white dark:bg-black justify-between fixed z-20">
      <div>
        <div
          onClick={toggle}
          className="cursor-pointer hover:bg-gray-200 hover:dark:bg-neutral-800 rounded-full p-2 mx-2 ease-in-out duration-300 sm:block hidden"
        >
          <Bars3Icon className="h-[30px] w-[30px] dark:text-white" />
        </div>

        <Logo />
      </div>

      <div className="form-control">
        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>
            <div className="relative w-full max-w-2xl flex items-center">
              <input
                type="text"
                className="sm:w-96 pl-4 pr-10 py-2 border border-gray-300 dark:border-neutral-600 rounded-l-full rounded-r-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent z-10 dark:bg-black dark:text-white"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
              />
              <button className="border border-gray-300 dark:border-neutral-600 py-[7.5px] rounded-r-full border-l-0 z-0 cursor-pointer bg-gray-200 dark:bg-neutral-800">
                <MagnifyingGlassIcon className="mx-4 h-[25px] w-[25px] dark:text-white" />
              </button>
            </div>
          </form>
        </div>
      </div>
      {user ? renderUserSection() : renderGuestSection()}
    </div>
  );
};

export default Navbar;
