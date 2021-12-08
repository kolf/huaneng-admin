import React, { useState, useCallback, useMemo } from 'react';
import { Table, Form, Row, Col, Input, Button, Card, DatePicker, Pagination } from 'antd';
import type { TableColumnProps, FormItemProps } from 'antd';
import SearchSelect from '@/components/SearchSelect';
import type { ColumnGroupType } from 'antd/lib/table/interface';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styles from './index.module.less';

const { RangePicker } = DatePicker;

type ValueType = 'input' | 'searchSelect';

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
  pagination?: any;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 }
};

const ProTable: React.FC<ProTableProps> = ({
  headerTitle,
  columns,
  initialValues,
  loading,
  dataSource,
  search,
  pagination,
  toolBarRender,
  rowKey = 'id'
}) => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();
  const fields = useMemo(() => columns?.filter(col => col.valueType), [columns]);

  const renderFormItems = useCallback(() => {
    const count = expand ? fields.length : 5;
    return fields
      .filter((f, index) => index < count)
      .map(col => (
        <Col span={8} key={col.dataIndex}>
          <Form.Item name={col.dataIndex} label={col.title} {...layout} {...col.formItemProps}>
            {renderInput(col)}
          </Form.Item>
        </Col>
      ));
  }, [columns, expand]);

  const renderInput = ({ valueType, ...restProps }) => {
    switch (valueType) {
      case 'input':
        return <Input allowClear placeholder="请输入" {...restProps} />;
      case 'searchSelect':
        return <SearchSelect placeholder="请选择" {...restProps} />;
      case 'dateRange':
        return <RangePicker style={{width:'100%'}}/>;
      default:
        break;
    }
  };

  const onFinish = (values: any) => {
    const propsValues = fields.reduce((result, field: ColumnsProps) => {
      const value = values[field.dataIndex];
      const nextValue = field.transform ? field.transform(value) : value;
      result[field.dataIndex] = nextValue;
      return result;
    }, {});
    search.onFinish(propsValues);
  };

  const paginationProps = React.useMemo(() => {
    return {
      showQuickJumper: true,
      showSizeChanger: true,
      size: 'small',
      style: { paddingTop: 24, textAlign: 'right' },
      ...pagination
    };
  }, [pagination]);

  return (
    <>
      <div className={styles.form}>
        <Form form={form} onFinish={onFinish} initialValues={initialValues}>
          <Row gutter={24}>
            {renderFormItems()}
            <Col span={8} push={(2 - (fields.length % 3))*8} style={{ textAlign: 'right', paddingRight: 4 }}>
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
        <Table rowKey={rowKey} columns={columns} loading={loading} dataSource={dataSource} pagination={false} />
        {pagination && <Pagination {...paginationProps} />}
      </Card>
    </>
  );
};

export default React.memo(ProTable);
