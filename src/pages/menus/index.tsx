import React, { useState, useCallback } from 'react';
import ProTable from '@/components/ProTable';
import { useGetMenus, deleteMenu } from '@/api';
import { MenuParams } from '@/models/menu';
import { Button, Space, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import UpdateForm from './components/UpdateForm';
import modal from '@/utils/modal';
import arrayToTree from '@/utils/arrayToTree';

const makeData = data => {
  if (!data) {
    return [];
  }
  return arrayToTree(data, { id: 'menuId', parentId: 'parentId' });
};

const Menus = () => {
  const [params, setParams] = useState<MenuParams>({});
  const { data, error, loading, refresh } = useGetMenus(params);

  const onAdd = useCallback(records => {
    let formRef = null;
    const mod = modal({
      title: '添加菜单',
      width: 640,
      content: <UpdateForm saveRef={r => (formRef = r)} />,
      onOk
    });

    async function onOk() {
      const values = await formRef.validateFields();
      console.log(formRef, 'form');
    }
  }, []);

  const onDelete = useCallback(data => {
    Modal.confirm({
      title: '系统提示',
      content: `是否确认删除名称为${data.menuName}的数据项？`,
      onOk
    });

    async function onOk() {
      const res = await deleteMenu(data.menuId);
      if (res.code !== 200) {
        message.error(res.message);
        return;
      }
      refresh();
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
      console.log(formRef, 'form');
    }
  }, []);

  const handleSearch = values => {
    console.log(values, 'value');
    setParams({ ...params, ...values });
  };

  const columns = [
    { title: '菜单名称', dataIndex: 'menuName', valueType: 'input', width: 200 },
    { title: '图标', dataIndex: 'icon' },
    { title: '排序', dataIndex: 'orderNum' },
    { title: '权限标识', dataIndex: 'perms' },
    { title: '路径', dataIndex: 'path' },
    { title: '状态', dataIndex: 'status', valueType: 'input' },
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
        isTree
      />
    </>
  );
};

export default Menus;
