import React, { useState, useCallback } from 'react';
import ProTable from '@/components/ProTable';
import { Button, Space, Modal, Tag, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import modal from '@/utils/modal';
import { logStatusOptions } from '@/utils/options';
import useRequest from '@ahooksjs/use-request';
import { getLoginLogs } from '@/api/log.api';
import { LogParams } from '@/models/log';

const defaultData = {
  list: [],
  totalCount: 0
};

const makeData = data => {
  if (!data) {
    return [];
  }
  return data;
};

const makeParams = params => {
  return Object.entries(params).reduce((result, item) => {
    const [key, value] = item;
    if (/Time$/.test(key) && value) {
      const [startTime, endTime] = value;
      result.loginTimeStart = startTime.format('YYYY-MM-DD') + ' 00:00:00';
      result.loginTimeEnd = endTime.format('YYYY-MM-DD') + ' 23:59:59';
    } else if (value) {
      result[key] = value;
    }

    return result;
  }, {});
};

const SystemLogs = () => {
  const [params, setParams] = useState<LogParams>({
    pageNumber: 1,
    pageSize: 10
  });
  const {
    data = defaultData,
    error,
    loading
  } = useRequest(() => getLoginLogs(makeParams(params)), {
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
      options: logStatusOptions,
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
      width: 60,
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
