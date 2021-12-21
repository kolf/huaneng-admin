import React from 'react';
import { Form, Input, Row, Col, Select, TreeSelect, Radio, InputNumber } from 'antd';
import Loading from '@/components/Loading';
import useRequest from '@ahooksjs/use-request';
import { getDict } from '@/api/dict.api';
import { statusOptions } from '@/utils/options';

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
  const { data, loading, run } = useRequest(() => getDict({ dictCode: id }));

  React.useEffect(() => {
    saveRef(form);
  }, [form]);

  if (id && loading) {
    return <Loading />;
  }

  return (
    <Form form={form} initialValues={id && data?.data} {...layout}>
      <Form.Item name="dictLabel" label="字典标签" rules={[{ required: true }]}>
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item name="dictValue" label="字典键值" rules={[{ required: true }]}>
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item name="dictType" label="字典类型" rules={[{ required: true }]}>
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item name="dictSort" label="排序" rules={[{ required: true }]}>
        <InputNumber min={0} placeholder="请输入" />
      </Form.Item>
      <Form.Item name="status" label="状态" rules={[{ required: true }]}>
        <Radio.Group options={statusOptions} />
      </Form.Item>
      <Form.Item name="remark" label="备注">
        <Input.TextArea placeholder="请输入" />
      </Form.Item>
    </Form>
  );
};

export default UpdateForm;
