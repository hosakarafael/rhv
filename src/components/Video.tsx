"use client";
import { SubscriptionType, VideoType } from "@/lib/definitions";
import Avatar from "./Avatar";
import { fetchVideoById, increaseView } from "@/services/publicVideoService";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { registerHistory } from "@/services/userService";
import { useUser } from "@/context/userContext";
import { useEffect, useState } from "react";
import { SubscribeButton } from "./SubscribeButton";
import Link from "next/link";
import { useSidebar } from "@/context/sidebarContext";

export const Video = ({ id }: { id: string }) => {
  const [video, setVideo] = useState<VideoType>();
  const { user, token } = useUser();
  const { update: updateSidebar } = useSidebar();

  async function init() {
    //update sidebar to set min = true, making it invisble on first render
    updateSidebar && updateSidebar(true);
    setVideo(await fetchVideoById(id));
    increaseView(id);
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (user && token) {
      registerHistory(user.id, id, token);
    }
  }, [user]);

  const renderVideo = (video: VideoType) => {
    return (
      <>
        <div
          className="relative w-full max-w-screen h-0 bg-black"
          style={{ paddingTop: "43%" }}
        >
          <video
            className="absolute top-0 left-0 w-full h-full"
            controls
            autoPlay
            controlsList="nodownload"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="p-4">
          <h1 className="text-3xl font-bold">{video.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex gap-2 pr-2">
              <Link href={`/channel/${video.userId}`}>
                <Avatar size="M" />
              </Link>
              <div>
                <Link href={`/channel/${video.userId}`}>
                  <p className="font-bold">{video.user.name}</p>
                </Link>
                <p className="text-sm text-neutral-700 dark:text-neutral-400">
                  {video.user.subscribers} subscribers
                </p>
              </div>
            </div>

            <SubscribeButton
              subscribeTo={
                { id: video.user.id, name: video.user.name } as SubscriptionType
              }
            />

            <div className="flex items-center gap-2 bg-gray-100 dark:bg-base-100 px-5 py-2 rounded-full">
              <HandThumbUpIcon className="h-[30px] w-[30px]" />
              <p>7.8K</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-gray-100 dark:bg-base-100 p-4 rounded-xl">
            <p className="font-bold">{video.views} views 2 months ago</p>
            <div>{video.description}</div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-2xl font-bold">1600 Comments</p>
        </div>
        <div className="p-4 flex items-center gap-2">
          <Avatar size="S" />
          <div className="w-full">
            <input
              type="text"
              placeholder="Add a comment..."
              className="input input-ghost w-full"
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {video ? (
        renderVideo(video)
      ) : (
        <div>Video was deleted or does not exist!</div>
      )}
    </>
  );
};
