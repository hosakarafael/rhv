import Avatar from "@/components/Avatar";
import { CommentType } from "@/lib/definitions";
import { CommentList } from "./CommentList";
import { createComment } from "@/services/videoService";
import { useUser } from "@/context/userContext";
import { useRef, useState } from "react";

interface CommentSectionProps {
  videoId: number;
  comments: CommentType[];
  addComment: (comment: CommentType) => void;
}

export const CommentSection = ({
  videoId,
  comments,
  addComment,
}: CommentSectionProps) => {
  const { user, token } = useUser();
  const [text, setText] = useState("");

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      return;
    }

    if (!text) {
      return;
    }

    if (token) {
      const res = await createComment(user.id, videoId, text, token);
      setText("");
      addComment(res);
    }
  };

  return (
    <>
      <div className="p-4">
        <p className="text-2xl font-bold">{comments.length} Comments</p>
      </div>
      <div className="p-4 flex items-center gap-2">
        <Avatar size="S" />
        <div className="w-full">
          <form onSubmit={(e) => handleAddComment(e)}>
            <input
              type="text"
              placeholder="Add a comment..."
              className="input input-ghost w-full"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </form>
        </div>
      </div>
      <CommentList comments={comments} />
    </>
  );
};
