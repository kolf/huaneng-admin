import React, { useEffect, FC } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import ProLayout, { PageContainer } from "@ant-design/pro-layout";
import { Button } from "antd";
import RightContent from "./components/RightContent";
import customMenuDate from "./components/Menu";

import { userState } from "@/stores/user";
import { useRecoilState } from "recoil";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Layout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [navigate, location]);

  const toggle = () => {
    setUser({ ...user, collapsed: false });
  };

  return (
    <ProLayout
      style={{
        height: "100vh",
      }}
      title="中国华能"
      menu={{
        request: async () => {
          await waitTime(2000);
          return customMenuDate;
        },
      }}
      location={{
        pathname: location.pathname,
      }}
      rightContentRender={() => <RightContent />}
      menuHeaderRender={undefined}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
    >
      <Outlet />
    </ProLayout>
  );
};

export default Layout;
