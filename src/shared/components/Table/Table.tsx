import { Table as AntTable } from 'antd';
import { PaginationConfig } from 'antd/lib/pagination';
import { SorterResult, TablePaginationConfig, TableRowSelection } from 'antd/lib/table/interface';
import * as React from 'react';

export interface TableProps {
    children?: React.ReactNode;
    dataSource?: any[];
    loading?: boolean;
    pagination?: false | TablePaginationConfig;
    rowSelection?: TableRowSelection<any>;

    onChange?: (
        pagination: PaginationConfig,
        filters: Record<string, React.ReactText[] | null>,
        sorter: SorterResult<any> | SorterResult<any>[],
        extra: any
    ) => void;
}

export const Table = React.memo<TableProps>(
    ({ children, dataSource, loading, pagination, onChange, rowSelection }) => (
        <AntTable
            dataSource={dataSource}
            loading={loading}
            pagination={pagination}
            onChange={onChange}
            rowSelection={rowSelection}
        >
            {children}
        </AntTable>
    )
);
