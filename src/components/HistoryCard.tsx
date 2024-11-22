export const HistoryCard = () => {
  return (
    <div className="flex gap-5 my-3 h-40">
      <video className="w-72 rounded-2xl object-fill">
        <source src="/video.mp4" type="video/mp4" />
      </video>

      <div className="mx-3 mb-4">
        <h2 className="card-title w-40 md:w-72 lg:w-96 line-clamp-2 text-ellipsis">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </h2>
        <p className="text-sm text-neutral-400">name • 1.2K views</p>
        <p className="text-sm text-neutral-400 mt-4 w-40 md:w-72 lg:w-96 text-ellipsis line-clamp-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint laborum
          est commodi pariatur omnis aspernatur nostrum eum quis optio. Quo
          similique tempore quae temporibus nemo qui fugiat officiis quia
          quibusdam!Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Sint laborum est commodi pariatur omnis aspernatur nostrum eum quis
          optio. Quo similique tempore quae temporibus nemo qui fugiat officiis
          quia quibusdam!
        </p>
      </div>
    </div>
  );
};
