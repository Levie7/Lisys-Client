import { Table as AntTable } from 'antd';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import * as React from 'react';

export interface ColumnProps {
    dataIndex?: string;
    filters?: ColumnFilterItem[];
    key: string;
    sorter?: boolean;
    title: string;

    onFilter?: (value: any, record: unknown) => boolean;
    render?: (text: any, record: unknown, index: number) => React.ReactNode;
}

export const Column = React.memo<ColumnProps>(
    ({ dataIndex, filters, key, onFilter, render, sorter, title }) => (
        <AntTable.Column
            dataIndex={dataIndex}
            key={key}
            filters={filters}
            onFilter={onFilter}
            render={render}
            sorter={sorter}
            title={title}
        />
    )
);
