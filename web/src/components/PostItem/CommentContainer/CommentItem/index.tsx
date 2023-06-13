import { FC } from "react";
import { CommentResponse } from "../../../../services/post/postInterface";
import Avatar from "../../../Avatar";

interface CommentItemProp {
  comment: CommentResponse;
}

const CommentItem: FC<CommentItemProp> = ({ comment }) => {
  return (
    <div className="flex gap-2 mb-2">
      <div className="flex-none">
        <Avatar size={30} avatarUrl={comment.owner.avatarUrl} />
      </div>
      <div className=" bg-black bg-opacity-20 text-black px-3 py-3 rounded-lg">
        <p>{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
