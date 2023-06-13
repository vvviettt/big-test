import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ReactComponent as BackIcon } from "../../assets/svg/back-arrow.svg";
import { ReactComponent as CalenderIcon } from "../../assets/svg/calender.svg";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { showChangeInfoFormChange } from "../../redux/state/stateSlice";
import loading from "../../assets/jsons/98288-loading.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useRef } from "react";
import { getUserInfo } from "../../redux/user/userSlice";
import { getMyPost } from "../../redux/post/postSlice";
import { StatusFetch } from "../../enums/StatusFetch.enum";
import PostItem from "../../components/PostItem";

function ProfilePage() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const { myPosts, getMyPostStatus } = useAppSelector((state) => state.post);
  useEffect(() => {
    if (!user) {
      dispatch(getUserInfo());
    }
    dispatch(getMyPost());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listInnerRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        // TO SOMETHING HERE
        console.log("Reached bottom");
      }
    }
  };

  if (!user) return <></>;
  const date = new Date(user.createdAt);

  return (
    <div className="">
      <div className="px-4 flex sticky z-50 top-0 bg-white py-1">
        <button
          onClick={() => {
            navigator(-1);
          }}
        >
          <BackIcon opacity={0.6} width={24} />
        </button>
        <div className="ml-6">
          <p className=" font-bold text-[20px] leading-5">
            {user.firstName + " " + user.lastName}
          </p>
          <p className="text-[14px]">{user.postCount} Post</p>
        </div>
      </div>
      <div className="pb-3 border-b-[2px] border-gray-200 ">
        <div
          className="aspect-[3/1]  bg-gray-200 mt-2 bg-cover"
          style={{ backgroundImage: `url(${user.coverImageUrl})` }}
        ></div>
        <div className="flex items-center justify-between px-4">
          <div className="mt-[-15%]">
            <div className=" rounded-full p-1 bg-white flex">
              <Avatar avatarUrl={user.avatarUrl} size={140} />
            </div>
          </div>
          <button
            onClick={() => {
              dispatch(showChangeInfoFormChange(true));
            }}
            className="border border-solid bg-highlight px-4 py-1 rounded-full"
          >
            <span className="font-medium text-white">Chỉnh sửa hồ sơ</span>
          </button>
        </div>
        <div className="px-4">
          <h2 className=" text-[20px] font-bold pt-1 pb-3">
            {user.firstName + " " + user.lastName}
          </h2>
          <p className="text-[15px] pb-3">{user.description}</p>
          <div className="flex pb-3">
            <CalenderIcon width={19} />
            <p className="text-[15px]">
              Tham gia vào tháng {date.getMonth() + 1} năm {date.getFullYear()}
            </p>
          </div>
          <div className="flex gap-5">
            <Link className="text-[15px] hover:underline" to="">
              <span className="font-bold">{user.following}</span> Đang theo dõi
            </Link>
            <Link className="text-[15px] hover:underline" to="">
              <span className="font-bold">{user.followers}</span> Người theo dõi
            </Link>
          </div>
        </div>
      </div>
      <div className="">
        {getMyPostStatus === StatusFetch.LOADING && (
          <Player src={loading} autoplay loop style={{ width: "100px" }} />
        )}
        <div className="" ref={listInnerRef} onScroll={() => onScroll()}>
          {myPosts.map((post, index) => {
            return (
              <PostItem
                postImageUrl={post.images}
                like={post.likes}
                comments={post.comments}
                commentCount={post.commentTotal}
                key={post.id}
                userId={post.owner.id}
                userName={post.owner.firstName + " " + post.owner.lastName}
                postId={post.id}
                postAt={new Date(post.createdAt)}
                postContent={post.content}
                survey={post.survey}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
