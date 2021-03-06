import React from 'react';
import { Form, Input, Row, Col, Select, TreeSelect, Radio, InputNumber } from 'antd';
import Loading from '@/components/Loading';
import ProTreeSelect from '@/components/ProTreeSelect';
import { getDepts } from '@/api';
import { statusOptions, sexOptions } from '@/utils/options';
import arrayToTree from 'array-to-tree';
import useRequest from '@ahooksjs/use-request';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 }
};
interface Props {
  saveRef: any;
  initialValues?: any;
}

const makeData = data => {
  return arrayToTree(
    data.map(item => ({ parentId: item.parentId, value: item.deptId, label: item.deptName })),
    { parentProperty: 'parentId', customID: 'value' }
  );
};

const UpdateForm: React.FC<Props> = ({ saveRef, initialValues }) => {
  const [form] = Form.useForm();
  const { data, loading } = useRequest(() => getDepts({}));
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
      <Form.Item name="nickName" label="用户昵称" rules={[{ required: true }]}>
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item name="deptId" label="归属部门" rules={[{ required: true }]}>
        <ProTreeSelect placeholder="请选择" dataSource={makeData(data?.data)} />
      </Form.Item>
      <Form.Item name="phone" label="手机号码" rules={[{ required: true }]}>
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item name="email" label="邮箱">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item name="userName" label="用户名称" rules={[{ required: true }]}>
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item name="sex" label="用户性别" rules={[{ required: true }]}>
        <Radio.Group options={sexOptions} />
      </Form.Item>
      {/* <Form.Item name="menuName" label="角色" rules={[{ required: true }]}>
        <Input placeholder="请输入" />
      </Form.Item> */}
      <Form.Item name="status" label="状态" rules={[{ required: true }]}>
        <Radio.Group options={statusOptions} />
      </Form.Item>
      <Form.Item name="remark" label="备注">
        <Input placeholder="请输入" />
      </Form.Item>
    </Form>
  );
};

export default React.memo(UpdateForm);
