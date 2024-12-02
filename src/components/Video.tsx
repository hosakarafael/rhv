"use client";
import { VideoType } from "@/lib/definitions";
import Avatar from "./Avatar";
import { fetchVideoById, increaseView } from "@/services/publicVideoService";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import {
  registerHistory,
  subscribe,
  unsubscribe,
} from "@/services/userService";
import { useUser } from "@/context/userContext";
import { useEffect, useState } from "react";

export const Video = ({ id }: { id: string }) => {
  const [video, setVideo] = useState<VideoType>();
  const { user, token, updateUser } = useUser();
  const [isSubscribed, setIsSubscribed] = useState(
    user?.subscribedUsers.some((subs) => subs.id === Number(id))
  );

  async function init() {
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

  useEffect(() => {
    setIsSubscribed(
      user?.subscribedUsers.some((subs) => subs.id === video?.userId)
    );
  }, [user, video]);

  const handleUnsubscribe = () => {
    if (user && token && video && updateUser) {
      unsubscribe(user.id, video.userId, token);
      const updatedSubscribers = user.subscribedUsers.filter(
        (subs) => subs.id !== video.userId
      );
      const updatedUser = { ...user, subscribedUsers: updatedSubscribers };
      updateUser(updatedUser);
    }
  };

  const handleSubscribe = () => {
    if (user && token && video && updateUser) {
      subscribe(user.id, video.userId, token);
      const updatedSubscribers = [
        ...user.subscribedUsers,
        { id: video.userId, name: video.user.name },
      ];
      const updatedUser = { ...user, subscribedUsers: updatedSubscribers };
      updateUser(updatedUser);
    }
  };

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
              <Avatar />
              <div>
                <p className="font-bold">{video.user.name}</p>
                <p className="text-sm text-neutral-700 dark:text-neutral-400">
                  {video.user.subscribers} subscribers
                </p>
              </div>
            </div>

            {isSubscribed ? (
              <button
                onClick={handleUnsubscribe}
                className="btn btn-primary flex items-center gap-2 font-bold text-white text-lg px-4 py-2 rounded-full"
              >
                Unsubscribe
              </button>
            ) : (
              <button
                onClick={handleSubscribe}
                className="btn btn-primary flex items-center gap-2 font-bold text-white text-lg px-4 py-2 rounded-full"
              >
                Subscribe
              </button>
            )}

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
          <Avatar />
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

  return <>{video ? renderVideo(video) : <div>Video deleted!</div>}</>;
};
