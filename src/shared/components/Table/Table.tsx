import { Table as AntTable } from 'antd';
import { PaginationConfig } from 'antd/lib/pagination';
import { SorterResult, TableRowSelection } from 'antd/lib/table/interface';
import * as React from 'react';

interface TableProps {
    children?: React.ReactNode;
    dataSource?: any[];
    rowSelection?: TableRowSelection<any>;

    onChange?: (
        pagination: PaginationConfig,
        filters: Record<string, React.ReactText[] | null>,
        sorter: SorterResult<any> | SorterResult<any>[],
        extra: any
    ) => void;
}

export const Table = React.memo<TableProps>(({ children, dataSource, onChange, rowSelection }) => (
    <AntTable dataSource={dataSource} onChange={onChange} rowSelection={rowSelection}>
        {children}
    </AntTable>
));
