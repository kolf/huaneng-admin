import React from 'react';
import { TreeSelect } from 'antd';
import ProTreeSelect from '@/components/ProTreeSelect';
import arrayToTree from 'array-to-tree';
const { SHOW_ALL } = TreeSelect;

interface Props<T> {
  dataSource: any[];
  value: T[];
  onChange: (value: T[]) => void;
}

const makeData = data => {
  return arrayToTree(data, { parentProperty: 'parentId', customID: 'value' });
};

const getAllChild = <T extends number>(data, id: T): T[] => {
  let result: T[] = [];
  function loop(id) {
    data.forEach(item => {
      if (item.parentId === id) {
        result.push(item.value);
        loop(item.value);
      }
    });
  }
  loop(id);
  return result;
};

const getAllParent = <T extends number>(data, id: T): T[] => {
  let result: T[] = [];
  function loop(id) {
    const item = data.find(item => item.value === id);
    if (item && item.parentId !== 0) {
      result.push(item.parentId);
      loop(item.parentId);
    }
  }
  loop(id);
  return result;
};

const TreeCheckableSelect: React.FC<Props<number>> = ({
  dataSource,
  onChange,
  value: propsValue = [],
  ...restProps
}) => {
  const handleChange = (selectValue, selectLabel, { triggerValue, checked }) => {
    let nextValue = [];
    if (checked) {
      const parentsValue = getAllParent(dataSource, triggerValue);
      nextValue = [...new Set([...propsValue, ...parentsValue, triggerValue])];
    } else {
      const childrenValue = getAllChild(dataSource, triggerValue);
      nextValue = propsValue.filter(pv => !childrenValue.includes(pv) && pv !== triggerValue);
    }
    onChange(nextValue);
  };

  const labelValue = React.useMemo(() => {
    return propsValue.reduce((result, id) => {
      const item = dataSource.find(d => d.value === id);
      if (item) {
        result.push({
          value: item.value,
          label: item.label
        });
      }
      return result;
    }, []);
  }, [propsValue]);

  return (
    <ProTreeSelect
      dataSource={makeData(dataSource)}
      placeholder="请输入"
      treeCheckable
      treeCheckStrictly
      showCheckedStrategy={SHOW_ALL}
      {...restProps}
      onChange={handleChange}
      value={labelValue}
    />
  );
};

export default TreeCheckableSelect;
