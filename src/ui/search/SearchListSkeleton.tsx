export const SearchListSkeleton = ({
  renderCount,
}: {
  renderCount: number;
}) => {
  return (
    <>
      {Array.from({ length: renderCount }).map((_, index) => (
        <div key={index} className="flex gap-5 my-3">
          <div className="skeleton w-[500px] rounded-xl object-contain aspect-video"></div>

          <div className="mx-3 mb-4">
            <div className="skeleton h-4 w-40 md:w-72 lg:w-96"></div>

            <div className="skeleton h-4 w-40 mt-4"></div>

            <div className="flex gap-2 items-center my-2 text-neutral-400">
              <div className="skeleton h-[30px] w-[30px] shrink-0 rounded-full"></div>
              <div className="skeleton h-4 w-20"></div>
            </div>
            <div className="skeleton h-20 w-40 md:w-72 lg:w-96"></div>
          </div>
        </div>
      ))}
    </>
  );
};
