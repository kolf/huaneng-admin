import React, { useState, useCallback } from 'react';
import ProTable from '@/components/ProTable';
import { useGetUsers } from '@/api';
import { MenuParams } from '@/models/menu';
import { Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, AuditOutlined, ReloadOutlined } from '@ant-design/icons';
import modal from '@/utils/modal';

const Menus = () => {
  const [params, setParams] = useState<MenuParams>({
    // menuType: 1,
    // orderNum: 1,
    // menuName: '1'
  });
  const { data, error, loading, run } = useGetUsers(params);

  const columns = [
    { title: '用户名称', dataIndex: 'userName', valueType: 'input' },
    { title: '用户昵称', dataIndex: 'nickName' },
    { title: '部门', dataIndex: 'deptId' },
    { title: '手机号码', dataIndex: 'phone' },
    { title: '性别', dataIndex: 'sex' },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'input',
      render(text) {
        if (text === 0) {
          return <Tag color="success">正常</Tag>;
        }
        if (text === 1) {
          return <Tag color="error">停用</Tag>;
        }
        return text + '000';
      }
    },
    { title: '创建时间', dataIndex: 'createTime' },
    {
      title: '操作',
      dataIndex: 'userId',
      render(text, records) {
        return (
          <Space>
            <a onClick={updateUser.bind(this, records)}>
              <EditOutlined />
              修改
            </a>
            <a>
              <DeleteOutlined />
              删除
            </a>
            <a onClick={setRoles.bind(this, records)}>
              <AuditOutlined />
              分配角色
            </a>
          </Space>
        );
      }
    }
  ];

  const updateUser = useCallback(() => {
    modal({
      title: '修改用户',
      content: <div>111</div>
    });
  }, []);

  const addUser = useCallback(() => {
    modal({
      title: '添加用户',
      content: <div>111</div>
    });
  }, []);

  const setRoles = useCallback(id => {
    modal({
      title: '分配角色',
      content: <div>111</div>
    });
  }, []);

  const handleSearch = (values?: any) => {
    console.log(values, 'value');
    setParams({ ...params, ...values });
  };

  console.log(data, 'data');

  return (
    <>
      <ProTable
        headerTitle="用户列表"
        columns={columns}
        loading={loading}
        dataSource={data?.list}
        search={{
          collapsed: false,
          onFinish: handleSearch
        }}
        toolBarRender={() => [
          <Space>
            <Button type="primary" key="primary" onClick={() => addUser()}>
              添加
            </Button>
            <Button icon={<ReloadOutlined />} onClick={() => handleSearch()}>
              刷新
            </Button>
          </Space>
        ]}
      />
    </>
  );
};

export default Menus;
