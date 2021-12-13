import React, { useState, useCallback } from 'react';
import ProTable from '@/components/ProTable';
import { Button, Space, Modal, Tag, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import modal from '@/utils/modal';
import { logStatusOptions, logTypeOptions, logTypeEnum } from '@/utils/options';
import useRequest from '@ahooksjs/use-request';
import { getSystemLogs } from '@/api/log.api';
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
      result.operTimeStart = startTime.format('YYYY-MM-DD') + ' 00:00:00';
      result.operTimeEnd = endTime.format('YYYY-MM-DD') + ' 23:59:59';
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
  } = useRequest(() => getSystemLogs(makeParams(params)), {
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
      dataIndex: 'businessType',
      valueType: 'searchSelect',
      options: logTypeOptions,
      render(text) {
        return logTypeEnum[text] || '未知';
      }
    },
    { title: '操作人员', dataIndex: 'operName' },
    { title: '操作地址', dataIndex: 'operLocation' },
    { title: 'IP', dataIndex: 'operIp' },
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
      title: '操作时间',
      dataIndex: 'operTime',
      valueType: 'dateRange'
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
