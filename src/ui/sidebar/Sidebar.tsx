"use client";
import Link from "next/link";
import Tooltip from "../../components/Tooltip";
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
import Avatar from "../../components/Avatar";
import { SidebarItem } from "./SidebarItem";
import { SidebarSubscriptionsList } from "./SidebarSubscriptionsList";

export const Sidebar = () => {
  const renderSubscriptionsSection = () => {
    return (
      <div>
        <div className="divider border-t-2 border-gray-600 "></div>
        <div>
          <h1 className="text-lg font-bold mx-5 mb-2">Subscriptions</h1>
          <SidebarSubscriptionsList />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2 p-2 fixed dark:bg-black h-screen z-10 overflow-auto">
      <SidebarItem href="/" text="Home" Icon={HomeIcon} />
      <SidebarItem
        href="/subscriptions"
        text="Subscriptions"
        Icon={UserGroupIcon}
      />
      <SidebarItem href="/history" text="History" Icon={ClockIcon} />
      <SidebarItem href="/myvideos" text="My videos" Icon={PlayCircleIcon} />
      {renderSubscriptionsSection()}
    </div>
  );
};
