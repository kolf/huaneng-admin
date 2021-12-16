import React from 'react';
import { Form, Input, Row, Col, Select, TreeSelect, Radio, InputNumber } from 'antd';
import Loading from '@/components/Loading';
import { getDepts } from '@/api';
import ProTreeSelect from '@/components/ProTreeSelect';
import useRequest from '@ahooksjs/use-request';
import arrayToTree from 'array-to-tree';
import { statusOptions } from '@/utils/options';
const { TreeNode } = TreeSelect;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 }
};

interface Props {
  saveRef: any;
  initialValues?: any;
}

const makeData = data => {
  return [
    {
      value: 0,
      label: '集团总部',
      children: arrayToTree(
        data.map(item => ({ parentId: item.parentId, value: item.deptId, label: item.deptName })),
        { parentProperty: 'parentId', customID: 'value' }
      )
    }
  ];
};

const UpdateForm: React.FC<Props> = ({ saveRef, initialValues }) => {
  const [form] = Form.useForm();
  const { data, error, loading } = useRequest(() => getDepts({}));
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
      <Form.Item name="parentId" label="上级部门" rules={[{ required: true }]}>
        <ProTreeSelect dataSource={makeData(data?.data)} />
      </Form.Item>

      <Form.Item name="deptName" label="部门名称" rules={[{ required: true }]}>
        <Input placeholder="请输入" />
      </Form.Item>

      <Form.Item name="orderNum" label="显示排序" rules={[{ required: true }]}>
        <InputNumber placeholder="0" />
      </Form.Item>
      <Form.Item name="leader" label="负责人" rules={[{ required: true }]}>
        <Input placeholder="请输入" />
      </Form.Item>

      <Form.Item name="phone" label="联系电话" rules={[{ required: true }]}>
        <Input placeholder="请输入" />
      </Form.Item>

      <Form.Item name="email" label="邮箱" rules={[{ required: true }]}>
        <Input placeholder="请输入" />
      </Form.Item>

      <Form.Item name="status" label="部门状态" rules={[{ required: true }]}>
        <Radio.Group options={statusOptions} />
      </Form.Item>
    </Form>
  );
};

export default UpdateForm;
