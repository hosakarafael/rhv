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

export const SideNav = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-20 my-10 mx-5 absolute">
      <Tooltip label="Home">
        <Link href="/">
          <div
            className={clsx({
              "py-3 rounded-lg hover:bg-base-100": true,
              "bg-base-100": pathname === "/",
            })}
          >
            <HomeIcon
              className={clsx("mx-4 h-[30px] w-[30px] text-gray-500", {
                "text-white": pathname === "/",
              })}
            />
          </div>
        </Link>
      </Tooltip>
      <Tooltip label="Subscriptions">
        <Link href="/subscriptions">
          <div
            className={clsx({
              "py-3 rounded-lg hover:bg-base-100": true,
              "bg-base-100": pathname === "/subscriptions",
            })}
          >
            <UserGroupIcon
              className={clsx("mx-4 h-[30px] w-[30px] text-gray-500", {
                "text-white": pathname === "/subscriptions",
              })}
            />
          </div>
        </Link>
      </Tooltip>
      <Tooltip label="History">
        <Link href="/history">
          <div
            className={clsx({
              "py-3 rounded-lg hover:bg-base-100": true,
              "bg-base-100": pathname === "/history",
            })}
          >
            <ClockIcon
              className={clsx("mx-4 h-[30px] w-[30px] text-gray-500", {
                "text-white": pathname === "/history",
              })}
            />
          </div>
        </Link>
      </Tooltip>
      <Tooltip label="My videos">
        <Link href="/myvideos">
          <div
            className={clsx({
              "py-3 rounded-lg hover:bg-base-100": true,
              "bg-base-100": pathname === "/myvideos",
            })}
          >
            <PlayCircleIcon
              className={clsx("mx-4 h-[30px] w-[30px] text-gray-500", {
                "text-white": pathname === "/myvideos",
              })}
            />
          </div>
        </Link>
      </Tooltip>
    </div>
  );
};
