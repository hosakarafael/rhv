"use client";
import { SubscribeButton } from "@/components/SubscribeButton";
import { VideoGrid } from "@/components/VideoGrid";
import { SubscriptionType, UserType, VideoType } from "@/lib/definitions";
import { fetchUserById } from "@/services/publicUserService";
import { fetchByUserIdsAndPublic } from "@/services/publicVideoService";
import { ProfileImage } from "@/ui/channel/ProfileImage";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface ChannelProps {
  id: string;
}

export const Channel = ({ id }: ChannelProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  let videos: VideoType[] = [];

  useEffect(() => {
    async function init() {
      const res = await fetchUserById(id);
      if (res.errorCode == "US001") {
        redirect("/");
      } else {
        setUser(res);
        videos = await fetchByUserIdsAndPublic([Number(id)]);
      }
    }
    init();
  }, []);

  return (
    user && (
      <>
        <div className="flex gap-5 py-10 mx-5">
          <ProfileImage
            user={user}
            updateUser={(newUser) => setUser(newUser)}
          />
          <div>
            <h1 className="text-4xl font-bold dark:text-white">{user.name}</h1>
            <p className="text-sm text-neutral-700 dark:text-neutral-400">
              {user.subscribers} subscribers • {videos.length} videos
            </p>
            <p className="text-ellipsis line-clamp-1 text-sm text-neutral-700 dark:text-neutral-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Quibusdam, quos ea repellat amet placeat velit eligendi, adipisci
              vero, rerum ullam laboriosam ratione. Ratione omnis necessitatibus
              illo a, dolor fugit ipsa.
            </p>
            <div className="pt-2">
              <SubscribeButton
                subscribeTo={
                  {
                    id: user.id,
                    name: user.name,
                    profileImageUrl: user.profileImageUrl,
                  } as SubscriptionType
                }
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
    )
  );
};
