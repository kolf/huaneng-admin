import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Menu, Spin } from 'antd';

import HeaderDropdown from '../HeaderDropdown';
import classes from './index.module.less';
import { useRecoilState } from 'recoil';
import { userState } from '@/stores/user';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const RightContent: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const [user] = useRecoilState(userState);
  const { username, avatar } = user;
  const navigate = useNavigate();
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const logout = useCallback(async () => {
    window.location.href = '/login';
  }, []);

  const onMenuClick = useCallback(e => {
    const { key } = e;
    switch (key) {
      case 'logout':
        logout();
        break;
      default:
        break;
    }
  }, []);

  if (!user) {
    return null;
  }

  const menuHeaderDropdown = (
    <Menu className={'menu'} selectedKeys={[]} onClick={onMenuClick}>
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
