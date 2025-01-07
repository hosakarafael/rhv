import Avatar from "@/components/Avatar";
import { useUser } from "@/context/userContext";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ThemeMenuItem } from "./ThemeMenuItem";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { LanguageMenuItem } from "./LanguageMenuItem";
import { useTranslations } from "next-intl";

export const UserMenu = () => {
  const t = useTranslations("Navbar");
  const tCommon = useTranslations("Common");
  const { user } = useUser();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        {user && (
          <Avatar
            size="S"
            userId={user.id}
            username={user.name}
            profileImageUrl={user.profileImageUrl}
          />
        )}
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:text-white"
      >
        <div className="flex items-center gap-2 px-2 pt-2">
          {user && (
            <Avatar
              size="S"
              userId={user.id}
              username={user.name}
              profileImageUrl={user.profileImageUrl}
            />
          )}
          <p>{user && user.name}</p>
        </div>
        <div className="divider m-1"></div>
        <li>
          <Link href={"/channel/" + user?.id}>
            <div className="flex gap-2 my-2">
              <UserIcon className="w-[20px]" />
              {t("myChannel")}
            </div>
          </Link>
        </li>
        <ThemeMenuItem />
        <LanguageMenuItem />
        <li>
          <Link href={"/logout"}>
            <div className="flex gap-2 my-2">
              <ArrowRightStartOnRectangleIcon className="w-[20px]" />
              {tCommon("logout")}
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};
