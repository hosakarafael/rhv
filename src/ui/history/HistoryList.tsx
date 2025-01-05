"use client";
import { useUser } from "@/context/userContext";
import { HistoryType } from "@/lib/definitions";
import { fetchHistoryByUserId } from "@/services/userService";
import { useEffect, useState } from "react";
import { HistoryCard } from "./HistoryCard";
import { useTranslations } from "next-intl";

type GroupedHistory = {
  [date: string]: HistoryType[];
};

export const HistoryList = () => {
  const t = useTranslations("HistoryPage");
  const [histories, setHistories] = useState<GroupedHistory>({});
  const { token, user } = useUser();

  async function init() {
    if (user && token) {
      const res = await fetchHistoryByUserId(user.id, token);

      const groupedByDate: GroupedHistory = {};
      res.map((history) => {
        const dateObject = new Date(history.watchedAt);
        const dateString = dateObject.toISOString().split("T")[0];
        if (!groupedByDate[dateString]) {
          groupedByDate[dateString] = [];
        }
        groupedByDate[dateString].push(history);
      });
      setHistories(groupedByDate);
    }
  }

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

  useEffect(() => {
    init();
  }, [user]);

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
