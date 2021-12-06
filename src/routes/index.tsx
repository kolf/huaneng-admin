import React, { lazy, FC } from 'react';

import Dashboard from '@/pages/dashboard';
import Login from '@/pages/login';
import Layout from '@/layout';
import PrivateRoute from './PrivateRoute';
import { useRoutes, RouteObject } from 'react-router-dom';

//TODO: lazy加载组件，prolayout的菜单无法自动选中菜单项，原因不明
// const NotFound = lazy(() => import('@/pages/404'));
// const AccountPage = lazy(() => import('@/pages/account'));
// const Project = lazy(() => import('@/pages/project'));

import NotFound from '@/pages/404';
import Project from '@/pages/project';
import Permission from '@/pages/permission';
import Menus from '@/pages/menus';
import Users from '@/pages/users';
import Depts from '@/pages/depts';
import Roles from '@/pages/roles';

const routeList: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/dashboard',
        element: <PrivateRoute element={<Dashboard />} />
      },
      {
        path: '/system/user',
        element: <PrivateRoute element={<Users />} />
      },
      {
        path: '/system/menu',
        element: <PrivateRoute element={<Menus />} />
      },
      {
        path: '/system/role',
        element: <PrivateRoute element={<Roles />} />
      },
      {
        path: '/system/dept',
        element: <PrivateRoute element={<Depts />} />
      },
      {
        path: '*',
        element: <PrivateRoute element={<NotFound />} />
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  }
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
