"use client";
import Link from "next/link";
import Avatar from "./Avatar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Tooltip from "./Tooltip";
import { useUser } from "@/context/userContext";
import LoginBadge from "./LoginBadge";

const NavBar = () => {
  const { isLogged, updateToken } = useUser();

  const logout = () => {
    if (updateToken) {
      localStorage.removeItem("token");
      updateToken("");
    }
  };

  const renderAvatar = () => {
    return (
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <Avatar />
        </div>
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
    <div className="navbar bg-base-100 justify-between">
      <div>
        <Link href={"/"} className="btn btn-primary text-xl text-white">
          RHV
        </Link>
      </div>

      <div className="form-control">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-72 md:w-96"
          />
          <Tooltip label="Search">
            <MagnifyingGlassIcon className="mx-4 h-[30px] w-[30px] text-gray-500" />
          </Tooltip>
        </div>
      </div>
      {isLogged ? renderAvatar() : <LoginBadge />}
    </div>
  );
};

export default NavBar;
