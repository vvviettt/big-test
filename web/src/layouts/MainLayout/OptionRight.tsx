import { Link } from "react-router-dom";
import SearchMain from "../../components/SearchMain";
import Trending from "../../components/Trending";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  showLoginFormChange,
  showRegisterFormChange,
} from "../../redux/state/stateSlice";

const OptionRight = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  if (!isLoggedIn) {
    return (
      <div className="h-[100vh] overflow-scroll relative no-scrollbar">
        <div className=" border border-solid rounded-xl px-3 mt-10">
          <h4 className="font-black text-xl py-4 ">Mới dùng Tampy ?</h4>
          <p className="text-[13px] font-light">
            Đăng ký ngay để nhận dòng thời gian cá nhân hóa của riêng bạn!
          </p>
          <button
            onClick={() => dispatch(showRegisterFormChange(true))}
            className={
              "flex w-full h-10 justify-center items-center bg-highlight px-4 rounded-full my-3"
            }
          >
            <span className="text-[15px] font-bold text-white">
              Đăng ký tài khoản
            </span>
          </button>
          <button
            onClick={() => dispatch(showLoginFormChange(true))}
            className={
              "flex w-full h-10 justify-center items-center bg-highlight px-4 rounded-full my-3"
            }
          >
            <span className="text-[15px] font-bold text-white">Đăng nhập</span>
          </button>
          <p className="text-[13px] font-light pb-4">
            Khi đăng ký, bạn đã đồng ý với{" "}
            <Link className="text-highlight hover:underline" to={""}>
              Điều khoản Dịch vụ
            </Link>{" "}
            và{" "}
            <Link className="text-highlight hover:underline" to={""}>
              Chính sách Quyền riêng tư
            </Link>
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="h-[100vh] overflow-scroll relative no-scrollbar">
      <div className=" flex flex-col gap-3">
        <div className="sticky left-0 right-0 top-0 pt-5 pb-3 bg-white">
          <SearchMain />
        </div>
        <Trending />
      </div>
    </div>
  );
};

export default OptionRight;
