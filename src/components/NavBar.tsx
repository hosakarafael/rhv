"use client";
import Avatar from "./Avatar";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Tooltip from "./Tooltip";
import { useUser } from "@/context/userContext";
import { Logo } from "./Logo";
import { LoginButton } from "./LoginButton";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/sidebarContext";

const NavBar = () => {
  const { updateToken, user } = useUser();
  const pathname = usePathname();
  const { toggle } = useSidebar();

  const logout = () => {
    if (updateToken) {
      localStorage.removeItem("token");
      updateToken("");
    }
  };

  const renderAvatar = () => {
    return (
      <div className="dropdown dropdown-end">
        <Tooltip label={user ? user?.name : ""} direction="left">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <Avatar size="S" />
          </div>
        </Tooltip>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <a className="justify-between">Profile</a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <button onClick={() => logout()}>Logout</button>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="navbar bg-base-100 justify-between fixed z-10">
      <div>
        <div
          onClick={toggle}
          className="cursor-pointer hover:bg-slate-500 rounded-full p-2 mx-2 ease-in-out duration-300 sm:block hidden"
        >
          <Bars3Icon className="h-[30px] w-[30px]" />
        </div>

        <Logo />
      </div>

      <div className="form-control">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered md:w-96"
          />
          <Tooltip label="Search">
            <MagnifyingGlassIcon className="mx-4 h-[30px] w-[30px] text-gray-500" />
          </Tooltip>
        </div>
      </div>
      {user ? renderAvatar() : <LoginButton continueTo={pathname} />}
    </div>
  );
};

export default NavBar;
