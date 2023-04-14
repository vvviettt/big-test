import { Outlet } from "react-router-dom";
import SideBar from "./NavBar";

const MainLayout: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[275px]">
        <SideBar />
      </div>
      <div className="w-[37.5rem] bg-black">
        <Outlet />
      </div>
      <div className="w-[390px] "></div>
    </div>
  );
};

export default MainLayout;
