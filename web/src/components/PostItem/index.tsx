import { ReactComponent as LoveIcon } from "../../assets/svg/love.svg";
import { ReactComponent as ShareIcon } from "../../assets/svg/share.svg";
import { ReactComponent as CommentIcon } from "../../assets/svg/comment.svg";
import { convertTimePost } from "../../util/dateHelper";
import Avatar from "../Avatar";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { voteSuvey, lovePost } from "../../redux/post/postSlice";
import CommentContainer from "./CommentContainer";
import { CommentResponse } from "../../services/post/postInterface";

interface PostItemProps {
  userId: string;
  userName: string;
  userAvatarUrl?: string;
  postId: string;
  isRePost?: boolean;
  postAt: Date;
  postContent: string;
  postImageUrl?: string[];
  like: string[];
  comments: CommentResponse[];
  commentCount: number;
  survey?: {
    label: string;
    vote: string[];
  }[];
}

const PostItem: React.FC<PostItemProps> = ({
  userId,
  userName,
  userAvatarUrl,
  postId,
  postContent,
  postImageUrl = [],
  postAt,
  like,
  comments,
  commentCount,
  survey = [],
}) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleVote = (index: number) => {
    dispatch(voteSuvey({ postId, suveyIndex: index }));
  };

  const [showComment, setShowComment] = useState(false);
  return (
    <div className="flex gap-2 hover:bg-[#00000008] px-4 py-3 border-b-2 border-secondary">
      <div className="">
        <Avatar id={userId} size={52} />
      </div>
      <div className="flex-1">
        <div className="flex">
          <p className="flex items-center gap-2">
            <span className="text-[15px] font-bold text-black">{userName}</span>
            ·
            <span className="text-[15px] text-textSecondary">
              {convertTimePost(postAt)}
            </span>
          </p>
        </div>
        <span className="whitespace-pre text-text text-[15px] pb-2 block">
          {postContent}
        </span>
        <div className="">
          {survey.map((s, i) => {
            return (
              <SurveyItem
                {...s}
                onChoose={() => {
                  if (!s.vote.includes(user?.id ?? "")) {
                    handleVote(i);
                  }
                }}
                isSelected={s.vote.includes(user?.id ?? "")}
                key={i}
              />
            );
          })}
        </div>
        <div className="max-h-[500px] flex justify-center flex-shrink gap-2 flex-wrap">
          {postImageUrl.length === 1 && (
            <div className=" rounded-lg overflow-hidden">
              <img src={postImageUrl[0]} alt="" />
            </div>
          )}
          {postImageUrl.length === 2 && (
            <>
              <div className=" rounded-lg overflow-hidden">
                <img src={postImageUrl[0]} alt="" />
              </div>
              <div className=" rounded-lg overflow-hidden">
                <img src={postImageUrl[1]} alt="" />
              </div>
            </>
          )}
          {postImageUrl.length === 3 && (
            <div className="flex flex-col gap-2 max-h-[500px]">
              <div className="flex gap-2">
                <div className=" rounded-lg overflow-hidden">
                  <img src={postImageUrl[0]} alt="" />
                </div>
                <div className=" rounded-lg overflow-hidden">
                  <img src={postImageUrl[1]} alt="" />
                </div>
              </div>
              <div className=" rounded-lg overflow-hidden">
                <img
                  src={postImageUrl[2]}
                  alt=""
                  className="translate-y-[-50%]"
                />
              </div>
            </div>
          )}
          {postImageUrl.length === 4 && (
            <div className="flex flex-col gap-2 max-h-[500px]">
              <div className="flex gap-2">
                <div className=" rounded-lg overflow-hidden">
                  <img src={postImageUrl[0]} alt="" />
                </div>
                <div className=" rounded-lg overflow-hidden">
                  <img src={postImageUrl[1]} alt="" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className=" rounded-lg overflow-hidden">
                  <img src={postImageUrl[2]} alt="" />
                </div>
                <div className=" rounded-lg overflow-hidden">
                  <img src={postImageUrl[3]} alt="" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex mx-[-8px] pt-3">
          <ActionBtn
            fill="love"
            value={like.length.toString()}
            active={like.includes(user?.id ?? "")}
            Icon={LoveIcon}
            onClick={() => {
              dispatch(lovePost({ postId }));
            }}
          />
          <ActionBtn
            fill="comment"
            value={commentCount.toString()}
            Icon={CommentIcon}
            onClick={() => {}}
          />
          <ActionBtn
            fill="share"
            value=""
            Icon={ShareIcon}
            onClick={() => {}}
          />
        </div>
        <CommentContainer postId={postId} comments={comments} />
      </div>
    </div>
  );
};

export default PostItem;
interface ActionBtnProps {
  fill: string;
  value: string;
  active?: boolean;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
}

const ActionBtn: React.FC<ActionBtnProps> = ({
  value,
  Icon,
  onClick,
  fill,
  active,
}) => {
  return (
    <div
      className={classNames(
        "flex gap-2 flex-1 justify-start items-center group cursor-pointer"
      )}
      onClick={() => onClick()}
    >
      <div
        className={classNames(
          "p-2 flex justify-center items-center rounded-full",
          {
            "group-hover:first:fill-comment group-hover:bg-commentBg":
              fill === "comment",
            "group-hover:first:fill-share group-hover:bg-shareBg":
              fill === "share",
            "group-hover:first:fill-love group-hover:bg-loveBg":
              fill === "love",
            "first:fill-comment group-hover:bg-commentBg":
              fill === "comment" && active,
            "first:fill-share group-hover:bg-shareBg":
              fill === "share" && active,
            "first:fill-love group-hover:bg-loveBg": fill === "love" && active,
          }
        )}
      >
        <Icon width={17} height={17} className={"fill-comment]"} />
      </div>
      <span
        className={classNames({
          "group-hover:text-comment ": fill === "comment",
          "group-hover:text-share ": fill === "share",
          "group-hover:text-love ": fill === "love",
          "text-comment ": fill === "comment" && active,
          "text-share ": fill === "share" && active,
          "text-love ": fill === "love" && active,
        })}
      >
        {value}
      </span>
    </div>
  );
};

const SurveyItem: React.FC<{
  label: string;
  vote: string[];
  isSelected: boolean;
  onChoose?: () => void;
}> = ({ label, vote, isSelected, onChoose }) => {
  const selectRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const time = setTimeout(() => {
      if (selectRef.current) {
        selectRef.current.style.width = "100%";
      }
    }, 200);
    return () => {
      clearTimeout(time);
    };
  }, [selectRef, isSelected]);
  return (
    <div
      className="mb-2 relative overflow-hidden rounded-md border-gray-200 border cursor-pointer"
      onClick={() => {
        if (!isSelected) {
          onChoose && onChoose();
        }
      }}
    >
      <div
        className={classNames(
          "flex justify-between relative items-center  px-4 py-2  overflow-hidden z-10"
        )}
      >
        <p className={classNames({ "text-white": isSelected })}>{label}</p>
        <p className={classNames({ "text-white": isSelected })}>
          {vote.length}
        </p>
      </div>
      {isSelected && (
        <div
          ref={selectRef}
          className="absolute w-0 top-0 left-0 right-0 bottom-0 bg-highlight z-0 duration-1000 translate-all"
        ></div>
      )}
    </div>
  );
};
