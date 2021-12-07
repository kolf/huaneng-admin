import React, { FC } from 'react';
import { Spin } from 'antd';

const Loading: FC = () => {
  return (
    <Spin tip="加载中...">
      <div style={{ minHeight: 300 }} />
    </Spin>
  );
};

export default Loading;
