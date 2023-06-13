import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./NavBar";
import OptionRight from "./OptionRight";
import { useEffect } from "react";
import { useAppSelector } from "../../redux/store";
const MainLayout: React.FC = () => {
  const { redirectPath } = useAppSelector((state) => state.globalState);
  const navigation = useNavigate();
  useEffect(()=> {
    if(redirectPath){
      navigation(redirectPath)
    }
  }, [redirectPath, navigation])
  return (
    <div className="flex justify-center">
      <div className="w-[275px]">
        <SideBar />
      </div>
      <div className="w-[37.5rem] border-x-2 border-x-gray-200">
        <div className="h-screen overflow-scroll no-scrollbar">
          <Outlet />
        </div>
      </div>
      <div className="w-[390px] pl-5">
        <OptionRight />
      </div>
    </div>
  );
};

export default MainLayout;
