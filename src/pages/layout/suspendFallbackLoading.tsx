import React, { FC } from "react";
import { Spin, Alert } from "antd";

const SuspendFallbackLoading: FC = () => {
  return (
    <Spin tip="加载中...">
      <div />
    </Spin>
  );
};

export default SuspendFallbackLoading;
