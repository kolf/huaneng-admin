import React from 'react';
import { Form, Input, Row, Col, Select, TreeSelect, Radio, Checkbox } from 'antd';
import Loading from '@/components/Loading';
import CheckboxGroup from '@/components/CheckboxGroup';
import { getRoles, getUser, getUserRoles } from '@/api';
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
    value: item.roleId,
    label: item.roleName
  }));
};

const makeInitialValues = data => {
  return {
    roleIds: data.reduce((result, item) => {
      if (item.flag) {
        result.push(item.roleId);
      }
      return result;
    }, [])
  };
};

const UpdateForm: React.FC<Props> = ({ saveRef, id }) => {
  const [form] = Form.useForm();
  const { data, loading, error } = useRequest(async () => getUserRoles({ userId: id }));

  React.useEffect(() => {
    saveRef(form);
  }, [form]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return null;
  }

  console.log(makeInitialValues(data?.data), 'makeInitialValues(data?.data)');

  return (
    <Form form={form} name="control-hooks" {...layout} initialValues={makeInitialValues(data?.data)}>
      <Form.Item name="roleIds">
        <CheckboxGroup options={makeData(data?.data)} />
      </Form.Item>
    </Form>
  );
};

export default React.memo(UpdateForm);
