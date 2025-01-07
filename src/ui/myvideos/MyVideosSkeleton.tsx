import { useTranslations } from "next-intl";

export const MyVideosSkeleton = () => {
  const tCommon = useTranslations("Common");
  const t = useTranslations("MyVideosPage");
  return (
    <div className="overflow-x-auto py-3">
      <h1 className="text-4xl font-extrabold my-5">{t("title")}</h1>
      <table className="table">
        <thead>
          <tr>
            <th>{t("tableVideo")}</th>
            <th>{t("tableVisibility")}</th>
            <th>{t("tableDate")}</th>
            <th>{t("tableViews")}</th>
            <th>{t("tableComments")}</th>
            <th>{t("tableLikes")}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className="group">
            <td>
              <div className="flex w-full gap-3 p-2">
                <div className="skeleton h-24 w-40"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-40"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              </div>
            </td>
          </tr>
          <tr className="group">
            <td>
              <div className="flex w-full gap-3 p-2">
                <div className="skeleton h-24 w-40"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-40"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
