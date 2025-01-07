export const VideoSkeleton = () => {
  return (
    <>
      <div
        className="relative w-full max-w-screen h-0 bg-black"
        style={{ paddingTop: "39%" }}
      >
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-10 text-white loading loading-spinner w-24 sm:w-32 md:w-48 lg:w-64 xl:w-80 2xl:w-96"></span>
      </div>
      <div className="p-4">
        <div className="skeleton h-4 w-96 my-2"></div>
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
      </div>
    </>
  );
};
