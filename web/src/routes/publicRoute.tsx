import { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/Profile";

export const publicRoutes: RouteObject[] = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/profile", element: <ProfilePage /> },
    ],
  },
];
