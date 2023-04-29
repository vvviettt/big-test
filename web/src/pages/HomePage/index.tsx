import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useCallback } from "react";
import { changePostType } from "../../redux/post/postSlice";
import AddPostForm from "../../components/AddPostForm";

const HomePage: React.FC = () => {
  return (
    <>
      <HomeTab />
      <AddPostForm />
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
