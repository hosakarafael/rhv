"use client";

import {
  ClockIcon,
  HomeIcon,
  PlayCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import {
  ClockIcon as ClockIconSolid,
  HomeIcon as HomeIconSolid,
  PlayCircleIcon as PlayCircleIconSolid,
  UserGroupIcon as UserGroupIconSolid,
} from "@heroicons/react/24/solid";
import { useSidebar } from "@/context/sidebarContext";
import { SidebarItem } from "./SidebarItem";
import { SidebarSubscriptionsList } from "./SidebarSubscriptionsList";
import { useUser } from "@/context/userContext";
import { useTranslations } from "next-intl";

export const Sidebar = () => {
  const t = useTranslations("Sidebar");
  const { user } = useUser();
  const { isMin } = useSidebar();

  const renderSubscriptionsSection = () => {
    return (
      <div>
        <div className="border-t-2 my-2 border-neutral-400"></div>
        <div>
          {!isMin && (
            <h1 className="text-lg font-bold mx-5 dark:text-white">
              {t("subscriptionsTitle")}
            </h1>
          )}
          <SidebarSubscriptionsList />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2 p-2 fixed bg-white dark:bg-black h-screen z-10 overflow-auto">
      <SidebarItem
        href="/"
        text={t("home")}
        Icon={HomeIcon}
        ActiveIcon={HomeIconSolid}
      />
      <SidebarItem
        href="/subscriptions"
        text={t("subscriptions")}
        Icon={UserGroupIcon}
        ActiveIcon={UserGroupIconSolid}
      />
      <SidebarItem
        href="/history"
        text={t("history")}
        Icon={ClockIcon}
        ActiveIcon={ClockIconSolid}
      />
      <SidebarItem
        href="/myvideos"
        text={t("myVideos")}
        Icon={PlayCircleIcon}
        ActiveIcon={PlayCircleIconSolid}
      />
      {user && renderSubscriptionsSection()}
    </div>
  );
};
