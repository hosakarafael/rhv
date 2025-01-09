import { GroupedHistory } from "@/lib/definitions";
import { HistoryCard } from "./HistoryCard";
import { useTranslations } from "next-intl";

interface HistoryListProps {
  histories: GroupedHistory;
}

export const HistoryList = ({ histories }: HistoryListProps) => {
  const t = useTranslations("HistoryPage");

  const renderHistories = () => {
    return Object.entries(histories).map(([date, entries]) => {
      return (
        <div key={date}>
          <h1 className="text-2xl font-bold my-10 dark:text-white">{date}</h1>
          {entries.map((h) => {
            return <HistoryCard key={h.videoId} history={h} />;
          })}
        </div>
      );
    });
  };

  return Object.entries(histories).length == 0 ? (
    <div>
      <h1 className="text-2xl font-bold my-10 dark:text-white">
        {t("noHistory")}
      </h1>
    </div>
  ) : (
    renderHistories()
  );
};
