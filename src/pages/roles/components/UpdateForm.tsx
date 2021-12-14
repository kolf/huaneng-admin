import React from 'react';
import { Form, Input, Row, Col, Select, TreeSelect, Radio, InputNumber } from 'antd';
import TreeCheckableSelect from '@/components/TreeCheckableSelect';
import Loading from '@/components/Loading';
import useRequest from '@ahooksjs/use-request';
import { statusOptions } from '@/utils/options';
import arrayToTree from '@/utils/arrayToTree';
import { getMenus } from '@/api';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 }
};

interface Props {
  saveRef: any;
  initialValues?: any;
}

const makeData = data => {
  return data.map(item => ({ parentId: item.parentId, value: item.menuId, label: item.menuName }));
};

const UpdateForm: React.FC<Props> = ({ saveRef, initialValues }) => {
  const [form] = Form.useForm();
  const { data, error, loading } = useRequest(() => getMenus({}));
  const [values, setValues] = React.useState(initialValues);

  React.useEffect(() => {
    saveRef(form);
  }, [form]);

  if (loading) {
    return <Loading />;
  }

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
      <Form.Item name="a133" label="菜单权限" rules={[{ required: true }]}>
        <TreeCheckableSelect dataSource={[...makeData(data?.data)]} />
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
