"use client";
import { VideoGrid } from "@/components/VideoGrid";
import { VideoType } from "@/lib/definitions";
import { fetchAllPublicVideos } from "@/services/publicVideoService";
import { VideoGridSkeleton } from "@/ui/video_grid/VideoGridSkeleton";
import { useEffect, useState } from "react";

export default function Page() {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const res = await fetchAllPublicVideos();
      setVideos(res);
      setLoading(false);
    }
    init();
  }, []);

  return loading ? (
    <>
      <VideoGridSkeleton />
    </>
  ) : (
    <VideoGrid videos={videos} />
  );
}
