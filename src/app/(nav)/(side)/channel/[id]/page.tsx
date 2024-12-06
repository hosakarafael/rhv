import { SubscribeButton } from "@/components/SubscribeButton";
import { VideoGrid } from "@/components/VideoGrid";
import { SubscriptionType } from "@/lib/definitions";
import { fetchUserById } from "@/services/publicUserService";
import { fetchByUserIds } from "@/services/publicVideoService";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const user = await fetchUserById(id);
  const videos = await fetchByUserIds([Number(id)]);
  return (
    <>
      <div className="flex gap-5 py-10">
        <div className="avatar">
          <div className="w-36 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <p>
            {user.subscribers} subscribers • {videos.length} videos
          </p>
          <p>Channel description</p>
          <SubscribeButton
            subscribeTo={{ id: user.id, name: user.name } as SubscriptionType}
          />
        </div>
      </div>
      <div role="tablist" className="tabs tabs-bordered">
        <input
          type="radio"
          name="tabs"
          role="tab"
          className="tab"
          aria-label="Home"
        />
        <div role="tabpanel" className="tab-content">
          Tab content 1
        </div>

        <input
          type="radio"
          name="tabs"
          role="tab"
          className="tab"
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
