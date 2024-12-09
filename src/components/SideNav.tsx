"use client";
import Link from "next/link";
import Tooltip from "./Tooltip";
import {
  ClockIcon,
  HomeIcon,
  PlayCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSidebar } from "@/context/sidebarContext";

export const SideNav = () => {
  const pathname = usePathname();
  const { isMin } = useSidebar();

  const baseIconContainerStyle = clsx(
    "py-3 rounded-lg hover:bg-base-100 flex items-center",
    { "flex-col": isMin },
    { "pr-14": !isMin }
  );
  const baseIconStyle = clsx("mx-4 h-[30px] w-[30px] text-gray-500");
  const baseIconTextStyle = clsx("text-lg text-gray-500", {
    "text-xs font-bold": isMin,
  });

  return (
    <div className="flex flex-col m-2 fixed z-10">
      <Link href="/">
        <div
          className={clsx(baseIconContainerStyle, {
            "bg-base-100": pathname === "/",
          })}
        >
          <HomeIcon
            className={clsx(baseIconStyle, {
              "text-white": pathname === "/",
            })}
          />
          <span
            className={clsx(baseIconTextStyle, {
              "text-white": pathname === "/",
            })}
          >
            Home
          </span>
        </div>
      </Link>
      <Link href="/subscriptions">
        <div
          className={clsx(baseIconContainerStyle, {
            "bg-base-100": pathname === "/subscriptions",
          })}
        >
          <UserGroupIcon
            className={clsx(baseIconStyle, {
              "text-white": pathname === "/subscriptions",
            })}
          />
          <span
            className={clsx(baseIconTextStyle, {
              "text-white": pathname === "/subscriptions",
            })}
          >
            Subscriptions
          </span>
        </div>
      </Link>
      <Link href="/history">
        <div
          className={clsx(baseIconContainerStyle, {
            "bg-base-100": pathname === "/history",
          })}
        >
          <ClockIcon
            className={clsx(baseIconStyle, {
              "text-white": pathname === "/history",
            })}
          />
          <span
            className={clsx(baseIconTextStyle, {
              "text-white": pathname === "/history",
            })}
          >
            History
          </span>
        </div>
      </Link>
      <Link href="/myvideos">
        <div
          className={clsx(baseIconContainerStyle, {
            "bg-base-100": pathname === "/myvideos",
          })}
        >
          <PlayCircleIcon
            className={clsx(baseIconStyle, {
              "text-white": pathname === "/myvideos",
            })}
          />
          <span
            className={clsx(baseIconTextStyle, {
              "text-white": pathname === "/myvideos",
            })}
          >
            My videos
          </span>
        </div>
      </Link>
    </div>
  );
};
