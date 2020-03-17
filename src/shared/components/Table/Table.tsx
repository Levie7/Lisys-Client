import { Table as AntTable } from 'antd';
import * as React from 'react';

import { TableRowSelection } from './interfaces';

interface TableProps {
    children?: React.ReactNode;
    dataSource?: any;
    rowSelection?: TableRowSelection<unknown>;
}

export const Table = React.memo<TableProps>(({ children, dataSource, rowSelection }) => (
    <AntTable
        dataSource={dataSource}
        // rowSelection={rowSelection}
    >
        {children}
    </AntTable>
));
