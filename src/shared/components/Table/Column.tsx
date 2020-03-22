import { Table as AntTable } from 'antd';
import * as React from 'react';

interface ColumnProps {
    dataIndex?: string;
    key: string;
    title: string;
    render?: (text: any, record: unknown, index: number) => React.ReactNode;
}

export const Column = React.memo<ColumnProps>(({ dataIndex, key, render, title }) => (
    <AntTable.Column dataIndex={dataIndex} key={key} render={render} title={title} />
));
