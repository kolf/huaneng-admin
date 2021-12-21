import React from 'react';
import { Form, Input, Row, Col, Select, TreeSelect, Radio, InputNumber } from 'antd';
import Loading from '@/components/Loading';
import useRequest from '@ahooksjs/use-request';
import { getParam } from '@/api/param.api';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 }
};

interface Props {
  saveRef: any;
  id?: number;
}

const UpdateForm: React.FC<Props> = ({ saveRef, id }) => {
  const [form] = Form.useForm();
  const { data, loading, run } = useRequest(() => getParam({ configId: id }));

  React.useEffect(() => {
    saveRef(form);
  }, [form]);

  if (id && loading) {
    return <Loading />;
  }

  return (
    <Form form={form} name="control-hooks" initialValues={id && data?.data} {...layout}>
      <Form.Item name="configName" label="参数名称" rules={[{ required: true }]}>
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item name="configKey" label="参数键名" rules={[{ required: true }]}>
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item name="configValue" label="参数键值" rules={[{ required: true }]}>
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item name="remark" label="备注">
        <Input.TextArea placeholder="请输入" />
      </Form.Item>
    </Form>
  );
};

export default UpdateForm;
