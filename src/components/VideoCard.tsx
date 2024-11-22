import Link from "next/link";
import Avatar from "./Avatar";
import { VideoType } from "@/lib/definitions";

interface VideoCardProps {
  video: VideoType;
}

const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <div className="card bg-base-100 w-auto mx-1 my-1">
      <figure className="px-1 pt-1">
        <Link href={"/video/" + video.id}>
          <video className="rounded-xl">
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </Link>
      </figure>
      <div className="flex m-3">
        <div>
          <Link href={`/channel/${video.userId}`}>
            <Avatar />
          </Link>
        </div>
        <div className="mx-3 mb-4">
          <Link href={"/video/" + video.id}>
            <h2 className="card-title">{video.title}</h2>
          </Link>
          <Link href={`/channel/${video.userId}`}>
            <p className="text-sm text-neutral-400">{video.user.name}</p>
          </Link>
          <p className="text-sm text-neutral-400">
            {video.views} views・x month ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
