"use client";

import { Alert } from "@/components/Alert";
import { LoginButton } from "@/components/LoginButton";
import { Modal } from "@/components/Modal";
import Tooltip from "@/components/Tooltip";
import { useUser } from "@/context/userContext";
import { VideoType } from "@/lib/definitions";
import { formatDate } from "@/lib/textFormatter";
import { deleteVideo } from "@/services/videoService";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

interface MyVideosProps {
  videos: VideoType[];
  updateVideos: (videos: VideoType[]) => void;
}

export const MyVideos = ({ videos, updateVideos }: MyVideosProps) => {
  const locale = useLocale();
  const tCommon = useTranslations("Common");
  const t = useTranslations("MyVideosPage");
  const { user, token } = useUser();
  const pathname = usePathname();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const notLoggedMyVideos = () => {
    return (
      <div className="p-10 flex flex-col justify-center items-center mt-40">
        <h1 className="text-4xl font-extrabold mb-5 dark:text-white">
          {t("title")}
        </h1>
        <p className="mb-7 dark:text-white">{t("loginMyVideos")}</p>
        <LoginButton continueTo={pathname} />
      </div>
    );
  };

  const noVideoFound = () => {
    return (
      <div className="group">
        <div className="mb-7">
          <p className="text-2xl font-bold p-4 dark:text-white">
            {t("noVideosYet")}
          </p>
        </div>
      </div>
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
        <Tooltip label={tCommon("edit")}>
          <Link href={"/edit/" + videoId}>
            <div className="hover:bg-gray-200 hover:dark:bg-neutral-800 cursor-pointer w-[40px] p-2 rounded-full dark:text-white">
              <PencilIcon />
            </div>
          </Link>
        </Tooltip>
        <Tooltip label={tCommon("delete")}>
          <div
            onClick={() => modalRef.current?.showModal()}
            className="hover:bg-gray-200 hover:dark:bg-neutral-800 cursor-pointer w-[40px] p-2 rounded-full dark:text-white"
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
        <h1 className="text-4xl font-extrabold my-5 dark:text-white">
          {t("title")}
        </h1>
        <table className="table">
          <thead>
            <tr>
              <th className="dark:text-white">{t("tableVideo")}</th>
              <th className="dark:text-white">{t("tableVisibility")}</th>
              <th className="dark:text-white">{t("tableDate")}</th>
              <th className="dark:text-white">{t("tableViews")}</th>
              <th className="dark:text-white">{t("tableComments")}</th>
              <th className="dark:text-white">{t("tableLikes")}</th>
            </tr>
          </thead>
          <tbody>
            <Alert
              show={isAlertVisible}
              type="error"
              message={errorMessage}
              onClose={() => setIsAlertVisible(false)}
            />
            {videos.map((video) => {
              return (
                <tr key={video.id} className="group">
                  <td>
                    <div className="flex gap-3">
                      <div className="flex items-center justify-center">
                        <div className="h-24 w-44 mx-auto bg-black rounded-xl ">
                          <Image
                            className="rounded-xl object-contain aspect-video"
                            src={video.thumbnailUrl}
                            alt="Thumbnail"
                            width={400}
                            height={200}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold dark:text-white">
                          {video.title}
                        </div>
                        <div className="text-sm opacity-50 text-ellipsis line-clamp-1 dark:text-white">
                          {video.description.length != 0
                            ? video.description
                            : tCommon("noDescription")}
                        </div>
                        <div className="hidden group-hover:block absolute">
                          {renderActionSection(video.id)}
                        </div>
                        <Modal
                          type="Cancel/Yes"
                          onYes={() => {
                            handleDeleteVideo(video.id);
                          }}
                          title={t("deleteDialogTitle")}
                          text={t("deleteDialogText")}
                          ref={modalRef}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="dark:text-white">
                    {tCommon(video.visibility.toLowerCase())}
                  </td>
                  <td className="w-32 dark:text-white">
                    {formatDate(video.createdAt, locale)}
                  </td>
                  <td className="dark:text-white">{video.views}</td>
                  <td className="dark:text-white">{video.comments.length}</td>
                  <td className="dark:text-white">{video.likedUsers.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {videos.length == 0 && noVideoFound()}
      </div>
    );
  };

  return <>{user ? renderMyVideos() : notLoggedMyVideos()}</>;
};
