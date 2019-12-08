import { Table as AntTable } from 'antd';
import * as React from 'react';

interface TableProps {
    columns?: any;
    dataSource?: any;
}

export class Table extends React.Component<TableProps, {}> {
    render() {
        let { columns, dataSource } = this.props;

        return <AntTable columns={columns} dataSource={dataSource} />;
    }
}
