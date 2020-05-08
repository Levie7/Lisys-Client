import * as React from 'react';

import { Column, ColumnProps, Table, TableAction, TableProps } from 'src/shared/components/Table';
import { Status } from 'src/shared/components/Status';
import { Delete } from 'src/shared/utilities/delete';

import { filterStatus } from './constants';

interface CrudListTableProps extends TableProps {
    columns: ColumnProps[];
    hasStatus?: boolean;

    handleDelete: (record: any) => void;
    handleRecord: (recordKey: string) => void;
}

function CrudListTablePure({
    columns,
    hasStatus,
    handleDelete,
    handleRecord,
    ...props
}: CrudListTableProps) {
    function handleFilter(value: any, record: any) {
        return record.status.indexOf(value) === 0;
    }

    return (
        <Table {...props}>
            {columns.map((column: any) => (
                <Column
                    dataIndex={column.dataIndex}
                    key={column.key}
                    sorter={column.sorter}
                    title={column.title}
                />
            ))}
            {hasStatus && (
                <Column
                    title='Status'
                    filters={filterStatus}
                    key='status'
                    onFilter={handleFilter}
                    render={(text) => <Status text={text} />}
                />
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
    );
}

export const CrudListTable = React.memo(CrudListTablePure);
