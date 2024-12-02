"use client";

import { LoginButton } from "@/components/LoginButton";
import { VideoGrid } from "@/components/VideoGrid";
import { useUser } from "@/context/userContext";
import { VideoType } from "@/lib/definitions";
import { fetchByUserIds } from "@/services/publicVideoService";
import { useEffect, useState } from "react";

export default function Page() {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const { user } = useUser();

  async function init() {
    if (user) {
      const ids = user.subscribedUsers.map((subs) => subs.id);
      const res = await fetchByUserIds(ids);
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
        <LoginButton />
      </div>
    );
  };

  return <>{user ? <VideoGrid videos={videos} /> : notLoggedSubscription()}</>;
}
