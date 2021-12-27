import React, { useState, useCallback } from 'react';
import ProTable from '@/components/ProTable';
import { deleteDept, updateDept, addDept, getDepts } from '@/api';
import { DeptParams, DeptResult } from '@/models/dept';
import { Button, Space, Modal, Tag, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import UpdateForm from './components/UpdateForm';

import modal from '@/utils/modal';

import arrayToTree from 'array-to-tree';
import { statusOptions } from '@/utils/options';
import useRequest from '@ahooksjs/use-request';

const defaultData = {
  data: [],
  totalCount: 0
};

const makeData = (data: DeptResult[]) => {
  if (!data) {
    return [];
  }
  return arrayToTree(data, { customID: 'deptId', parentProperty: 'parentId' });
};

const defaultValues = {
  status: 0,
  isFrame: 0,
  parentId: 0
};

const Depts = () => {
  const [params, setParams] = useState<DeptParams>({});
  const { data, loading } = useRequest<ApiResult<DeptResult[]>>(() => getDepts(params), { refreshDeps: [params] });

  const onAdd = useCallback(records => {
    let formRef = null;
    const mod = modal({
      title: '添加部门',
      width: 640,
      content: (
        <UpdateForm saveRef={r => (formRef = r)} initialValues={{ ...defaultValues, parentId: records.deptId }} />
      ),
      onOk
    });

    async function onOk() {
      const values = await formRef.validateFields();
      mod.confirmLoading();
      try {
        const res = await addDept(values);
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
      content: `是否确认删除名称为${data.deptName}的数据项？`,
      onOk
    });

    async function onOk() {
      try {
        const res = await deleteDept(data.deptId);
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
      title: '修改部门',
      width: 640,
      content: <UpdateForm saveRef={r => (formRef = r)} initialValues={records} />,
      onOk
    });

    async function onOk() {
      const values = await formRef.validateFields();
      mod.confirmLoading();
      try {
        const res = await updateDept({ ...values, deptId: records.deptId });
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

  const columns = React.useMemo(() => {
    return [
      { title: '部门名称', dataIndex: 'deptName', valueType: 'input' },
      { title: '排序', dataIndex: 'orderNum' },
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
        dataIndex: 'deptId',
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
  }, []);

  return (
    <>
      <ProTable
        headerTitle="部门列表"
        rowKey="deptId"
        columns={columns}
        loading={loading}
        dataSource={loading ? [] : makeData(data?.data)}
        search={{
          collapsed: false,
          onFinish: handleSearch
        }}
        toolBarRender={() => (
          <Space>
            <Button type="primary" key="primary" onClick={() => onAdd({ deptId: 0 })}>
              添加
            </Button>
            <Button icon={<ReloadOutlined />} onClick={() => handleSearch()}>
              刷新
            </Button>
          </Space>
        )}
      />
    </>
  );
};

export default Depts;
