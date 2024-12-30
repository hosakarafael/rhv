import Link from "next/link";
import Avatar from "./Avatar";
import { VideoType } from "@/lib/definitions";
import { formatDate } from "@/lib/textFormatter";
import Image from "next/image";

interface VideoCardProps {
  video: VideoType;
}

const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <div className="card w-auto mx-1 my-1">
      <figure className="px-1 pt-1">
        <Link href={"/video/" + video.id}>
          <div className="w-full mx-auto bg-black rounded-xl ">
            <Image
              className="rounded-xl object-contain aspect-video"
              src={video.thumbnailUrl}
              alt="Thumbnail"
              width={400}
              height={200}
            />
          </div>
        </Link>
      </figure>
      <div className="flex m-3">
        <div>
          <Link href={`/channel/${video.user.id}`}>
            <Avatar
              size="S"
              userId={video.user.id}
              username={video.user.name}
              profileImageUrl={video.user.profileImageUrl}
            />
          </Link>
        </div>
        <div className="mx-3 mb-4">
          <Link href={"/video/" + video.id}>
            <h2 className="card-title dark:text-white">{video.title}</h2>
          </Link>
          <Link href={`/channel/${video.user.id}`}>
            <p className="text-sm dark:text-neutral-400">{video.user.name}</p>
          </Link>
          <p className="text-sm dark:text-neutral-400">
            {video.views} views・{formatDate(video.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
