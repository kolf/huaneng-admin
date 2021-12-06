import React, { Suspense, useEffect, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import RenderRouter from '@/routes';
import '@/App.less';
import { createBrowserHistory } from 'history';
import { useRecoilState } from 'recoil';
import { userState } from '@/stores/user';

const history = createBrowserHistory();

const App: React.FC = () => {
  const [user] = useRecoilState(userState);

  if (!user.logged) {
    history.push('/login');
  }

  return (
    <ConfigProvider locale={zhCN} componentSize="middle">
      <BrowserRouter>
        <RenderRouter />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
