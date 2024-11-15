import { VideoType } from "@/lib/definitions";
import Avatar from "./Avatar";
import { fetchVideoById } from "@/services/publicVideoService";

export const Video = async ({ id }: { id: string }) => {
  const video = await fetchVideoById(id);

  const renderVideo = (video: VideoType) => {
    return (
      <>
        <div
          className="relative w-full max-w-screen h-0"
          style={{ paddingTop: "43%" }}
        >
          <video
            className="absolute top-0 left-0 w-full h-full"
            controls
            autoPlay
            controlsList="nodownload"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="p-4">
          <h1 className="text-3xl font-bold">{video.title}</h1>
          <div className="flex gap-2 mt-2">
            <Avatar />
            <div>
              <p>{video.user.name}</p>
              <p>100 subscribers</p>
            </div>
          </div>
        </div>
      </>
    );
  };

  return <>{video ? renderVideo(video) : <div>Video deleted!</div>}</>;
};
