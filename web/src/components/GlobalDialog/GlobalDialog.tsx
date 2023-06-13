import { useAppDispatch, useAppSelector } from "../../redux/store";
import LoginForm from "../LoginForm/LoginForm";
import { ReactComponent as CloseIcon } from "../../assets/svg/close.svg";
import { closeAuth } from "../../redux/state/stateSlice";
import RegisterForm from "../RegisterForm/RegisterForm";
import ChangInfoForm from "../ChangInfoForm";

const GlobalDialog = () => {
  const { showLoginForm, showRegisterForm, showChangeInfoForm } =
    useAppSelector((state) => state.globalState);
  console.log(showLoginForm);
  const dispatch = useAppDispatch();

  return showLoginForm || showRegisterForm || showChangeInfoForm ? (
    <div className=" flex justify-center items-center absolute w-screen bg-black bg-opacity-40  bg-s top-0 bottom-0 z-50 select-none">
      <div className="max-h-[90%] w-[600px] bg-white px-14 pb-7 pt-5 rounded-2xl relative overflow-scroll">
        <div className="overflow-scroll flex-shrink">
          {showLoginForm && <LoginForm />}
          {showRegisterForm && <RegisterForm />}
          {showChangeInfoForm && <ChangInfoForm />}
        </div>
        <div
          className="absolute top-5 left-5 hover:cursor-pointer"
          onClick={() => {
            dispatch(closeAuth());
          }}
        >
          <CloseIcon width={24} />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default GlobalDialog;
