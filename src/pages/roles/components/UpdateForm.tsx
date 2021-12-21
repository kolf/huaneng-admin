import React from 'react';
import { Form, Input, Row, Col, Select, TreeSelect, Radio, InputNumber } from 'antd';
import TreeCheckableSelect from '@/components/TreeCheckableSelect';
import Loading from '@/components/Loading';
import useRequest from '@ahooksjs/use-request';
import { statusOptions } from '@/utils/options';
import { getMenus, getRole } from '@/api';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 }
};

interface Props {
  saveRef: any;
  id?: number;
}

const makeData = data => {
  if (!data) {
    return [];
  }
  return data.map(item => ({ parentId: item.parentId, value: item.menuId, label: item.menuName }));
};

const UpdateForm: React.FC<Props> = ({ saveRef, id }) => {
  const [form] = Form.useForm();
  const { data: menuData } = useRequest(() => getMenus({}));
  const { data, loading, run } = useRequest(() => getRole({ roleId: id }), { ready: menuData, manual: true });
  const [values, setValues] = React.useState(data?.data);

  React.useEffect(() => {
    saveRef(form);
    if (id) {
      run();
    }
  }, [form, id]);

  if (id && loading) {
    return <Loading />;
  }

  return (
    <Form
      form={form}
      name="control-hooks"
      initialValues={id && data?.data}
      {...layout}
      onValuesChange={newValue => setValues({ ...values, ...newValue })}
    >
      <Form.Item name="roleName" label="角色名称" rules={[{ required: true }]}>
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item name="menuIds" label="菜单权限" rules={[{ required: true }]}>
        <TreeCheckableSelect dataSource={[...makeData(menuData?.data)]} />
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
