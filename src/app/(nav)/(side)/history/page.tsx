"use client";
import { HistoryList } from "@/ui/history/HistoryList";
import { LoginButton } from "@/components/LoginButton";
import Tooltip from "@/components/Tooltip";
import { useUser } from "@/context/userContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("HistoryPage");
  const { user } = useUser();
  const pathname = usePathname();

  const renderHistory = () => {
    return (
      <div className="p-10 flex justify-center">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-5 dark:text-white">
            {t("title")}
          </h1>

          <div className="flex">
            <div>
              <HistoryList />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const notLoggedHistory = () => {
    return (
      <div className="p-10 flex flex-col justify-center items-center mt-40 dark:text-white">
        <h1 className="text-4xl font-extrabold mb-5">{t("title")}</h1>
        <p className="mb-7">{t("loginHistory")}</p>
        <LoginButton continueTo={pathname} />
      </div>
    );
  };

  return <>{user ? renderHistory() : notLoggedHistory()}</>;
}
