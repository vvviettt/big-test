import { ReactNode, useState } from "react";
import { ReactComponent as HomeIcon } from "../../assets/svg/home.svg";
import { ReactComponent as HomeIconActive } from "../../assets/svg/homeActive.svg";
import { ReactComponent as ExploreIcon } from "../../assets/svg/explore.svg";
import { ReactComponent as ExploreIconActive } from "../../assets/svg/exploreActive.svg";
import { ReactComponent as MessageIcon } from "../../assets/svg/message.svg";
import { ReactComponent as MessageIconActive } from "../../assets/svg/messageActive.svg";
import { ReactComponent as NotificationIcon } from "../../assets/svg/notification.svg";
import { ReactComponent as NotificationIconActive } from "../../assets/svg/notificationActive.svg";
import { ReactComponent as ProfileIcon } from "../../assets/svg/profile.svg";
import { ReactComponent as ProfileIconActive } from "../../assets/svg/profileActive.svg";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import classNames from "classnames";

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
  activeIcon: ReactNode;
}

const NavBar: React.FC = () => {
  const [loggedInNavItems] = useState<NavItem[]>([
    {
      label: "Trang chủ ",
      path: "",
      icon: <HomeIcon />,
      activeIcon: <HomeIconActive />,
    },
    {
      label: "Khám phá ",
      path: "/explore",
      icon: <ExploreIcon />,
      activeIcon: <ExploreIconActive />,
    },
    {
      label: "Thông báo ",
      path: "/notification",
      icon: <NotificationIcon />,
      activeIcon: <NotificationIconActive />,
    },
    {
      label: "Tin nhắn ",
      path: "/chats",
      icon: <MessageIcon />,
      activeIcon: <MessageIconActive />,
    },
    {
      label: "Hồ sơ ",
      path: "/profile",
      icon: <ProfileIcon />,
      activeIcon: <ProfileIconActive />,
    },
  ]);
  const [navItems] = useState<NavItem[]>([
    // {
    //   label: "Trang chủ ",
    //   path: "",
    //   icon: <HomeIcon />,
    //   activeIcon: <HomeIconActive />,
    // },
    {
      label: "Khám phá ",
      path: "",
      icon: <ExploreIcon />,
      activeIcon: <ExploreIconActive />,
    },
  ]);
  const { isLoggedIn } = useAppSelector((state) => state.user);

  const nav = isLoggedIn ? loggedInNavItems : navItems;
  return (
    <nav className="pt-14 gap-3  flex-col flex">
      {nav.map((item, index) => {
        return (
          <div
            className={
              "hover:bg-secondary inline-block px-5 py-3 rounded-full mr-10"
            }
            key={index}
          >
            <NavLink to={item.path}>
              {({ isActive }) => {
                return (
                  <div className={"flex items-center"}>
                    <div className={"w-6"}>
                      {isActive ? item.activeIcon : item.icon}
                    </div>
                    <span
                      className={classNames("mr-4 ml-5 text-[20px]", {
                        "font-bold": isActive,
                      })}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              }}
            </NavLink>
          </div>
        );
      })}
    </nav>
  );
};
export default NavBar;
