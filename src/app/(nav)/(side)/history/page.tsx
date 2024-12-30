"use client";
import { HistoryList } from "@/ui/history/HistoryList";
import { LoginButton } from "@/components/LoginButton";
import Tooltip from "@/components/Tooltip";
import { useUser } from "@/context/userContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function Page() {
  const { user } = useUser();
  const pathname = usePathname();

  const renderHistory = () => {
    return (
      <div className="p-10 flex justify-center">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-5 dark:text-white">
            Watch history
          </h1>
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
      <div className="p-10 flex flex-col justify-center items-center mt-40">
        <h1 className="text-4xl font-extrabold mb-5 dark:text-white">
          Watch history
        </h1>
        <p className="mb-7">
          If you are logged out, your play history will not be displayed.
        </p>
        <LoginButton continueTo={pathname} />
      </div>
    );
  };

  return <>{user ? renderHistory() : notLoggedHistory()}</>;
}
