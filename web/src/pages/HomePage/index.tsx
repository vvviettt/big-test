import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { changePostType } from "../../redux/post/postSlice";
import AddPostForm from "../../components/AddPostForm";
import PostItem from "../../components/PostItem";

const HomePage: React.FC = () => {
  return (
    <>
      <HomeTab />
      <AddPostForm />
      {/* <PostItem
        like={[]}
        comments={[]}
        commentCount={0}
        userId="pppp"
        userName="Elon Musk"
        postId={"akjdakbv"}
        postAt={new Date(2023, 4, 4, 14, 0, 0, 0)}
        postContent={`Major software upgrades underway across the board.\nEncrypted DMs & other DM upgrades rolling out this week.`}
      /> */}
    </>
  );
};

export default HomePage;

const HomeTab = () => {
  const { postTypes } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  return (
    <div className="border-b-2 border-secondary">
      <p className="text-[20px] font-bold px-4 h-10 leading-10">Trang chủ</p>
      <div className="flex ">
        <div
          className="flex-1 flex justify-center hover:bg-secondary py-4 relative cursor-pointer"
          onClick={() => dispatch(changePostType("FOR_YOU"))}
        >
          <p className="font-bold text-sm">Dành cho bạn</p>
          <div
            className={classNames("absolute  h-1 w-24 rounded-full bottom-0", {
              "bg-highlight": postTypes === "FOR_YOU",
            })}
          ></div>
        </div>
        <div
          className="flex-1 flex justify-center hover:bg-secondary py-4 relative cursor-pointer"
          onClick={() => dispatch(changePostType("FOLLOWING"))}
        >
          <p className="font-bold text-sm">Đang theo dõi</p>
          <div
            className={classNames("absolute  h-1 w-24 rounded-full bottom-0", {
              "bg-highlight": postTypes === "FOLLOWING",
            })}
          ></div>
        </div>
      </div>
    </div>
  );
};
