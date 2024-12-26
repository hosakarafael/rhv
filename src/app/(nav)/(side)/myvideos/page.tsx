"use client";

import { LoginButton } from "@/components/LoginButton";
import { Modal } from "@/components/Modal";
import { useUser } from "@/context/userContext";
import { VideoType } from "@/lib/definitions";
import { capitalizeFirstLetter, formatDate } from "@/lib/textFormatter";
import { deleteVideo, fetchAllVideosByUserId } from "@/services/videoService";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const { user, token } = useUser();
  const [videos, setVideos] = useState<VideoType[]>([]);
  const pathname = usePathname();
  const modalRef = useRef<HTMLDialogElement>(null);

  async function init() {
    if (user && token) {
      const res = fetchAllVideosByUserId(user.id, token);
      setVideos(await res);
    }
  }

  useEffect(() => {
    init();
  }, [user]);

  const notLoggedMyVideos = () => {
    return (
      <div className="p-10 flex flex-col justify-center items-center mt-40">
        <h1 className="text-4xl font-extrabold mb-5">My Videos</h1>
        <p className="mb-7">Please login to see your videos.</p>
        <LoginButton continueTo={pathname} />
      </div>
    );
  };

  const handleDeleteVideo = (videoId: number) => {
    if (token) {
      deleteVideo(videoId, token);
    }
  };

  const renderActionSection = () => {
    return (
      <div className="flex">
        <div className="hover:bg-base-100 cursor-pointer w-[40px] p-2 rounded-full">
          <PencilIcon />
        </div>
        <div
          onClick={() => modalRef.current?.showModal()}
          className="hover:bg-base-100 cursor-pointer w-[40px] p-2 rounded-full"
        >
          <TrashIcon />
        </div>
      </div>
    );
  };

  const renderMyVideos = () => {
    return (
      <div className="overflow-x-auto">
        <h1 className="text-4xl font-extrabold my-5">My Videos</h1>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Video</th>
              <th>Visibility</th>
              <th>Date</th>
              <th>Views</th>
              <th>Comments</th>
              <th>Likes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => {
              return (
                <tr key={video.id} className="group">
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex gap-3">
                      <div className="flex items-center justify-center">
                        <div className="h-24 w-40">
                          <video className="rounded-xl">
                            <source src="/video.mp4" type="video/mp4" />
                          </video>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{video.title}</div>
                        <div className="text-sm opacity-50 text-ellipsis line-clamp-1">
                          {video.description ?? "No description"}
                        </div>
                        <div className="hidden group-hover:block absolute">
                          {renderActionSection()}
                        </div>
                        <Modal
                          type="Cancel/Yes"
                          onYes={() => {
                            handleDeleteVideo(video.id);
                          }}
                          title="Delete video"
                          text="Delete your video permanently?"
                          ref={modalRef}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{capitalizeFirstLetter(video.visibility)}</td>
                  <td className="w-32">{formatDate(video.createdAt)}</td>
                  <td>{video.views}</td>
                  <td>{video.comments.length}</td>
                  <td>{video.likedUsers.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return <>{user ? renderMyVideos() : notLoggedMyVideos()}</>;
}
