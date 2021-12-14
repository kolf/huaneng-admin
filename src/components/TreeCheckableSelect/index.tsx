import React from 'react';
import { TreeSelect } from 'antd';
import ProTreeSelect from '@/components/ProTreeSelect';
import arrayToTree from '@/utils/arrayToTree';
const { SHOW_ALL } = TreeSelect;

interface Props<T> {
  dataSource: any[];
  value: T[];
  onChange: (value: T[]) => void;
}

const makeData = data => {
  return arrayToTree(data, { parentId: 'parentId', id: 'value' });
};

const getAllChild = <T extends number>(data, id: T): T[] => {
  let result: T[] = [];
  function loop(id) {
    data.forEach(item => {
      if (item.parentId === id) {
        result.push(item.id);
        loop(item.id);
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
  // console.log(propsValue, dataSource, 'propsValue');                                    
  const handleChange = (selectValue, selectLabel, { triggerValue, checked }) => {
    // const propsValue =
    let nextValue = [];
    if (checked) {
      const parentValue = getAllParent(dataSource, triggerValue);
      nextValue = [...new Set([...propsValue, ...parentValue, triggerValue])];
      console.log(parentValue,nextValue, 'value');
    }
    console.log(nextValue,'nextValue')
    // onChange(nextValue);
  };
  return (
    <ProTreeSelect
      dataSource={makeData(dataSource)}
      placeholder="请输入"
      treeCheckable
      showCheckedStrategy={SHOW_ALL}
      onChange={handleChange}
      {...restProps}
    />
  );
};

export default TreeCheckableSelect;
