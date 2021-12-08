import React from 'react';
import Loading from '@/components/Loading';
import CheckboxGroup from '@/components/CheckboxGroup';
import { useGetRoles } from '@/api';

type Props = typeof CheckboxGroup;

const makeData = (data: any[]) => {
  return data.map(item => ({
    value: item.roleId,
    label: item.roleName
  }));
};

const UpdateRoles: React.FC<Props> = () => {
  const { data, loading } = useGetRoles({ pageSize: 10000 });

  if (loading) {
    return <Loading />;
  }

  return <CheckboxGroup options={makeData(data?.list)} />;
};

export default React.memo(UpdateRoles);
