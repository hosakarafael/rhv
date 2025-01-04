"use client";
import { useTheme } from "@/context/themeContext";
import { MoonIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";

export const ThemeMenuItem = () => {
  const { activeTheme, updateTheme } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = useState(false);

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
