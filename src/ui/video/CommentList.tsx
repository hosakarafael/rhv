"use client";
import Avatar from "@/components/Avatar";
import { Modal } from "@/components/Modal";
import { CommentType } from "@/lib/definitions";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

interface CommentListProps {
  comments: CommentType[];
  onDelete: (comment: CommentType) => void;
}

export const CommentList = ({ comments, onDelete }: CommentListProps) => {
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
                <span>{comment.user.name}</span>
                <span className="text-xs mx-2 text-gray-400">3 years ago</span>
                <p>{comment.text}</p>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <EllipsisVerticalIcon
                tabIndex={0}
                role="button"
                className="cursor-pointer h-[30px] w-[30px]"
              />
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <div onClick={() => modalRef.current?.showModal()}>
                    Delete
                  </div>
                </li>
              </ul>
            </div>
            <Modal
              type="Cancel/Yes"
              onYes={() => {
                onDelete(comment);
              }}
              title="Delete comment"
              text="Delete your comment permanently?"
              ref={modalRef}
            />
          </div>
        );
      })}
    </>
  );
};
