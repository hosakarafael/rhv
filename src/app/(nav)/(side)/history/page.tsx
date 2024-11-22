import { HistoryCard } from "@/components/HistoryCard";
import Tooltip from "@/components/Tooltip";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Page() {
  return (
    <div className="p-10 flex justify-center">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-5">Watch history</h1>
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
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
          </div>
        </div>
      </div>
    </div>
  );
}
