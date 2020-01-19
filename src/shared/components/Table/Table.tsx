import { Table as AntTable } from 'antd';
import * as React from 'react';

interface TableProps {
    columns?: any;
    dataSource?: any;
}

export const Table = React.memo<TableProps>(({ columns, dataSource }) => (
    <AntTable columns={columns} dataSource={dataSource} />
));
