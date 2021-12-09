import React, { useState, useCallback } from 'react';
import ProTable from '@/components/ProTable';
import { Button, Space, Modal, Tag, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import modal from '@/utils/modal';
import { statusOptions } from '@/utils/options';
import useRequest from '@ahooksjs/use-request';
import { getLoginLogs } from '@/api/log.api';
import { LogParams } from '@/models/log';

const makeData = data => {
  if (!data) {
    return [];
  }
  return data;
};

const SystemLogs = () => {
  const [params, setParams] = useState<LogParams>({
    pageNumber: 1,
    pageSize: 10
  });
  const { data, error, loading } = useRequest(() => getLoginLogs(params), {
    refreshDeps: [params],
    formatResult: res => res.data
  });

  const handleSearch = values => {
    setParams({ ...params, ...values, pageNumber: 1 });
  };

  const columns = [
    { title: '登陆用户', dataIndex: 'userName', valueType: 'input' },
    { title: 'IP', dataIndex: 'ipaddr' },
    { title: '登陆地址', dataIndex: 'loginLocation' },
    { title: '操作系统', dataIndex: 'os' },
    { title: '浏览器', dataIndex: 'browser' },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'searchSelect',
      options: statusOptions,
      render(text) {
        if (text === 0) {
          return <Tag color="success">正常</Tag>;
        }
        if (text === 1) {
          return <Tag color="error">异常</Tag>;
        }
      }
    },
    {
      title: '登陆时间',
      dataIndex: 'operTime',
      valueType: 'dateRange',
      render(text, records) {
        return records.loginTime;
      }
    },
    {
      title: '操作',
      dataIndex: 'userId',
      width: 190,
      render(text, records) {
        return (
          <Space>
            <a>查看</a>
          </Space>
        );
      }
    }
  ];

  return (
    <>
      <ProTable
        headerTitle="日志列表"
        rowKey="infoId"
        columns={columns}
        loading={loading}
        dataSource={makeData(data?.list)}
        pagination={{
          total: data?.totalCount,
          onChange(pageNum, pageSize) {
            const pageNumber = pageSize !== params.pageSize ? 1 : pageNum;
            setParams({
              pageNumber,
              pageSize
            });
          }
        }}
        search={{
          collapsed: false,
          onFinish: handleSearch
        }}
        toolBarRender={() => [
          <Space>
            <Button icon={<ReloadOutlined />} onClick={() => handleSearch({})}>
              刷新
            </Button>
          </Space>
        ]}
      />
    </>
  );
};

export default SystemLogs;
