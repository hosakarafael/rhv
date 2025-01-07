import Avatar from "@/components/Avatar";
import { CommentType } from "@/lib/definitions";
import { CommentList } from "./CommentList";
import { useUser } from "@/context/userContext";
import { useRef, useState } from "react";
import { Modal } from "@/components/Modal";
import { useTranslations } from "next-intl";

interface CommentSectionProps {
  videoId: number;
  comments: CommentType[];
  onAdd: (text: string) => void;
  onDelete: (comment: CommentType) => void;
}

export const CommentSection = ({
  comments,
  onAdd,
  onDelete,
}: CommentSectionProps) => {
  const tCommon = useTranslations("Common");
  const t = useTranslations("CommentSection");
  const { user } = useUser();
  const [text, setText] = useState("");
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text) {
      return;
    }

    setText("");
    onAdd(text);
  };

  return (
    <>
      <div className="p-4">
        <p className="text-2xl font-bold dark:text-white">
          {tCommon("commentCount", { count: comments.length })}
        </p>
      </div>
      <div className="p-4 flex items-center gap-2">
        {user && (
          <Avatar
            size="S"
            userId={user.id}
            username={user.name}
            profileImageUrl={user.profileImageUrl}
          />
        )}
        <div className="w-full">
          <form onSubmit={(e) => handleAddComment(e)}>
            <input
              onClick={() => {
                if (!user) {
                  modalRef.current?.showModal();
                }
              }}
              type="text"
              placeholder={t("addCommentPlaceholder")}
              className="input input-ghost w-full"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </form>
        </div>
      </div>
      <CommentList comments={comments} onDelete={onDelete} />
      <Modal
        type="Login"
        title={t("modalTitleNoLoginComment")}
        text={t("modalTextNoLoginComment")}
        ref={modalRef}
      />
    </>
  );
};
