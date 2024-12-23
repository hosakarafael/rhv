import VideoCard from "@/components/VideoCard";
import { VideoGrid } from "@/components/VideoGrid";
import { fetchAllPublicVideos } from "@/services/publicVideoService";
import { Suspense } from "react";

export default async function Page() {
  const videos = await fetchAllPublicVideos();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideoGrid videos={videos} />;
    </Suspense>
  );
}
