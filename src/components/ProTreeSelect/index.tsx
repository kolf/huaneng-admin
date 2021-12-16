import React from 'react';
import { TreeSelect } from 'antd';
const { TreeNode } = TreeSelect;

interface Props {
  dataSource: any[];
}

const ProTreeSelect: React.FC<Props> = ({ dataSource,...restProps }) => {
  const renderTreeNodeList = React.useCallback(
    dataSource => {
      const loop = data => {
        return data
          .filter(item => item)
          .map(item => (
            <TreeNode key={item.value} value={item.value} title={item.label}>
              {item.children && loop(item.children)}
            </TreeNode>
          ));
      };
      return loop(dataSource);
    },
    [dataSource]
  );

  return <TreeSelect {...restProps}>{renderTreeNodeList(dataSource)}</TreeSelect>;
};

export default ProTreeSelect;
