import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Menu, Spin } from "antd";

import HeaderDropdown from "../HeaderDropdown";
import classes from "./index.module.less";
import { useRecoilState } from "recoil";
import { userState } from "@/stores/user";

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const RightContent: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const [user, setUser] = useRecoilState(userState);

  const { username, avatar } = user;

  const navigate = useNavigate();
  const location = useLocation();

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    // Note: There may be security issues, please note
    if (location.pathname !== "/login") {
      navigate("/login", {
        replace: true,
      });
    }
  };

  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;
      if (key === "logout" && user) {
        setUser({ ...user, logged: false });
        loginOut();
        return;
      }
    },
    [user, setUser]
  );

  if (!user) {
    return null;
  }

  const menuHeaderDropdown = (
    <Menu className={"menu"} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${classes.action}`}>
        <Avatar className={classes.avatar} src={avatar} alt="avatar" />
        <span className={`${classes.name}`}>{username}</span>
      </span>
    </HeaderDropdown>
  );
};

export default RightContent;
