import React, { useState, useCallback } from 'react';
import ProTable from '@/components/ProTable';
import { Button, Space, Modal, Tag, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import modal from '@/utils/modal';
import { statusOptions } from '@/utils/options';
import useRequest from '@ahooksjs/use-request';
import { getSystemLogs } from '@/api/log.api';
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
  const { data, error, loading } = useRequest(() => getSystemLogs(params), {
    refreshDeps: [params],
    formatResult: res => res.data
  });

  const handleSearch = values => {
    setParams({ ...params, ...values, pageNumber: 1 });
  };

  const columns = [
    { title: '模块标题', dataIndex: 'title', valueType: 'input' },
    {
      title: '业务类型',
      dataIndex: 'status',
      valueType: 'searchSelect',
      options: statusOptions
    },
    { title: '操作人员', dataIndex: 'operName' },
    { title: '操作地址', dataIndex: 'operLocation' },
    { title: 'IP', dataIndex: 'operIp' },
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
    { title: '操作时间', dataIndex: 'operTime', valueType: 'dateRange' },
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
        rowKey="operId"
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
