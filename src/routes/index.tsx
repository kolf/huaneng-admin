import React, { lazy, FC } from "react";

import Dashboard from "@/pages/dashboard";
import LoginPage from "@/pages/login";
import LayoutPage from "@/pages/layout";
import PrivateRoute from "./PrivateRoute";
import { useRoutes, RouteObject } from "react-router-dom";

//TODO: lazy加载组件，prolayout的菜单无法自动选中菜单项，原因不明
// const NotFound = lazy(() => import('@/pages/404'));
// const AccountPage = lazy(() => import('@/pages/account'));
// const Project = lazy(() => import('@/pages/project'));

import NotFound from "@/pages/404";
import Project from "@/pages/project";
import Permission from "@/pages/permission";

const routeList: RouteObject[] = [
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "/dashboard",
        element: <PrivateRoute element={<Dashboard />} />,
      },
      {
        path: "/system/users",
        element: <PrivateRoute element={<Project />} />,
      },
      {
        path: "/system/permission",
        element: <PrivateRoute element={<Permission />} />,
      },
      {
        path: "*",
        element: <PrivateRoute element={<NotFound />} />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
