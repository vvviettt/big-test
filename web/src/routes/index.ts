import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./publicRoute";

export const route = createBrowserRouter([...publicRoutes]);
