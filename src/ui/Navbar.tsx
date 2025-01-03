"use client";
import Avatar from "../components/Avatar";
import {
  Bars3Icon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  ArrowRightStartOnRectangleIcon,
  MoonIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "@/context/userContext";
import { Logo } from "../components/Logo";
import { LoginButton } from "../components/LoginButton";
import { redirect, usePathname } from "next/navigation";
import { useSidebar } from "@/context/sidebarContext";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { useTheme } from "@/context/themeContext";

const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const { toggle } = useSidebar();
  const [query, setQuery] = useState("");

  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const { activeTheme, updateTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    redirect("/search?query=" + query);
  };

  const renderThemeMenuItem = () => {
    return (
      <li>
        <div
          onClick={() => setShowThemeMenu(!showThemeMenu)}
          className={clsx("menu-dropdown-toggle", {
            "menu-dropdown-show": showThemeMenu,
          })}
        >
          <MoonIcon className="w-[20px] my-2" />
          Theme
        </div>
        <ul
          className={clsx("menu-dropdown", {
            "menu-dropdown-show": showThemeMenu,
          })}
        >
          <li>
            <button
              className={clsx({
                active: activeTheme == "light",
              })}
              onClick={() => updateTheme && updateTheme("light")}
            >
              <div className="my-2">Light</div>
            </button>
          </li>
          <li>
            <button
              className={clsx({
                active: activeTheme == "dark",
              })}
              onClick={() => updateTheme && updateTheme("dark")}
            >
              <div className="my-2">Dark</div>
            </button>
          </li>
          <li>
            <button
              className={clsx({
                active: activeTheme == "system",
              })}
              onClick={() => updateTheme && updateTheme("system")}
            >
              <div className="my-2">System</div>
            </button>
          </li>
        </ul>
      </li>
    );
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
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            {user && (
              <Avatar
                size="S"
                userId={user.id}
                username={user.name}
                profileImageUrl={user.profileImageUrl}
              />
            )}
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:text-white"
          >
            <div className="flex items-center gap-2 px-2 pt-2">
              {user && (
                <Avatar
                  size="S"
                  userId={user.id}
                  username={user.name}
                  profileImageUrl={user.profileImageUrl}
                />
              )}
              <p>{user && user.name}</p>
            </div>
            <div className="divider m-1"></div>
            <li>
              <div>
                <UserIcon className="w-[20px]" />
                <Link href={"/channel/" + user?.id} className="my-2">
                  My channel
                </Link>
              </div>
            </li>
            {renderThemeMenuItem()}
            <li>
              <div>
                <ArrowRightStartOnRectangleIcon className="w-[20px]" />
                <Link className="my-2" href={"/logout"}>
                  Logout
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderGuestSection = () => {
    return (
      <div className="flex gap-5">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle dark:text-white"
          >
            <EllipsisVerticalIcon className="w-[30px]" />
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:text-white"
          >
            {renderThemeMenuItem()}
          </ul>
        </div>
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
