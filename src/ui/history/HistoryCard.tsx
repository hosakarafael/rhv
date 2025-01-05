import { HistoryType } from "@/lib/definitions";
import { LockClosedIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface HistoryCardProps {
  history: HistoryType;
}

export const HistoryCard = ({ history }: HistoryCardProps) => {
  const t = useTranslations("HistoryPage");
  const tCommon = useTranslations("Common");
  const renderHistory = () => {
    if (history.videoDeleted) {
      return (
        <>
          <div className="w-72 flex justify-center border border-gray-600 rounded-2xl dark:text-white">
            <TrashIcon className="w-[60px]" />
          </div>
          <h2 className="card-title w-40 md:w-72 lg:w-96 line-clamp-2 text-ellipsis dark:text-white">
            {t("videoDeletedMessage")}
          </h2>
        </>
      );
    }
    if (!history.videoVisible) {
      return (
        <>
          <div className="w-72 flex justify-center border border-gray-600 rounded-2xl dark:text-white">
            <LockClosedIcon className="w-[60px]" />
          </div>
          <h2 className="card-title w-40 md:w-72 lg:w-96 line-clamp-2 text-ellipsis dark:text-white">
            {t("videoPrivateMessage")}
          </h2>
        </>
      );
    }
    return (
      <>
        <Link href={`/video/${history.videoId}`}>
          <div className="w-72 mx-auto border border-gray-600 bg-black rounded-xl ">
            <Image
              className="rounded-xl object-contain aspect-video"
              src={history.video.thumbnailUrl}
              alt="Thumbnail"
              width={400}
              height={200}
            />
          </div>
        </Link>

        <div className="mx-3 mb-4">
          <h2 className="card-title w-40 md:w-72 lg:w-96 line-clamp-2 text-ellipsis dark:text-white">
            {history.video.title}
          </h2>
          <Link href={`/channel/${history.userId}`}>
            <p className="text-sm text-neutral-400">
              {history.video.user.name} •{" "}
              {tCommon("view", { count: history.video.views })}
            </p>
          </Link>
          <p className="text-sm text-neutral-400 mt-4 w-40 md:w-72 lg:w-96 text-ellipsis line-clamp-3">
            {history.video.description}
          </p>
        </div>
      </>
    );
  };

  return <div className="flex gap-5 my-3 h-40">{renderHistory()}</div>;
};
