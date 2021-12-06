import React, { Suspense, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import axios, { AxiosContext } from './api/request';

import App from './App';
import SuspendFallbackLoading from './layout/SuspendFallbackLoading';

const AxiosProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const axiosValue = useMemo(() => {
    return axios;
  }, []);

  return <AxiosContext.Provider value={axiosValue}>{children}</AxiosContext.Provider>;
};

ReactDOM.render(
  // <React.StrictMode>
  <AxiosProvider>
    <RecoilRoot>
      <Suspense fallback={<SuspendFallbackLoading />}>
        <App />
      </Suspense>
    </RecoilRoot>
  </AxiosProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
