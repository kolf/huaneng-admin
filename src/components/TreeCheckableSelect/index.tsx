import React from 'react';
import { TreeSelect } from 'antd';
import ProTreeSelect from '@/components/ProTreeSelect';
// import arrayToTree from '@/utils/arrayToTree';
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
  // const [value, setValue] = React.useState(propsValue);
  // console.log(propsValue, value, 'propsValue');
  const handleChange = (selectValue, selectLabel, { triggerValue, checked }) => {
    console.log(selectValue, selectLabel, triggerValue, checked);
    // const propsValue =
    let nextValue = [];
    if (checked) {
      const parentsValue = getAllParent(dataSource, triggerValue);
      nextValue = [...new Set([...propsValue, ...parentsValue, triggerValue])];
    } else {
      const childrenValue = getAllChild(dataSource, triggerValue);

      console.log(childrenValue, 'childrenValue');
      nextValue = propsValue.filter(pv => !childrenValue.includes(pv) && pv !== triggerValue);
    }
    // setValue(nextValue);
    // console.log(nextValue, 'nextValue');
    onChange(nextValue);
  };

  const labelValue = React.useMemo(() => {
    return propsValue.map(v => {
      const item = dataSource.find(d => d.value === v);
      return {
        value: item.value,
        label: item.label
      };
    });
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
