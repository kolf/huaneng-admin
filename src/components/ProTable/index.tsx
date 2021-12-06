import React, { useState, useCallback, useMemo } from 'react';
import { Table, Form, Row, Col, Input, Button, Card } from 'antd';
import { TableColumnProps, FormItemProps } from 'antd';
import type { ColumnGroupType } from 'antd/lib/table/interface';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styles from './index.module.less';

type ValueType = 'input' | 'select';

type FieldProps = {
  valueType?: ValueType;
  formItemProps?: FormItemProps;
  transform?: (value: any) => void;
};

type SearchProps = {
  collapsed: boolean;
  onFinish: (values: any) => void;
};

export type ColumnsProps = ColumnGroupType<FieldProps>;

interface ProTableProps {
  isTree?: boolean;
  initialValues?: any;
  rowKey?: string;
  columns: ColumnsProps[];
  headerTitle: string;
  loading: boolean;
  dataSource: any[];
  search: SearchProps;
  toolBarRender?: () => React.ReactElement;
}

const ProTable: React.FC<ProTableProps> = ({
  headerTitle,
  columns,
  initialValues,
  loading,
  dataSource,
  search,
  toolBarRender,
  rowKey = 'id'
}) => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();
  const fields = useMemo(() => columns?.filter(col => col.valueType), [columns]);

  const getFields = useCallback(() => {
    const count = expand ? fields.length : 5;
    return fields
      .filter((f, index) => index < count)
      .map(col => (
        <Col span={8} key={col.dataIndex}>
          <Form.Item name={col.dataIndex} label={col.title} {...col.formItemProps}>
            <Input placeholder="请输入" />
          </Form.Item>
        </Col>
      ));
  }, [columns, expand]);

  const onFinish = (values: any) => {
    const propsValues = fields.reduce((result, field: ColumnsProps) => {
      const value = values[field.dataIndex];
      const nextValue = field.transform ? field.transform(value) : value;
      result[field.dataIndex] = nextValue;
      return result;
    }, {});
    search.onFinish(propsValues);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changedRows) => {
      console.log(selected, selectedRows, changedRows);
    }
  };

  // console.log(dataSource, 'dataSource');

  return (
    <>
      <div className={styles.form}>
        <Form form={form} onFinish={onFinish} initialValues={initialValues}>
          <Row gutter={24}>
            {getFields()}
            <Col span={8} style={{ textAlign: 'right', paddingRight: 4 }}>
              <div style={{ marginBottom: 24 }}>
                {search.collapsed && (
                  <>
                    <a
                      style={{ fontSize: 12 }}
                      onClick={() => {
                        setExpand(!expand);
                      }}
                    >
                      {expand ? (
                        <>
                          <UpOutlined />
                          <span className={styles.expandBtn}>收缩</span>
                        </>
                      ) : (
                        <>
                          <DownOutlined />
                          <span className={styles.expandBtn}>展开</span>
                        </>
                      )}
                    </a>
                  </>
                )}
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button
                  style={{ margin: '0 8px' }}
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  重置
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>

      <Card title={headerTitle} bordered={false} extra={toolBarRender && toolBarRender()}>
        <Table rowKey={rowKey} columns={columns} loading={loading} dataSource={dataSource} />
      </Card>
    </>
  );
};

export default React.memo(ProTable);
