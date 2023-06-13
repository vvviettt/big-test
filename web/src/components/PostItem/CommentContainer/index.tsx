import { FC, useEffect, useRef } from "react";
import { useAppDispatch } from "../../../redux/store";
import { comment, getComments } from "../../../redux/post/postSlice";
import { CommentResponse } from "../../../services/post/postInterface";
import CommentItem from "./CommentItem";

interface CommentContainerProps {
  postId: string;
  comments: CommentResponse[];
}

const CommentContainer: FC<CommentContainerProps> = ({ postId, comments }) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    dispatch(getComments({ postId }));
  }, []);

  return (
    <div className="pt-2 border-t-2 mt-2">
      {comments.map((comment) => {
        console.log();

        return <CommentItem key={comment.id} comment={comment}></CommentItem>;
      })}
      <form
        onSubmit={() => {
          const val = inputRef.current?.value;
          if (val !== undefined && val !== null && val !== "")
            dispatch(comment({ postId, content: val }));
        }}
      >
        <input
          ref={inputRef}
          className="w-[100%] outline-none border px-3 py-2 rounded-lg"
          type="text"
          placeholder="Bình luận..."
        />
      </form>
    </div>
  );
};

export default CommentContainer;
