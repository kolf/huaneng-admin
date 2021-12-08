import React from 'react';
import { Form, Input, Row, Col, Select, TreeSelect, Radio, InputNumber } from 'antd';
import { statusOptions } from '@/utils/options';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 }
};

interface Props {
  saveRef: any;
  initialValues?: any;
}

const UpdateForm: React.FC<Props> = ({ saveRef, initialValues }) => {
  const [form] = Form.useForm();

  const [values, setValues] = React.useState(initialValues);

  React.useEffect(() => {
    saveRef(form);
  }, [form]);

  return (
    <Form
      form={form}
      name="control-hooks"
      initialValues={initialValues}
      {...layout}
      onValuesChange={newValue => setValues({ ...values, ...newValue })}
    >
      <Form.Item name="roleName" label="角色名称" rules={[{ required: true }]}>
        <Input placeholder="请输入" />
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
