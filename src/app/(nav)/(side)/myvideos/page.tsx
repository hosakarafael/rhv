"use client";
import { useUser } from "@/context/userContext";
import { VideoType } from "@/lib/definitions";
import { fetchAllVideosByUserId } from "@/services/videoService";
import { MyVideos } from "@/ui/myvideos/MyVideos";
import { MyVideosSkeleton } from "@/ui/myvideos/MyVideosSkeleton";
import { useEffect, useState } from "react";

export default function Page() {
  const { loadingUser, user, token } = useUser();
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      if (user && token) {
        const res = fetchAllVideosByUserId(user.id, token);
        setVideos(await res);
      }
      if (!loadingUser) {
        setLoading(false);
      }
    }
    init();
  }, [loadingUser]);

  return loading ? <MyVideosSkeleton /> : <MyVideos videos={videos} />;
}
