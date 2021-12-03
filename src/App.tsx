import React, { Suspense, useEffect, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { localeConfig } from '@/config/locale';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import RenderRouter from './routes';

import './App.less';

import { useGetCurrentUser } from './api';
import { createBrowserHistory } from 'history';
import { useRecoilState } from 'recoil';
import { userState } from './stores/user';

const history = createBrowserHistory();

const App: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const { locale } = user;

  const { data: currentUser, error } = useGetCurrentUser();

  useEffect(() => {
    console.log('currentUser: ', currentUser);
    setUser({ ...user, username: currentUser?.username || '', logged: true });
  }, [currentUser]);

  const getLocale = () => {
    const lang = localeConfig.find(item => {
      return item.key === locale.toLowerCase();
    });

    return lang?.messages;
  };

  if (error) {
    setUser({ ...user, logged: false });
    history.push('/login');
  }

  return (
    <ConfigProvider locale={zhCN} componentSize="middle">
      <IntlProvider locale={locale.split('-')[0]} messages={getLocale()}>
        <BrowserRouter>
          <RenderRouter />
        </BrowserRouter>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default App;
