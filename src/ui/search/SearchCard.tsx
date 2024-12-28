import Avatar from "@/components/Avatar";
import { VideoType } from "@/lib/definitions";
import { formatDate } from "@/lib/textFormatter";
import Link from "next/link";

interface SearchCardProps {
  video: VideoType;
}

export const SearchCard = ({ video }: SearchCardProps) => {
  return (
    <div className="flex gap-5 my-3">
      <Link href={`/video/${video.id}`}>
        <div className="mx-auto border border-gray-600 bg-black rounded-xl ">
          <video className="w-[500px] rounded-xl object-contain aspect-video">
            <source src="/video2.mp4" type="video/mp4" />
          </video>
        </div>
      </Link>

      <div className="mx-3 mb-4">
        <h2 className="card-title w-40 md:w-72 lg:w-96 line-clamp-2 text-ellipsis">
          {video.title}
        </h2>
        <Link href={`/channel/${video.user.id}`}>
          <p className="text-sm text-neutral-400">
            {video.views} views • {formatDate(video.createdAt)}
          </p>
        </Link>
        <div className="flex gap-2 items-center my-2 text-neutral-400">
          <Avatar size="XS" />
          <span className="text-sm">{video.user.name}</span>
        </div>
        <p className="text-sm text-neutral-400 w-40 md:w-72 lg:w-96 text-ellipsis line-clamp-3">
          {video.description}
        </p>
      </div>
    </div>
  );
};
