import * as React from 'react';

import { Lang } from 'src/core/api';

import {
    Column,
    ColumnWithLangProps,
    Table,
    TableAction,
    TableProps,
} from 'src/shared/components/Table';
import { Status } from 'src/shared/components/Status';
import { Delete } from 'src/shared/utilities/delete';

import { crudAction, crudColumn, deleteProps, filterStatus } from './constants';

export interface CrudListTableProps extends Lang, TableProps {
    columns: ColumnWithLangProps[];
    hasAction?: boolean;
    hasStatus?: boolean;
    showDelete?: boolean;
    showRead?: boolean;
    showSelect?: boolean;
    showUpdate?: boolean;

    handleRead?: (recordKey: string) => void;
    handleDelete?: (record: any) => void;
    handleRecord?: (recordKey: string, record?: any) => void;
}

function CrudListTablePure({
    columns,
    hasAction,
    hasStatus,
    handleDelete,
    handleRead,
    handleRecord,
    lang,
    showDelete,
    showRead,
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
                            title={column.title[lang]}
                        />
                    )
            )}
            {hasStatus && (
                <Column
                    title='Status'
                    filters={filterStatus[lang]}
                    key='status'
                    onFilter={handleFilter}
                    render={(text) => <Status text={text} />}
                />
            )}
            {hasAction && (
                <Column
                    title={crudColumn.action.title[lang]}
                    key='action'
                    render={(text, record) => (
                        <>
                            {showSelect && (
                                <TableAction
                                    iconType='select'
                                    record={record}
                                    title={crudAction.select.title[lang]}
                                    onClick={handleRecord}
                                />
                            )}
                            {showRead && (
                                <TableAction
                                    iconType='read'
                                    record={record}
                                    title={crudAction.read.title[lang]}
                                    onClick={handleRead}
                                />
                            )}
                            {showUpdate && (
                                <TableAction
                                    iconType='edit'
                                    record={record}
                                    title={crudAction.update.title[lang]}
                                    onClick={handleRecord}
                                />
                            )}
                            {showDelete && (
                                <Delete
                                    cancelText={deleteProps.cancelText[lang]}
                                    confirm={handleDelete!}
                                    okText={deleteProps.okText[lang]}
                                    popupTitle={deleteProps.popupTitle[lang]}
                                    recordKey={record}
                                    title={crudAction.delete.title[lang]}
                                />
                            )}
                            {!showSelect &&
                                !showUpdate &&
                                !showDelete &&
                                crudAction.no_action.message[lang]}
                        </>
                    )}
                />
            )}
        </Table>
    );
}

export const CrudListTable = React.memo(CrudListTablePure);
