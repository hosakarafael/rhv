import { SubscribeButton } from "@/components/SubscribeButton";
import { VideoGrid } from "@/components/VideoGrid";
import { SubscriptionType } from "@/lib/definitions";
import { fetchUserById } from "@/services/publicUserService";
import { fetchByUserIdsAndPublic } from "@/services/publicVideoService";
import { ProfileImage } from "@/ui/channel/ProfileImage";
import { redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const user = await fetchUserById(id);

  if (user.errorCode == "US001") {
    redirect("/");
  }

  const videos = await fetchByUserIdsAndPublic([Number(id)]);

  return (
    <>
      <div className="flex gap-5 py-10 mx-5">
        <ProfileImage user={user} />
        <div>
          <h1 className="text-4xl font-bold dark:text-white">{user.name}</h1>
          <p className="text-sm text-neutral-700 dark:text-neutral-400">
            {user.subscribers} subscribers • {videos.length} videos
          </p>
          <p className="text-ellipsis line-clamp-1 text-sm text-neutral-700 dark:text-neutral-400">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam,
            quos ea repellat amet placeat velit eligendi, adipisci vero, rerum
            ullam laboriosam ratione. Ratione omnis necessitatibus illo a, dolor
            fugit ipsa.
          </p>
          <div className="pt-2">
            <SubscribeButton
              subscribeTo={{ id: user.id, name: user.name } as SubscriptionType}
            />
          </div>
        </div>
      </div>
      <div role="tablist" className="tabs tabs-bordered">
        <input
          type="radio"
          name="tabs"
          role="tab"
          className="tab dark:text-white"
          aria-label="Home"
        />
        <div role="tabpanel" className="tab-content dark:text-white">
          Tab content 1
        </div>

        <input
          type="radio"
          name="tabs"
          role="tab"
          className="tab dark:text-white"
          aria-label="Videos"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content">
          <VideoGrid videos={videos} />
        </div>
      </div>
    </>
  );
}
