import React, { useState, useCallback } from 'react';
import ProTable from '@/components/ProTable';
import { useGetRoles, deleteRole, updateRole, addRole } from '@/api';
import { RoleParams } from '@/models/role';
import { Button, Space, Modal, Tag, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, AuditOutlined, ReloadOutlined } from '@ant-design/icons';
import UpdateForm from './components/UpdateForm';
import { statusOptions } from '@/utils/options';

import modal from '@/utils/modal';

const makeData = data => {
  if (!data) {
    return [];
  }
  return data;
};

const defaultValues = {
  menuType: 0,
  status: 0,
  isFrame: 0
};

const Roles = () => {
  const [params, setParams] = useState<RoleParams>({});
  const { data, error, loading } = useGetRoles(params);

  const onAdd = useCallback(records => {
    let formRef = null;
    const mod = modal({
      title: '添加角色',
      width: 640,
      content: (
        <UpdateForm saveRef={r => (formRef = r)} initialValues={{ ...defaultValues, parentId: records.roleId }} />
      ),
      onOk
    });

    async function onOk() {
      const values = await formRef.validateFields();
      mod.confirmLoading();
      try {
        const res = await addRole(values);
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
      content: `是否确认删除名称为${data.roleName}的数据项？`,
      onOk
    });

    async function onOk() {
      try {
        const res = await deleteRole(data.roleId);
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
      title: '修改角色',
      width: 640,
      content: <UpdateForm saveRef={r => (formRef = r)} initialValues={records} />,
      onOk
    });

    async function onOk() {
      const values = await formRef.validateFields();
      mod.confirmLoading();
      try {
        const res = await updateRole({ ...values, roleId: records.roleId });
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

  const handleSearch = values => {
    setParams({ ...params, ...values });
  };

  const columns = [
    { title: '角色名称', dataIndex: 'roleName', valueType: 'input' },
    { title: '备注', dataIndex: 'remark' },
    { title: '状态', dataIndex: 'status', valueType: 'searchSelect', options: statusOptions },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateRange' },
    {
      title: '操作',
      dataIndex: 'roleId',
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
          </Space>
        );
      }
    }
  ];

  return (
    <>
      <ProTable
        headerTitle="角色列表"
        rowKey="roleId"
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
            <Button type="primary" key="primary" onClick={() => onAdd({ roleId: 0 })}>
              添加
            </Button>
            <Button icon={<ReloadOutlined />} onClick={() => handleSearch({})}>
              刷新
            </Button>
          </Space>
        ]}
      />
    </>
  );
};

export default Roles;
