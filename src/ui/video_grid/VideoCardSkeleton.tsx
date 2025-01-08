export const VideoCardSkeleton = () => {
  return (
    <div className="card w-auto mx-1 my-1">
      <figure className="px-1 pt-1">
        <div className="w-full mx-auto rounded-xl ">
          <div className="skeleton rounded-xl object-contain aspect-video"></div>
        </div>
      </figure>
      <div className="flex m-3">
        <div>
          <div className="skeleton h-[40px] w-[40px] shrink-0 rounded-full"></div>
        </div>
        <div className="mx-3 mb-4">
          <h2 className="card-title dark:text-white">
            <div className="skeleton h-4 w-40"></div>
          </h2>

          <div className="skeleton h-4 w-20 my-2"></div>

          <div className="skeleton h-4 w-40"></div>
        </div>
      </div>
    </div>
  );
};
