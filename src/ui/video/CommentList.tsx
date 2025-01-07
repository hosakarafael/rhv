"use client";
import Avatar from "@/components/Avatar";
import { Modal } from "@/components/Modal";
import { CommentType } from "@/lib/definitions";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { useTranslations } from "next-intl";

interface CommentListProps {
  comments: CommentType[];
  onDelete: (comment: CommentType) => void;
}

export const CommentList = ({ comments, onDelete }: CommentListProps) => {
  const t = useTranslations("CommentSection");
  const tCommon = useTranslations("Common");
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      {comments.map((comment) => {
        return (
          <div
            key={comment.id}
            className="p-4 flex items-center gap-5 justify-between"
          >
            <div className="flex gap-5">
              <Avatar
                size="S"
                userId={comment.user.id}
                username={comment.user.name}
                profileImageUrl={comment.user.profileImageUrl}
              />
              <div>
                <span className="dark:text-white">{comment.user.name}</span>
                <span className="text-xs mx-2 text-gray-400">3 years ago</span>
                <p className="dark:text-white">{comment.text}</p>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <EllipsisVerticalIcon
                tabIndex={0}
                role="button"
                className="dark:text-white cursor-pointer h-[30px] w-[30px]"
              />
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:text-white"
              >
                <li>
                  <div onClick={() => modalRef.current?.showModal()}>
                    {tCommon("delete")}
                  </div>
                </li>
              </ul>
            </div>
            <Modal
              type="Cancel/Yes"
              onYes={() => {
                onDelete(comment);
              }}
              title={t("modalDeleteTitle")}
              text={t("modalDeleteText")}
              ref={modalRef}
            />
          </div>
        );
      })}
    </>
  );
};
