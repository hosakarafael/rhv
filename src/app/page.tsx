import VideoCard from "@/components/VideoCard";
import { videos } from "@/data/placeholder-data";

export default function Page() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  2xl:grid-cols-6 ">
        {videos.map((video) => {
          return <VideoCard video={video} />;
        })}
      </div>
    </>
  );
}
