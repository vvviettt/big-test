import { Outlet } from "react-router-dom";
import SideBar from "./NavBar";
import OptionRight from "./OptionRight";

const MainLayout: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[275px]">
        <SideBar />
      </div>
      <div className="w-[37.5rem] border-x-2 border-x-gray-200">
        <Outlet />
      </div>
      <div className="w-[390px] pl-5">
        <OptionRight />
      </div>
    </div>
  );
};

export default MainLayout;
