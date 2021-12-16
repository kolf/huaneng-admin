import React from 'react';
import { Form, Input, Row, Col, Select, TreeSelect, Radio, InputNumber } from 'antd';
import IconSelect from '@/components/IconSelect';
import Loading from '@/components/Loading';
import ProTreeSelect from '@/components/ProTreeSelect';
import { getMenus } from '@/api';
import arrayToTree from 'array-to-tree';
import { statusOptions } from '@/utils/options';
import useRequest from '@ahooksjs/use-request';
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

const makeData = data => {
  return [
    {
      value: 0,
      label: '根目录',
      children: arrayToTree(
        data.map(item => ({ parentId: item.parentId, value: item.menuId, label: item.menuName })),
        { parentProperty: 'parentId', customID: 'value' }
      )
    }
  ];
};

const UpdateForm: React.FC<Props> = ({ saveRef, initialValues }) => {
  const [form] = Form.useForm();
  const { data, loading } = useRequest(() => getMenus({}));
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
      <Form.Item name="parentId" label="上级菜单" rules={[{ required: true }]}>
        <ProTreeSelect dataSource={makeData(data?.data)} />
      </Form.Item>

      <Form.Item name="menuType" label="菜单类型" rules={[{ required: true }]}>
        <Radio.Group options={menuTypeOptions} />
      </Form.Item>

      {values.menuType !== 2 && (
        <Form.Item name="icon" label="菜单图标">
          <IconSelect />
        </Form.Item>
      )}

      <Form.Item name="menuName" label="菜单名称" rules={[{ required: true }]}>
        <Input placeholder="请输入菜单名称" />
      </Form.Item>

      <Form.Item name="orderNum" label="显示排序" rules={[{ required: true }]}>
        <InputNumber placeholder="0" />
      </Form.Item>

      {values.menuType === 1 && [
        <Form.Item name="isFrame" label="是否外链" rules={[{ required: true }]} key="isFrame">
          <Radio.Group options={isLinkOptions} />
        </Form.Item>,
        <Form.Item name="path" label="路由地址" rules={[{ required: true }]} key="path">
          <Input placeholder="请输入路由地址" />
        </Form.Item>
      ]}

      {values.menuType !== 0 && (
        <Form.Item name="perms" label="权限Code" rules={[{ required: true }]}>
          <Input placeholder="请输入权限Code" />
        </Form.Item>
      )}

      <Form.Item name="status" label="菜单状态" rules={[{ required: true }]}>
        <Radio.Group options={statusOptions} />
      </Form.Item>
    </Form>
  );
};

export default UpdateForm;
