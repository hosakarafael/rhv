import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { ThemeMenuItem } from "./ThemeMenuItem";
import { LanguageMenuItem } from "./LanguageMenuItem";

export const GuestMenu = () => {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle dark:text-white"
      >
        <EllipsisVerticalIcon className="w-[30px]" />
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:text-white"
      >
        <ThemeMenuItem />
        <LanguageMenuItem />
      </ul>
    </div>
  );
};
