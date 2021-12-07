import React from 'react';
import { Form, Input, Row, Col, Select, TreeSelect, Radio, InputNumber } from 'antd';
import IconSelect from '@/components/IconSelect';
import Loading from '@/components/Loading';
import { useGetMenus } from '@/api';
import arrayToTree from '@/utils/arrayToTree';
import { statusOptions, sexOptions } from '@/utils/options';
const { TreeNode } = TreeSelect;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 }
};

const menuTypeOptions: OptionProps<number>[] = [
  {
    value: 0,
    label: '目录'
  },
  {
    value: 1,
    label: '菜单'
  },
  {
    value: 2,
    label: '按钮'
  }
];

const isLinkOptions: OptionProps<number>[] = [
  {
    value: 1,
    label: '是'
  },
  {
    value: 0,
    label: '否'
  }
];

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
      <Form.Item name="nickName" label="用户昵称" rules={[{ required: true }]}>
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item name="deptId" label="归属部门" rules={[{ required: true }]}>
        <Input placeholder="请输入" />
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
      <Form.Item name="password" label="用户密码" rules={[{ required: true }]}>
        <Input.Password placeholder="请输入" />
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

export default UpdateForm;
