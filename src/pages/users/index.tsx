import React, { useState, useCallback } from 'react';
import ProTable from '@/components/ProTable';
import { deleteUser, updateUser, addUser, getUser, getUsers } from '@/api';
import { UserParams } from '@/models/user';
import { Button, Space, Modal, Tag, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, AuditOutlined, ReloadOutlined } from '@ant-design/icons';
import CheckboxGroup from '@/components/CheckboxGroup';
import UpdateForm from './components/UpdateForm';
import UpdateRoles from './components/UpdateRoles';

import modal from '@/utils/modal';
import { statusOptions, sexEnum } from '@/utils/options';
import useRequest from '@ahooksjs/use-request';

const makeData = data => {
  if (!data) {
    return [];
  }
  return data;
};

const defaultValues = {
  menuType: 0,
  status: 0,
  isFrame: 0,
  parentId: 0
};

const Users = () => {
  const [params, setParams] = useState<UserParams>({});
  const { data, error, loading } = useRequest(() => getUsers(params), {
    refreshDeps: [params],
    formatResult: res => res.data
  });

  const onAdd = useCallback(records => {
    let formRef = null;
    const mod = modal({
      title: '添加用户',
      width: 640,
      content: (
        <UpdateForm saveRef={r => (formRef = r)} initialValues={{ ...defaultValues, parentId: records.userId }} />
      ),
      onOk
    });

    async function onOk() {
      const values = await formRef.validateFields();
      mod.confirmLoading();
      try {
        const res = await addUser(values);
        if (res.code !== 200) {
          throw new Error(res.message);
        }
        message.success(`添加成功！`);
        handleSearch({});
      } catch (error) {
        message.error(error.message);
      }
      mod.close();
    }
  }, []);

  const onDelete = useCallback(data => {
    Modal.confirm({
      title: '系统提示',
      content: `是否确认删除名称为${data.userName}的数据项？`,
      onOk
    });

    async function onOk() {
      try {
        const res = await deleteUser(data.userId);
        if (res.code !== 200) {
          throw new Error(res.message);
        }
        message.success(`删除成功！`);
        handleSearch({});
      } catch (error) {
        message.error(error.message);
      }
    }
  }, []);

  const onUpdate = useCallback(records => {
    let formRef = null;
    const mod = modal({
      title: '修改用户',
      width: 640,
      content: <UpdateForm saveRef={r => (formRef = r)} initialValues={records} />,
      onOk
    });

    async function onOk() {
      const values = await formRef.validateFields();
      mod.confirmLoading();
      try {
        const res = await updateUser({ ...values, userId: records.userId });
        if (res.code !== 200) {
          throw new Error(res.message);
        }
        message.success(`修改成功！`);
        handleSearch({});
      } catch (error) {
        message.error(error.message);
      }
      mod.close();
    }
  }, []);

  const setRoles = useCallback(async records => {
    console.log(records.userId);

    let formRef = null;
    const mod = modal({
      title: '分配角色',
      content: <UpdateRoles saveRef={r => (formRef = r)} id={records.userId} />,
      onOk
    });

    async function onOk() {
      const values = await formRef.validateFields();
      mod.confirmLoading();
      try {
        const res = await updateUser({ ...records, ...values });
        if (res.code !== 200) {
          throw new Error(res.message);
        }
        message.success(`设置成功！`);
        handleSearch({});
      } catch (error) {
        message.error(error.message);
      }
      mod.close();
    }
  }, []);

  const handleSearch = values => {
    setParams({ ...params, ...values });
  };

  const columns = [
    { title: '用户名称', dataIndex: 'userName', valueType: 'input' },
    { title: '用户昵称', dataIndex: 'nickName' },
    { title: '部门', dataIndex: 'deptId' },
    { title: '手机号码', dataIndex: 'phone', valueType: 'input' },
    {
      title: '性别',
      dataIndex: 'sex',
      render(text) {
        return sexEnum[text];
      }
    },
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
          return <Tag color="error">停用</Tag>;
        }
      }
    },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateRange' },
    {
      title: '操作',
      dataIndex: 'userId',
      width: 190,
      render(text, records) {
        return (
          <Space>
            <a onClick={onUpdate.bind(this, records)}>
              <EditOutlined />
              修改
            </a>
            <a onClick={onDelete.bind(this, records)}>
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

  return (
    <>
      <ProTable
        headerTitle="用户列表"
        rowKey="userId"
        columns={columns}
        loading={loading}
        dataSource={makeData(data?.list)}
        pagination={{
          total: data?.totalCount
        }}
        search={{
          collapsed: false,
          onFinish: handleSearch
        }}
        toolBarRender={() => [
          <Space>
            <Button type="primary" key="primary" onClick={() => onAdd({ userId: 0 })}>
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

export default Users;
