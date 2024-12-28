"use client";
import Avatar from "../components/Avatar";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Tooltip from "../components/Tooltip";
import { useUser } from "@/context/userContext";
import { Logo } from "../components/Logo";
import { LoginButton } from "../components/LoginButton";
import { redirect, usePathname } from "next/navigation";
import { useSidebar } from "@/context/sidebarContext";
import Link from "next/link";
import { useState } from "react";

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
        <Link href={"/upload"} className="btn btn-neutral rounded-full text-sm">
          Upload video
        </Link>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <Avatar size="S" />
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <div className="flex items-center gap-2 px-2 pt-2">
              <Avatar size="S" />
              <p>{user && user.name}</p>
            </div>
            <div className="divider m-1"></div>
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <Link href={"/logout"}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="navbar bg-base-100 justify-between fixed z-20">
      <div>
        <div
          onClick={toggle}
          className="cursor-pointer hover:bg-slate-500 rounded-full p-2 mx-2 ease-in-out duration-300 sm:block hidden"
        >
          <Bars3Icon className="h-[30px] w-[30px]" />
        </div>

        <Logo />
      </div>

      <div className="form-control">
        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>
            <div className="relative w-full max-w-2xl flex items-center">
              <input
                type="text"
                className="sm:w-96 pl-4 pr-10 py-2 border border-gray-500 rounded-l-full rounded-r-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent z-10  "
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
              />
              <button className="border border-gray-500 py-[7.5px] rounded-r-full z-0 cursor-pointer">
                <MagnifyingGlassIcon className="mx-4 h-[25px] w-[25px] text-white" />
              </button>
            </div>
          </form>
        </div>
      </div>
      {user ? renderUserSection() : <LoginButton continueTo={pathname} />}
    </div>
  );
};

export default Navbar;
