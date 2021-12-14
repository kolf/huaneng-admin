import React from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import IconFont from '@/components/IconFont';
import dataSource from './dataSource.json';
import './index.modules.less';

const { Option } = Select;

const iconList: OptionProps<string>[] = dataSource.glyphs.map(item => ({ value: item.font_class, label: item.name }));

const IconSelect: React.FC<SelectProps<any>> = props => {
  return (
    <Select virtual={false} {...props} dropdownClassName="icon-select" showSearch placeholder="请输入菜单名称">
      {iconList.map(option => (
        <Option key={option.value} value={option.value} title={option.label}>
          <IconFont type={`icon-${option.value}`} />
        </Option>
      ))}
    </Select>
  );
};

export default IconSelect;
