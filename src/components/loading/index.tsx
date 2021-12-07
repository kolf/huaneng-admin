import React, { FC } from 'react';
import { Spin } from 'antd';

const Loading: FC = () => {
  return (
    <Spin tip="加载中...">
      <div />
    </Spin>
  );
};

export default Loading;
