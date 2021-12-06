import React, { useState, useCallback } from 'react';
import ProTable from '@/components/ProTable';
import { useGetDepts } from '@/api';
import { MenuParams } from '@/models/menu';
import { Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const Menus = () => {
  const [params, setParams] = useState<MenuParams>({
    // menuType: 1,
    // orderNum: 1,
    // menuName: '1'
  });
  const { data, error, loading, run } = useGetDepts(params);

  const onAdd = useCallback(id => {
    console.log(id);
  }, []);

  const columns = [
    { title: '部门名称', dataIndex: 'deptName', valueType: 'input' },
    { title: '排序', dataIndex: 'orderNum' },
    { title: '状态', dataIndex: 'status', valueType: 'input' },
    { title: '创建时间', dataIndex: 'createTime' },
    {
      title: '操作',
      dataIndex: 'oper',
      render(records) {
        return (
          <Space>
            <a>
              <EditOutlined />
              修改
            </a>
            <a onClick={onAdd.bind(this, records)}>
              <PlusOutlined />
              新增
            </a>
            <a>
              <DeleteOutlined />
              删除
            </a>
          </Space>
        );
      }
    }
  ];

  const handleSearch = values => {
    setParams({ ...params, ...values });
  };

  return (
    <>
      <ProTable
        headerTitle="部门列表"
        columns={columns}
        loading={loading}
        dataSource={data?.data}
        search={{
          collapsed: false,
          onFinish: handleSearch
        }}
      />
    </>
  );
};

export default Menus;
