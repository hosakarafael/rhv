"use client";
import { Video } from "@/ui/video/Video";
import { VideoType } from "@/lib/definitions";
import { fetchVideoByIdAndPublic } from "@/services/publicVideoService";
import { use, useEffect, useState } from "react";
import { VideoSkeleton } from "@/ui/video/VideoSkeleton";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [video, setVideo] = useState<VideoType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      if (id) {
        setLoading(true);
        const res = fetchVideoByIdAndPublic(id as string);
        setVideo(await res);
        setLoading(false);
      }
    }

    init();
  }, []);

  return loading ? (
    <VideoSkeleton />
  ) : (
    <Video video={video} updateVideo={(video) => setVideo(video)} />
  );
}
