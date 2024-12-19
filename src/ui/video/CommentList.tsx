import Avatar from "@/components/Avatar";
import { CommentType } from "@/lib/definitions";

interface CommentListProps {
  comments: CommentType[];
}

export const CommentList = ({ comments }: CommentListProps) => {
  return (
    <>
      {comments.map((comment) => {
        return (
          <div key={comment.id} className="p-4 flex items-center gap-5">
            <Avatar size="S" />
            <div>
              <span>{comment.user.name}</span>
              <span className="text-xs mx-2 text-gray-400">3 years ago</span>
              <p>{comment.text}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
