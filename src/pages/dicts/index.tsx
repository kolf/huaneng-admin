import React, { useState, useCallback } from 'react';
import ProTable from '@/components/ProTable';
import { deleteDict, updateDict, addDict, getDicts } from '@/api/dict.api';
import { DictParams } from '@/models/dict';
import { Button, Space, Modal, Tag, message } from 'antd';
import { EditOutlined, DeleteOutlined, AuditOutlined, ReloadOutlined } from '@ant-design/icons';
import UpdateForm from './components/UpdateForm';
import UpdateUsers from './components/UpdateUsers';
import { statusOptions } from '@/utils/options';

import modal from '@/utils/modal';
import useRequest from '@ahooksjs/use-request';

const makeData = data => {
  if (!data) {
    return [];
  }
  return data;
};

const Dicts = () => {
  const [params, setParams] = useState<DictParams>({ pageSize: 10 });
  const { data, error, loading } = useRequest(() => getDicts(params), {
    refreshDeps: [params],
    formatResult: res => res.data
  });

  const onAdd = useCallback(records => {
    let formRef = null;
    const mod = modal({
      title: '添加字典',
      width: 540,
      content: <UpdateForm saveRef={r => (formRef = r)} />,
      onOk
    });

    async function onOk() {
      const values = await formRef.validateFields();
      mod.confirmLoading();
      try {
        const res = await addDict(values);
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
      content: `是否确认删除名称为${data.dictLabel}的数据项？`,
      onOk
    });

    async function onOk() {
      try {
        const res = await deleteDict(data.dictCode);
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
      title: '修改字典',
      width: 540,
      content: <UpdateForm saveRef={r => (formRef = r)} id={records.dictCode} />,
      onOk
    });

    async function onOk() {
      const values = await formRef.validateFields();
      mod.confirmLoading();
      try {
        const res = await updateDict({ ...values, dictCode: records.dictCode });
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
    { title: '字典键值', dataIndex: 'dictValue', valueType: 'input' },
    { title: '字典标签', dataIndex: 'dictLabel', valueType: 'input' },
    { title: '排序', dataIndex: 'dictSort' },

    { title: '字典类型', dataIndex: 'dictType' },
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
    { title: '备注', dataIndex: 'remark' },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateRange' },
    {
      title: '操作',
      dataIndex: 'dictCode',
      width: 190,
      render(text, records) {
        return (
          <Space>
            <a key="update" onClick={onUpdate.bind(this, records)}>
              <EditOutlined />
              修改
            </a>
            <a key="delete" onClick={onDelete.bind(this, records)}>
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
        headerTitle="字典列表"
        rowKey="dictCode"
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
        toolBarRender={() => (
          <Space>
            <Button key="add" type="primary" key="primary" onClick={() => onAdd({ dictCode: 0 })}>
              添加
            </Button>
            <Button key="reload" icon={<ReloadOutlined />} onClick={() => handleSearch({})}>
              刷新
            </Button>
          </Space>
        )}
      />
    </>
  );
};

export default Dicts;
