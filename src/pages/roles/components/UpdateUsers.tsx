import React from 'react';
import { Form, Input, Row, Col, Select, TreeSelect, Radio, Checkbox } from 'antd';
import Loading from '@/components/Loading';
import CheckboxGroup from '@/components/CheckboxGroup';
import { getUsers as getAllUsers, getRoleUsers } from '@/api';
import useRequest from '@ahooksjs/use-request';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 }
};
interface Props {
  saveRef: any;
  id: number;
}

const makeData = data => {
  if (!data) {
    return [];
  }

  return data.map(item => ({
    value: item.userId,
    label: item.userName
  }));
};

let initialValues = null;

const UpdateForm: React.FC<Props> = ({ saveRef, id }) => {
  const [form] = Form.useForm();
  const { data, loading, error } = useRequest(async () => {
    const res1 = await getRoleUsers({ roleId: id });
    const res2 = await getAllUsers({ pageSize: 10000 });
    initialValues = res1.data.list
      ? {
          userIds: res1.data.list.map(item => item.userId)
        }
      : {};
    return res2.data;
  });

  React.useEffect(() => {
    saveRef(form);
  }, [form]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return null;
  }

  // console.log(initialValues,'initialValues')

  return (
    <Form form={form} name="control-hooks" {...layout} initialValues={initialValues}>
      <Form.Item name="userIds">
        <CheckboxGroup options={makeData(data?.list)} />
      </Form.Item>
    </Form>
  );
};

export default React.memo(UpdateForm);
