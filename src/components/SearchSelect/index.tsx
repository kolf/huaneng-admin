import React from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';

type Props = {} & SelectProps<any>;

const filterOption = (input, option) => {
  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const SearchSelect: React.FC<Props> = ({ options, ...restProps }) => {
  return <Select showSearch allowClear options={options} filterOption={filterOption} {...restProps} />;
};

export default SearchSelect;
