"use client";
import Avatar from "@/components/Avatar";
import { useSidebar } from "@/context/sidebarContext";
import { useUser } from "@/context/userContext";
import clsx from "clsx";
import Link from "next/link";

export const SidebarSubscriptionsList = () => {
  const { user } = useUser();
  const { isMin } = useSidebar();

  return user?.subscribedUsers?.map((subs) => (
    <div key={subs.id} className="mx-2">
      <Link href={`/channel/${subs.id}`}>
        <div
          className={clsx(
            "flex items-center gap-3 p-2 rounded-lg  hover:bg-gray-200 hover:dark:bg-neutral-800",
            { "justify-center": isMin }
          )}
        >
          <Avatar
            size="XS"
            userId={subs.id}
            username={subs.name}
            profileImageUrl={subs.profileImageUrl}
          />
          {!isMin && <span className="dark:text-white">{subs.name}</span>}
        </div>
      </Link>
    </div>
  ));
};
