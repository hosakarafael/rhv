import Link from "next/link";
import Avatar from "./Avatar";
import { Video } from "@/lib/definitions";

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: { video: Video }) => {
  return (
    <div className="card bg-base-100 w-auto shadow-xl mx-1 my-1">
      <figure className="px-1 pt-1">
        <Link href={"/video/1"}>
          <video className="rounded-xl">
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </Link>
      </figure>
      <div className="flex m-3">
        <div>
          <Link href={"/channel/1"}>
            <Avatar />
          </Link>
        </div>
        <div className="mx-3 mb-4">
          <Link href={"/video/1"}>
            <h2 className="card-title">{video.title}</h2>
          </Link>
          <Link href={"/channel/1"}>
            <p className="text-sm text-neutral-400">{video.channel}</p>
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
