import { HistoryType } from "@/lib/definitions";
import Link from "next/link";

interface HistoryCardProps {
  history: HistoryType;
}

export const HistoryCard = ({ history }: HistoryCardProps) => {
  return (
    <div className="flex gap-5 my-3 h-40">
      <Link href={`/video/${history.videoId}`}>
        <video className="w-72 rounded-2xl object-fill">
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </Link>

      <div className="mx-3 mb-4">
        <h2 className="card-title w-40 md:w-72 lg:w-96 line-clamp-2 text-ellipsis">
          {history.video.title}
        </h2>
        <Link href={`/channel/${history.userId}`}>
          <p className="text-sm text-neutral-400">
            {history.video.user.name} • {history.video.views} views
          </p>
        </Link>
        <p className="text-sm text-neutral-400 mt-4 w-40 md:w-72 lg:w-96 text-ellipsis line-clamp-3">
          {history.video.description}
        </p>
      </div>
    </div>
  );
};
