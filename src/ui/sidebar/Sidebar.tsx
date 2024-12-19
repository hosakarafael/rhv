"use client";

import {
  ClockIcon,
  HomeIcon,
  PlayCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { useSidebar } from "@/context/sidebarContext";
import { SidebarItem } from "./SidebarItem";
import { SidebarSubscriptionsList } from "./SidebarSubscriptionsList";
import { useUser } from "@/context/userContext";

export const Sidebar = () => {
  const { user } = useUser();
  const { isMin } = useSidebar();

  const renderSubscriptionsSection = () => {
    return (
      <div>
        <div className="divider border-t-2 border-gray-600 "></div>
        <div>
          {!isMin && (
            <h1 className="text-lg font-bold mx-5 mb-2">Subscriptions</h1>
          )}
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
      {user && renderSubscriptionsSection()}
    </div>
  );
};
