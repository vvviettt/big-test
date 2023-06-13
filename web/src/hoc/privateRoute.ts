import { FunctionComponent, useEffect } from "react";
import { useAppSelector } from "../redux/store";

export const privateRoutes = (Component: React.FC) => {
  return () => {
    const { isLoggedIn } = useAppSelector((state) => state.user);
    useEffect(() => {
      if (!isLoggedIn) {
        console.log("You are not logged in");
      }
    }, [isLoggedIn]);
    return Component;
  };
};
