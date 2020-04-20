import * as React from 'react';

import { Column, Table, TableAction } from 'src/shared/components/Table';
import { Delete } from 'src/shared/utilities/delete';

interface CrudListTableProps {
    columns: {
        dataIndex: string;
        key: string;
        title: string;
    }[];
    data?: any[];

    handleDelete: (record: any) => void;
    handleRecord: (recordKey: string) => void;
}

export const CrudListTable = React.memo<CrudListTableProps>(
    ({ columns, data, handleDelete, handleRecord }) => (
        <Table dataSource={data}>
            {columns.map((column: any) => (
                <Column dataIndex={column.dataIndex} key={column.key} title={column.title} />
            ))}
            <Column
                title='Action'
                key='action'
                render={(text, record) => (
                    <>
                        <TableAction
                            iconType='edit'
                            record={record}
                            title='Edit'
                            onClick={handleRecord}
                        />
                        <Delete confirm={handleDelete} recordKey={record} />
                    </>
                )}
            />
        </Table>
    )
);
