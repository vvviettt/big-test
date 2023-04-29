import { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import IntroductionPage from "../pages/IntroductionPage";
import HomePage from "../pages/HomePage";

export const publicRoutes: RouteObject[] = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      { path: "", element: <HomePage /> },
      // { path: "", element: <HomePage /> },
    ],
  },
];
