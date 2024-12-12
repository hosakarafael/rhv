"use client";
import Avatar from "@/components/Avatar";
import { useUser } from "@/context/userContext";
import Link from "next/link";

export const SidebarSubscriptionsList = () => {
  const { user } = useUser();

  return user?.subscribedUsers?.map((subs) => (
    <div key={subs.id} className="mx-2">
      <Link href={"channel/1"}>
        <div className="flex items-center gap-3 p-2 rounded-lg  hover:dark:bg-base-100">
          <Avatar size="XS" />
          <span>{subs.name}</span>
        </div>
      </Link>
    </div>
  ));
};
