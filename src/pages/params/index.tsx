import React, { useState, useCallback } from 'react';
import ProTable from '@/components/ProTable';
import { deleteParam, updateParam, addParam, getParams } from '@/api/param.api';
import { ParamParams } from '@/models/param';
import { Button, Space, Modal, Tag, message } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import UpdateForm from './components/UpdateForm';

import modal from '@/utils/modal';
import useRequest from '@ahooksjs/use-request';

const makeData = data => {
  if (!data) {
    return [];
  }
  return data;
};

const Params = () => {
  const [params, setParams] = useState<ParamParams>({ pageSize: 10 });
  const { data, error, loading } = useRequest(() => getParams(params), {
    refreshDeps: [params],
    formatResult: res => res.data
  });

  const onAdd = useCallback(records => {
    let formRef = null;
    const mod = modal({
      title: '添加参数',
      width: 540,
      content: <UpdateForm saveRef={r => (formRef = r)} />,
      onOk
    });

    async function onOk() {
      const values = await formRef.validateFields();
      mod.confirmLoading();
      try {
        const res = await addParam(values);
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
      content: `是否确认删除名称为${data.configName}的数据项？`,
      onOk
    });

    async function onOk() {
      try {
        const res = await deleteParam(data.configId);
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
      title: '修改参数',
      width: 540,
      content: <UpdateForm saveRef={r => (formRef = r)} id={records.configId} />,
      onOk
    });

    async function onOk() {
      const values = await formRef.validateFields();
      mod.confirmLoading();
      try {
        const res = await updateParam({ ...values, configId: records.configId });
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
      { title: '参数名称', dataIndex: 'configName', valueType: 'input' },
      { title: '参数键名', dataIndex: 'configKey', valueType: 'input' },
      { title: '参数键值', dataIndex: 'configValue' },
      { title: '备注', dataIndex: 'remark' },
      { title: '创建时间', dataIndex: 'createTime', valueType: 'dateRange' },
      {
        title: '操作',
        dataIndex: 'configId',
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
  }, []);

  return (
    <>
      <ProTable
        headerTitle="参数列表"
        rowKey="configId"
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
            <Button type="primary" onClick={() => onAdd({ configId: 0 })}>
              添加
            </Button>
            <Button icon={<ReloadOutlined />} onClick={() => handleSearch({})}>
              刷新
            </Button>
          </Space>
        )}
      />
    </>
  );
};

export default Params;
