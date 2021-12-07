import React, { useState, useCallback } from 'react';
import ProTable from '@/components/ProTable';
import { useGetMenus, deleteMenu, updateMenu, addMenu } from '@/api';
import { MenuParams } from '@/models/menu';
import { Button, Space, Modal, Tag, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, AuditOutlined, ReloadOutlined } from '@ant-design/icons';
import IconFont from '@/components/IconFont';
import UpdateForm from './components/UpdateForm';

import modal from '@/utils/modal';
import arrayToTree from '@/utils/arrayToTree';

import { statusOptions } from '@/utils/options';

const makeData = data => {
  if (!data) {
    return [];
  }
  return arrayToTree(data, { id: 'menuId', parentId: 'parentId' });
};

const defaultValues = {
  menuType: 0,
  status: 0,
  isFrame: 0,
  parentId: 0
};

const Menus = () => {
  const [params, setParams] = useState<MenuParams>({});
  const { data, error, loading } = useGetMenus(params);

  const onAdd = useCallback(records => {
    let formRef = null;
    const mod = modal({
      title: '添加菜单',
      width: 640,
      content: (
        <UpdateForm saveRef={r => (formRef = r)} initialValues={{ ...defaultValues, parentId: records.menuId }} />
      ),
      onOk
    });

    async function onOk() {
      const values = await formRef.validateFields();
      mod.confirmLoading();
      try {
        const res = await addMenu(values);
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
      content: `是否确认删除名称为${data.menuName}的数据项？`,
      onOk
    });

    async function onOk() {
      try {
        const res = await deleteMenu(data.menuId);
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
      title: '修改菜单',
      width: 640,
      content: <UpdateForm saveRef={r => (formRef = r)} initialValues={records} />,
      onOk
    });

    async function onOk() {
      const values = await formRef.validateFields();
      mod.confirmLoading();
      try {
        const res = await updateMenu({ ...values, menuId: records.menuId });
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
    { title: '菜单名称', dataIndex: 'menuName', valueType: 'input', width: 200 },
    {
      title: '图标',
      dataIndex: 'icon',
      render(text) {
        return text ? <IconFont type={`icon-${text}`} /> : '';
      }
    },
    { title: '排序', dataIndex: 'orderNum' },
    { title: '权限标识', dataIndex: 'perms' },
    { title: '路径', dataIndex: 'path' },
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
    { title: '创建时间', dataIndex: 'createTime' },
    {
      title: '操作',
      dataIndex: 'menuId',
      width: 160,
      render(text, records) {
        return (
          <Space>
            <a onClick={e => onUpdate(records)}>
              <EditOutlined />
              修改
            </a>
            <a onClick={e => onAdd(records)}>
              <PlusOutlined />
              新增
            </a>
            <a onClick={e => onDelete(records)}>
              <DeleteOutlined />
              删除
            </a>
          </Space>
        );
      }
    }
  ];

  console.log(data, 'data');

  return (
    <>
      <ProTable
        headerTitle="菜单列表"
        rowKey="menuId"
        columns={columns}
        loading={loading}
        dataSource={makeData(data?.data)}
        search={{
          collapsed: false,
          onFinish: handleSearch
        }}
        toolBarRender={() => [
          <Space>
            <Button type="primary" key="primary" onClick={() => onAdd({ menuId: 0 })}>
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
