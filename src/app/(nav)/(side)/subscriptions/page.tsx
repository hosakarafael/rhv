"use client";

import { LoginButton } from "@/components/LoginButton";
import { VideoGrid } from "@/components/VideoGrid";
import { useUser } from "@/context/userContext";
import { VideoType } from "@/lib/definitions";
import { fetchByUserIdsAndPublic } from "@/services/publicVideoService";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [videos, setVideos] = useState<VideoType[] | null>(null);
  const { user } = useUser();
  const pathname = usePathname();

  async function init() {
    if (user) {
      const ids = user.subscribedUsers.map((subs) => subs.id);
      const res = await fetchByUserIdsAndPublic(ids);
      setVideos(res);
    }
  }

  useEffect(() => {
    init();
  }, [user]);

  const notLoggedSubscription = () => {
    return (
      <div className="p-10 flex flex-col justify-center items-center mt-40">
        <h1 className="text-4xl font-extrabold mb-5">Subscriptions</h1>
        <p className="mb-7">
          Log in to see the latest updates from your favorite channels
        </p>
        <LoginButton continueTo={pathname} />
      </div>
    );
  };

  const notSubscribedAnyChannel = () => {
    return (
      <div className="flex justify-center pt-10">
        <p className="text-4xl font-bold">
          You are not subscribed to any channel!
        </p>
      </div>
    );
  };

  return (
    <>
      {user ? (
        user.subscribedUsers.length > 0 ? (
          videos ? (
            <VideoGrid videos={videos} />
          ) : (
            <></>
          )
        ) : (
          notSubscribedAnyChannel()
        )
      ) : (
        notLoggedSubscription()
      )}
    </>
  );
}
