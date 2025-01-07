import { VideoType } from "@/lib/definitions";
import { SearchCard } from "./SearchCard";
import { useTranslations } from "next-intl";

interface SearchListProps {
  videos: VideoType[];
}
export const SearchList = ({ videos }: SearchListProps) => {
  const t = useTranslations("SearchPage");
  const noResult = () => {
    return (
      <div className="p-10 flex flex-col justify-center items-center mt-40">
        <h1 className="text-4xl font-extrabold mb-5 dark:text-white">
          {t("noResultTitle")}
        </h1>
        <p className="mb-7 dark:text-white">{t("noResultMessage")}</p>
      </div>
    );
  };

  return videos.length == 0
    ? noResult()
    : videos.map((video) => <SearchCard key={video.id} video={video} />);
};
