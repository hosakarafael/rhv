import Avatar from "@/components/Avatar";
import { useUser } from "@/context/userContext";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ThemeMenuItem } from "./ThemeMenuItem";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { LanguageMenuItem } from "./LanguageMenuItem";

export const UserMenu = () => {
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
          <div>
            <UserIcon className="w-[20px]" />
            <Link href={"/channel/" + user?.id} className="my-2">
              My channel
            </Link>
          </div>
        </li>
        <ThemeMenuItem />
        <LanguageMenuItem />
        <li>
          <div>
            <ArrowRightStartOnRectangleIcon className="w-[20px]" />
            <Link className="my-2" href={"/logout"}>
              Logout
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};
