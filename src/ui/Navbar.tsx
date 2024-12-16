"use client";
import Avatar from "../components/Avatar";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Tooltip from "../components/Tooltip";
import { useUser } from "@/context/userContext";
import { Logo } from "../components/Logo";
import { LoginButton } from "../components/LoginButton";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/sidebarContext";
import Link from "next/link";

const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const { toggle } = useSidebar();

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
            <Link href={"/logout"}>Logout</Link>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="navbar bg-base-100 justify-between fixed z-20">
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

export default Navbar;
