"use client";
import { HistoryList } from "@/ui/history/HistoryList";
import { LoginButton } from "@/components/LoginButton";
import { useUser } from "@/context/userContext";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { GroupedHistory } from "@/lib/definitions";
import { fetchHistoryByUserId } from "@/services/userService";
import { HistoryListSkeleton } from "@/ui/history/HistoryListSkeleton";

export default function Page() {
  const t = useTranslations("HistoryPage");
  const { user, token } = useUser();
  const pathname = usePathname();
  const [histories, setHistories] = useState<GroupedHistory>({});
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
  }

  useEffect(() => {
    init();
  }, [user]);

  const notLoggedHistory = () => {
    return (
      <div className="p-10 flex flex-col justify-center items-center mt-40 dark:text-white">
        <h1 className="text-4xl font-extrabold mb-5">{t("title")}</h1>
        <p className="mb-7">{t("loginHistory")}</p>
        <LoginButton continueTo={pathname} />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="p-10 flex justify-center">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-5 dark:text-white">
            {t("title")}
          </h1>
          {loading ? (
            <HistoryListSkeleton renderCount={4} />
          ) : (
            <HistoryList histories={histories} />
          )}
        </div>
      </div>
    );
  };

  return <>{user ? renderContent() : notLoggedHistory()}</>;
}
