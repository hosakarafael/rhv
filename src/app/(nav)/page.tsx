import VideoCard from "@/components/VideoCard";
import { fetchAllVideos } from "@/services/publicVideoService";

export default async function Page() {
  const videos = await fetchAllVideos();

  const renderVideos = () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  2xl:grid-cols-6 ">
        {videos?.map((video) => {
          return <VideoCard key={video.id} video={video} />;
        })}
      </div>
    );
  };

  const noVideoFound = () => {
    return (
      <div className="flex items-center justify-center p-3 h-full">
        <p className="text-4xl font-bold">No video found!</p>
      </div>
    );
  };

  return <>{videos && videos.length > 0 ? renderVideos() : noVideoFound()}</>;
}
