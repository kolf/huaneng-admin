import React from 'react';
import { Form, Input, Row, Col, Select, TreeSelect, Radio, InputNumber } from 'antd';
import Loading from '@/components/Loading';
import { useGetMenus } from '@/api';
import arrayToTree from '@/utils/arrayToTree';
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

const renderTreeNodeList = dataSource => {
  const loop = data => {
    return data
      .filter(item => item)
      .map(item => (
        <TreeNode key={item.menuId} value={item.menuId} title={item.menuName}>
          {item.children && loop(item.children)}
        </TreeNode>
      ));
  };
  return loop(dataSource);
};

const UpdateForm: React.FC<Props> = ({ saveRef, initialValues }) => {
  const [form] = Form.useForm();
  const { data, loading } = useGetMenus();
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
        <TreeSelect>
          <TreeNode key={0} value={0} title="根目录">
            {data?.data && renderTreeNodeList(arrayToTree(data.data, { parentId: 'parentId', id: 'menuId' }))}
          </TreeNode>
        </TreeSelect>
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
