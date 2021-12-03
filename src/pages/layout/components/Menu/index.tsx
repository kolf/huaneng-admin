export default [
  {
    path: "/dashboard",
    name: "首页",
  },
  {
    path: "/system",
    name: "系统管理",
    routes: [
      {
        path: "/system/users",
        name: "用户管理",
      },
      {
        path: "/system/roles",
        name: "角色管理",
      },
      {
        path: "/system/permission",
        name: "权限管理",
      },
      {
        path: "/system/menus",
        name: "菜单管理",
      },
    ],
  },
];
