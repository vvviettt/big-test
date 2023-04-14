import { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import IntroductionPage from "../pages/IntroductionPage";

export const publicRoutes: RouteObject[] = [
  {
    path: "",
    element: <MainLayout />,
    children: [{ path: "", element: <IntroductionPage /> }],
  },
];
