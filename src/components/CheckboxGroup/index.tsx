import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxGroupProps } from 'antd/lib/checkbox';

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, ...restProps }) => {
  return (
    <Checkbox.Group style={{ width: '100%' }} {...restProps}>
      {options.map(option => (
        <div key={option.value}>
          <Checkbox value={option.value}>{option.label}</Checkbox>
        </div>
      ))}
    </Checkbox.Group>
  );
};

export default CheckboxGroup;
