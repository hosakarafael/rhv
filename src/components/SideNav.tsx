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
    <div className="flex flex-col p-1 fixed z-10">
      <Link href="/">
        <div
          className={
            "py-3 rounded-lg hover:bg-base-100 flex flex-col items-center"
          }
        >
          <HomeIcon
            className={clsx("mx-4 h-[30px] w-[30px] text-gray-500", {
              "text-white": pathname === "/",
            })}
          />
          <span
            className={clsx("text-xs font-bold text-gray-500", {
              "text-white": pathname === "/",
            })}
          >
            Home
          </span>
        </div>
      </Link>
      <Link href="/subscriptions">
        <div
          className={
            "py-3 rounded-lg hover:bg-base-100 flex flex-col items-center"
          }
        >
          <UserGroupIcon
            className={clsx("mx-4 h-[30px] w-[30px] text-gray-500", {
              "text-white": pathname === "/subscriptions",
            })}
          />
          <span
            className={clsx("text-xs font-bold text-gray-500", {
              "text-white": pathname === "/subscriptions",
            })}
          >
            Subscriptions
          </span>
        </div>
      </Link>
      <Link href="/history">
        <div
          className={
            "py-3 rounded-lg hover:bg-base-100 flex flex-col items-center"
          }
        >
          <ClockIcon
            className={clsx("mx-4 h-[30px] w-[30px] text-gray-500", {
              "text-white": pathname === "/history",
            })}
          />
          <span
            className={clsx("text-xs font-bold text-gray-500", {
              "text-white": pathname === "/history",
            })}
          >
            History
          </span>
        </div>
      </Link>
      <Link href="/myvideos">
        <div
          className={
            "py-3 rounded-lg hover:bg-base-100 flex flex-col items-center"
          }
        >
          <PlayCircleIcon
            className={clsx("mx-4 h-[30px] w-[30px] text-gray-500", {
              "text-white": pathname === "/myvideos",
            })}
          />
          <span
            className={clsx("text-xs font-bold text-gray-500", {
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
