import * as React from 'react';

import { Column, Table, TableAction, TableRowProps } from 'src/shared/components/Table';
import { Status } from 'src/shared/components/Status';
import { Delete } from 'src/shared/utilities/delete';

interface CrudListTableProps extends TableRowProps {
    columns: {
        dataIndex: string;
        key: string;
        title: string;
    }[];
    data?: any[];
    hasStatus?: boolean;

    handleDelete: (record: any) => void;
    handleRecord: (recordKey: string) => void;
}

export const CrudListTable = React.memo<CrudListTableProps>(
    ({ columns, data, hasStatus, handleDelete, handleRecord, rowSelection }) => (
        <Table dataSource={data} rowSelection={rowSelection}>
            {columns.map((column: any) => (
                <Column dataIndex={column.dataIndex} key={column.key} title={column.title} />
            ))}
            {hasStatus && (
                <Column title='Status' key='status' render={(text) => <Status text={text} />} />
            )}
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
