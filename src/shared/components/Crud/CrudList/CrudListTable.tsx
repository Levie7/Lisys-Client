import * as React from 'react';

import { Column, ColumnProps, Table, TableAction, TableProps } from 'src/shared/components/Table';
import { Status } from 'src/shared/components/Status';
import { Delete } from 'src/shared/utilities/delete';

import { filterStatus } from './constants';

interface CrudListTableProps extends TableProps {
    columns: ColumnProps[];
    hasAction?: boolean;
    hasStatus?: boolean;
    showDelete?: boolean;
    showSelect?: boolean;
    showUpdate?: boolean;

    handleDelete?: (record: any) => void;
    handleRecord?: (recordKey: string, record?: any) => void;
}

function CrudListTablePure({
    columns,
    hasAction,
    hasStatus,
    handleDelete,
    handleRecord,
    showDelete,
    showSelect,
    showUpdate,
    ...props
}: CrudListTableProps) {
    function handleFilter(value: any, record: any) {
        return record.status.indexOf(value) === 0;
    }

    return (
        <Table {...props}>
            {columns.map(
                (column: any) =>
                    !column.hide && (
                        <Column
                            dataIndex={column.dataIndex}
                            key={column.key}
                            sorter={column.sorter}
                            title={column.title}
                        />
                    )
            )}
            {hasStatus && (
                <Column
                    title='Status'
                    filters={filterStatus}
                    key='status'
                    onFilter={handleFilter}
                    render={(text) => <Status text={text} />}
                />
            )}
            {hasAction && (
                <Column
                    title='Action'
                    key='action'
                    render={(text, record) => (
                        <>
                            {showSelect && (
                                <TableAction
                                    iconType='select'
                                    record={record}
                                    title='Select'
                                    onClick={handleRecord}
                                />
                            )}
                            {showUpdate && (
                                <TableAction
                                    iconType='edit'
                                    record={record}
                                    title='Edit'
                                    onClick={handleRecord}
                                />
                            )}
                            {showDelete && <Delete confirm={handleDelete!} recordKey={record} />}
                            {!showSelect && !showUpdate && !showDelete && 'No Action'}
                        </>
                    )}
                />
            )}
        </Table>
    );
}

export const CrudListTable = React.memo(CrudListTablePure);
