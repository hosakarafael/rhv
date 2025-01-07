import Avatar from "@/components/Avatar";
import { VideoType } from "@/lib/definitions";
import { formatDate } from "@/lib/textFormatter";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

interface SearchCardProps {
  video: VideoType;
}

export const SearchCard = ({ video }: SearchCardProps) => {
  const locale = useLocale();
  return (
    <div className="flex gap-5 my-3">
      <Link href={`/video/${video.id}`}>
        <div className="mx-auto border border-gray-600 bg-black rounded-xl ">
          <Image
            className="w-[500px] rounded-xl object-contain aspect-video"
            src={video.thumbnailUrl}
            alt="Thumbnail"
            width={500}
            height={200}
          />
        </div>
      </Link>

      <div className="mx-3 mb-4">
        <h2 className="card-title w-40 md:w-72 lg:w-96 line-clamp-2 text-ellipsis dark:text-white">
          {video.title}
        </h2>
        <Link href={`/channel/${video.user.id}`}>
          <p className="text-sm text-neutral-400">
            {video.views} views • {formatDate(video.createdAt, locale)}
          </p>
        </Link>
        <div className="flex gap-2 items-center my-2 text-neutral-400">
          <Avatar
            size="XS"
            userId={video.user.id}
            username={video.user.name}
            profileImageUrl={video.user.profileImageUrl}
          />
          <span className="text-sm">{video.user.name}</span>
        </div>
        <p className="text-sm text-neutral-400 w-40 md:w-72 lg:w-96 text-ellipsis line-clamp-3">
          {video.description}
        </p>
      </div>
    </div>
  );
};
