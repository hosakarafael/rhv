"use client";
import { CommentType, SubscriptionType, VideoType } from "@/lib/definitions";
import Avatar from "../../components/Avatar";
import {
  fetchVideoByIdAndPublic,
  increaseView,
} from "@/services/publicVideoService";
import { HandThumbUpIcon as HandThumbUpIconOutline } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/24/solid";
import { registerHistory } from "@/services/userService";
import { useUser } from "@/context/userContext";
import { useEffect, useOptimistic, useRef, useState } from "react";
import { SubscribeButton } from "../../components/SubscribeButton";
import Link from "next/link";
import { useSidebar } from "@/context/sidebarContext";
import {
  createComment,
  deleteComment,
  like,
  unlike,
} from "@/services/videoService";
import { Modal } from "../../components/Modal";
import { CommentSection } from "@/ui/video/CommentSection";
import { formatDate } from "@/lib/textFormatter";
import { useTranslations, useLocale } from "next-intl";

interface VideoProps {
  video: VideoType | null;
  updateVideo: (video: VideoType) => void;
}

export const Video = ({ video, updateVideo }: VideoProps) => {
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const t = useTranslations("VideoPage");
  const { user, token } = useUser();
  const { update: updateSidebar } = useSidebar();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [comments, setComments] = useState<CommentType[]>([]);

  async function init() {
    //update sidebar to set min = true, making it invisble on first
    updateSidebar && updateSidebar(true);
    if (video) {
      increaseView(video.id);
    }
  }

  useEffect(() => {
    if (video) {
      setComments(video.comments);
    }
  }, [video]);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (user && token && video) {
      registerHistory(user.id, video.id, token);
    }
  }, [user, token, video]);

  const handleLike = () => {
    if (user && video && token) {
      like(user.id, video.id, token);
      const updatedLiked = [...video.likedUsers, user.id];
      const updatedVideo = { ...video, likedUsers: updatedLiked };
      updateVideo(updatedVideo);
    }
  };

  const handleUnlike = () => {
    if (user && video && token) {
      unlike(user.id, video.id, token);
      const updatedLiked = video.likedUsers.filter((like) => like != user.id);
      const updatedVideo = { ...video, likedUsers: updatedLiked };
      updateVideo(updatedVideo);
    }
  };

  const handleAddComment = async (text: string) => {
    if (video && user && token) {
      const tempComment: CommentType = {
        id: `temp-${Date.now()}`,
        videoId: video.id,
        text,
        user: user,
        createdAt: new Date().toISOString(),
      };
      const tempComments = [tempComment, ...video.comments];
      setComments(tempComments);

      const comment = await createComment(user.id, video.id, text, token);
      const updatedComments = [comment, ...video.comments];
      const updatedVideo = { ...video, comments: updatedComments };
      updateVideo(updatedVideo);
    }
  };

  const handleDeleteComment = (comment: CommentType) => {
    if (video && token) {
      deleteComment(Number(comment.id), token);
      const updatedComments = video?.comments.filter((c) => c.id != comment.id);
      const updatedVideo = { ...video, comments: updatedComments };
      updateVideo(updatedVideo);
    }
  };

  const renderVideoDeletedOrDoesNotExist = () => {
    return (
      <div className="flex justify-center pt-10">
        <p className="text-4xl font-bold">{t("videoDeletedOrNotExist")}</p>
      </div>
    );
  };

  const renderVideo = (video: VideoType) => {
    return (
      <>
        <div
          className="relative w-full max-w-screen h-0 bg-black"
          style={{ paddingTop: "39%" }}
        >
          <video
            className="absolute top-0 left-0 w-full h-full"
            controls
            autoPlay
            controlsList="nodownload"
          >
            <source src={video.videoUrl} type="video/mp4" />
          </video>
        </div>
        <div className="p-4">
          <h1 className="text-3xl font-bold dark:text-white">{video.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex gap-2 pr-2">
              <Link href={`/channel/${video.user.id}`}>
                <Avatar
                  size="M"
                  userId={video.user.id}
                  username={video.user.name}
                  profileImageUrl={video.user.profileImageUrl}
                />
              </Link>
              <div>
                <Link href={`/channel/${video.user.id}`}>
                  <p className="font-bold dark:text-white">{video.user.name}</p>
                </Link>
                <p className="text-sm text-neutral-700 dark:text-neutral-400">
                  {tCommon("subscriberCount", {
                    count: video.user.subscribers,
                  })}
                </p>
              </div>
            </div>

            <SubscribeButton
              subscribeTo={
                {
                  id: video.user.id,
                  name: video.user.name,
                  profileImageUrl: video.user.profileImageUrl,
                } as SubscriptionType
              }
            />

            <div
              onClick={() => {
                if (user) {
                  video.likedUsers.includes(user.id)
                    ? handleUnlike()
                    : handleLike();
                } else {
                  modalRef.current?.showModal();
                }
              }}
              className="flex items-center gap-2 bg-gray-100 dark:bg-base-100 dark:text-white px-5 py-2 rounded-full cursor-pointer"
            >
              {user && video.likedUsers.includes(user.id) ? (
                <HandThumbUpIconSolid className="h-[30px] w-[30px]" />
              ) : (
                <HandThumbUpIconOutline className="h-[30px] w-[30px]" />
              )}
              <p>{video.likedUsers.length}</p>
              <Modal
                type="Login"
                title={t("modalTitleNoLoginLike")}
                text={t("modalTextNoLoginLike")}
                ref={modalRef}
              />
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-gray-100 dark:bg-base-100 dark:text-white p-4 rounded-xl">
            <p className="font-bold">
              {tCommon("viewCount", {
                count: video.views,
              })}{" "}
              {formatDate(video.createdAt, locale)}
            </p>
            <div>
              {video.description ? video.description : tCommon("noDescription")}
            </div>
          </div>
        </div>
        <CommentSection
          videoId={video.id}
          comments={comments}
          onAdd={handleAddComment}
          onDelete={handleDeleteComment}
        />
      </>
    );
  };

  return <>{video ? renderVideo(video) : renderVideoDeletedOrDoesNotExist()}</>;
};
