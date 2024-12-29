"use client";

import { Alert } from "@/components/Alert";
import { LoginButton } from "@/components/LoginButton";
import { Modal } from "@/components/Modal";
import Tooltip from "@/components/Tooltip";
import { useUser } from "@/context/userContext";
import { VideoType } from "@/lib/definitions";
import { capitalizeFirstLetter, formatDate } from "@/lib/textFormatter";
import { deleteVideo, fetchAllVideosByUserId } from "@/services/videoService";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

interface MyVideosProps {
  videos: VideoType[];
  updateVideos: (videos: VideoType[]) => void;
}

export const MyVideos = ({ videos, updateVideos }: MyVideosProps) => {
  const { user, token } = useUser();
  const pathname = usePathname();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const notLoggedMyVideos = () => {
    return (
      <div className="p-10 flex flex-col justify-center items-center mt-40">
        <h1 className="text-4xl font-extrabold mb-5">My Videos</h1>
        <p className="mb-7">Please login to see your videos.</p>
        <LoginButton continueTo={pathname} />
      </div>
    );
  };

  const noVideoFound = () => {
    return (
      <tr className="group">
        <td className="mb-7">
          <p className="text-2xl font-bold p-4">
            You do not have any videos yet, upload video to see here
          </p>
        </td>
      </tr>
    );
  };

  const handleDeleteVideo = async (videoId: number) => {
    if (token) {
      const res = await deleteVideo(videoId, token);
      if (res.errorCode == "VS000") {
        setIsAlertVisible(false);
        const updatedVideos = videos.filter((video) => video.id != videoId);
        updateVideos(updatedVideos);
      } else {
        setIsAlertVisible(true);
        setErrorMessage(res.message);
      }
    }
  };

  const renderActionSection = (videoId: number) => {
    return (
      <div className="flex p-2">
        <Tooltip label="Edit">
          <Link href={"/edit/" + videoId}>
            <div className="hover:bg-base-100 cursor-pointer w-[40px] p-2 rounded-full">
              <PencilIcon />
            </div>
          </Link>
        </Tooltip>
        <Tooltip label="Delete">
          <div
            onClick={() => modalRef.current?.showModal()}
            className="hover:bg-base-100 cursor-pointer w-[40px] p-2 rounded-full"
          >
            <TrashIcon />
          </div>
        </Tooltip>
      </div>
    );
  };

  const renderMyVideos = () => {
    return (
      <div className="overflow-x-auto py-3">
        <h1 className="text-4xl font-extrabold my-5">My Videos</h1>
        <table className="table">
          <thead>
            <tr>
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
            <Alert
              show={isAlertVisible}
              type="error"
              message={errorMessage}
              onClose={() => setIsAlertVisible(false)}
            />
            {videos.length == 0
              ? noVideoFound()
              : videos.map((video) => {
                  return (
                    <tr key={video.id} className="group">
                      <td>
                        <div className="flex gap-3">
                          <div className="flex items-center justify-center">
                            <div className="h-24 w-40 mx-auto bg-black rounded-xl ">
                              <Image
                                className="rounded-xl object-contain aspect-video"
                                src={`https://res.cloudinary.com/dbk6d8pgh/image/upload/videos/${video.id}/thumbnail.jpg`}
                                alt="Thumbnail"
                                width={400}
                                height={200}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{video.title}</div>
                            <div className="text-sm opacity-50 text-ellipsis line-clamp-1">
                              {video.description.length != 0
                                ? video.description
                                : "No description"}
                            </div>
                            <div className="hidden group-hover:block absolute">
                              {renderActionSection(video.id)}
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
};
