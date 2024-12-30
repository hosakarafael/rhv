"use client";
import Avatar from "../components/Avatar";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useUser } from "@/context/userContext";
import { Logo } from "../components/Logo";
import { LoginButton } from "../components/LoginButton";
import { redirect, usePathname } from "next/navigation";
import { useSidebar } from "@/context/sidebarContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";

const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const { toggle } = useSidebar();
  const [query, setQuery] = useState("");

  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [activeTheme, setActiveTheme] = useState<string>("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "system" || !savedTheme) {
      applySystemTheme();
      setActiveTheme("system");
    } else {
      applyTheme(savedTheme);
      setActiveTheme(savedTheme);
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (activeTheme === "system") {
        applySystemTheme();
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [activeTheme]);

  const applyTheme = (theme: string) => {
    if (theme === "dark") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setActiveTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "system") {
      applySystemTheme();
    } else {
      applyTheme(newTheme);
    }
  };

  const applySystemTheme = () => {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (systemPrefersDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:text-white"
          >
            <div className="flex items-center gap-2 px-2 pt-2">
              <Avatar size="S" />
              <p>{user && user.name}</p>
            </div>
            <div className="divider m-1"></div>
            <li>
              <a className="justify-between">My channel</a>
            </li>
            <li>
              <span
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className={clsx("menu-dropdown-toggle", {
                  "menu-dropdown-show": showThemeMenu,
                })}
              >
                Theme
              </span>
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
                    onClick={() => handleThemeChange("light")}
                  >
                    Light
                  </button>
                </li>
                <li>
                  <button
                    className={clsx({
                      active: activeTheme == "dark",
                    })}
                    onClick={() => handleThemeChange("dark")}
                  >
                    Dark
                  </button>
                </li>
                <li>
                  <button
                    className={clsx({
                      active: activeTheme == "system",
                    })}
                    onClick={() => handleThemeChange("system")}
                  >
                    System
                  </button>
                </li>
              </ul>
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
                className="sm:w-96 pl-4 pr-10 py-2 border border-neutral-600 rounded-l-full rounded-r-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent z-10 dark:bg-black dark:text-white"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
              />
              <button className="border border-neutral-600 py-[7.5px] rounded-r-full border-l-0 z-0 cursor-pointer bg-gray-200 dark:bg-neutral-800">
                <MagnifyingGlassIcon className="mx-4 h-[25px] w-[25px] dark:text-white" />
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
