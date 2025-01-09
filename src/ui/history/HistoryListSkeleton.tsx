export const HistoryListSkeleton = ({
  renderCount,
}: {
  renderCount: number;
}) => {
  return (
    <>
      {Array.from({ length: renderCount }).map((_, index) => (
        <div key={index} className="flex gap-5 my-3">
          <div className="w-72 mx-auto rounded-xl ">
            <div className="skeleton object-contain aspect-video"></div>
          </div>

          <div className="mx-3 mb-4">
            <div className="skeleton h-4 w-40 md:w-72 lg:w-96"></div>

            <div className="skeleton h-4 w-40 mt-2"></div>

            <div className="skeleton h-20 mt-4 w-40 md:w-72 lg:w-96"></div>
          </div>
        </div>
      ))}
    </>
  );
};
