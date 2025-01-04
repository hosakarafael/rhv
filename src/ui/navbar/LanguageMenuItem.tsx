"use client";
import { LanguageIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

export const LanguageMenuItem = () => {
  const t = useTranslations("LanguageMenuItem");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const locale = useLocale();

  const handleLocaleChange = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/;`;
    window.location.reload();
  };

  return (
    <li>
      <div
        onClick={() => setShowLanguageMenu(!showLanguageMenu)}
        className={clsx("menu-dropdown-toggle", {
          "menu-dropdown-show": showLanguageMenu,
        })}
      >
        <LanguageIcon className="w-[20px] my-2" />
        {t("language")}
      </div>
      <ul
        className={clsx("menu-dropdown", {
          "menu-dropdown-show": showLanguageMenu,
        })}
      >
        <li>
          <button
            className={clsx({
              active: locale == "en",
            })}
            onClick={() => handleLocaleChange("en")}
          >
            <div className="my-2">English</div>
          </button>
        </li>
        <li>
          <button
            className={clsx({
              active: locale == "pt",
            })}
            onClick={() => handleLocaleChange("pt")}
          >
            <div className="my-2">Português</div>
          </button>
        </li>
      </ul>
    </li>
  );
};
