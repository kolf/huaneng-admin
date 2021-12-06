import React from 'react';
import { Form, Input, Row, Col, Select, Radio, InputNumber } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 19 }
};
const layout2 = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
};

const menuTypeOptions: OptionProps<string>[] = [
  {
    value: '1',
    label: '目录'
  },
  {
    value: '2',
    label: '菜单'
  },
  {
    value: '3',
    label: '按钮'
  }
];

const isLinkOptions: OptionProps<string>[] = [
  {
    value: '1',
    label: '是'
  },
  {
    value: '0',
    label: '否'
  }
];

const statusOptions: OptionProps<string>[] = [
  {
    value: '0',
    label: '正常'
  },
  {
    value: '1',
    label: '停用'
  }
];

interface Props {
  saveRef: any;
  initialValues?: any;
}

const UpdateForm: React.FC<Props> = ({ saveRef, initialValues }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    saveRef(form);
  }, [form]);

  // const henadleSubmit = React.useCallback(
  //   values => {
  //     console.log(values);
  //   },
  //   [form]
  // );

  return (
    <Form form={form} name="control-hooks" initialValues={initialValues}>
      <Row>
        <Col span={24}>
          <Form.Item name="parentId" label="上级菜单" rules={[{ required: true }]} {...layout}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="menuType" label="菜单类型" rules={[{ required: true }]} {...layout}>
            <Radio.Group options={menuTypeOptions} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item name="icon" label="菜单图标" rules={[{ required: true }]} {...layout}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="menuName" label="菜单名称" rules={[{ required: true }]} {...layout2}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="orderNum" label="显示排序" rules={[{ required: true }]} {...layout2}>
            <InputNumber placeholder="0" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="isFrame" label="是否外链" rules={[{ required: true }]} {...layout2}>
            <Radio.Group options={isLinkOptions} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="path" label="路由地址" rules={[{ required: true }]} {...layout2}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="note" label="权限Code" rules={[{ required: true }]} {...layout2}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="note" label="菜单状态" rules={[{ required: true }]} {...layout2}>
            <Radio.Group options={statusOptions} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateForm;
