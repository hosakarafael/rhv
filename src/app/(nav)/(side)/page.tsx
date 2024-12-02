import VideoCard from "@/components/VideoCard";
import { VideoGrid } from "@/components/VideoGrid";
import { fetchAllVideos } from "@/services/publicVideoService";

export default async function Page() {
  const videos = await fetchAllVideos();

  return <VideoGrid videos={videos} />;
}
