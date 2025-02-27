import { VideoType } from "@/lib/definitions";
import VideoCard from "./VideoCard";
import { useTranslations } from "next-intl";

interface VideoGridProps {
  videos: VideoType[];
}

export const VideoGrid = ({ videos }: VideoGridProps) => {
  const t = useTranslations("VideoGrid");

  const noVideoFound = () => {
    return (
      <div className="flex justify-center pt-10">
        <p className="text-4xl font-bold dark:text-white">{t("noVideo")}</p>
      </div>
    );
  };

  const renderVideos = () => {
    return (
      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  2xl:grid-cols-6">
        {videos?.map((video) => {
          return <VideoCard key={video.id} video={video} />;
        })}
      </div>
    );
  };

  return <>{videos.length ? renderVideos() : noVideoFound()}</>;
};
