import React from 'react';
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Loading from '@/components/Loading';
import useRequest from '@ahooksjs/use-request';
import arrayToTree from 'array-to-tree';
import { getDepts } from '@/api';
interface Props {
  onChange?: (value: number) => void;
}

const makeData = data => {
  if (!data) {
    return [];
  }
  return arrayToTree(
    data.map(item => ({
      key: item.deptId,
      title: item.deptName,
      parentId: item.parentId
    })),
    { customID: 'key', parentProperty: 'parentId' }
  );
};

const DeptTree: React.FC<Props> = ({ onChange }) => {
  const { data, loading } = useRequest(() => getDepts({}));

  const handleSelect = value => {
    onChange && onChange(value[0]);
    console.log(value);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <Tree
      defaultExpandAll
      showLine
      defaultExpandedKeys={['0-0-0']}
      onSelect={handleSelect}
      treeData={makeData(data?.data)}
    />
  );
};

export default DeptTree;
