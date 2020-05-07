import { Table as AntTable } from 'antd';
import * as React from 'react';

export interface ColumnProps {
    dataIndex?: string;
    key: string;
    sorter?: boolean;
    title: string;

    render?: (text: any, record: unknown, index: number) => React.ReactNode;
}

export const Column = React.memo<ColumnProps>(({ dataIndex, key, render, sorter, title }) => (
    <AntTable.Column
        dataIndex={dataIndex}
        key={key}
        render={render}
        sorter={sorter}
        title={title}
    />
));
