import * as React from 'react';

import { UoM, UoMData } from 'src/core/api';

import { Spin } from 'src/shared/components/Spin';
import { Status } from 'src/shared/components/Status';
import { Column, Table, TableAction } from 'src/shared/components/Table';
import { mutationForm } from 'src/shared/graphql/mutationForm';
import { deleteUoM, getUoMs, UOMS, updateManyUoM } from 'src/shared/graphql/UoM/schema.gql';
import { Delete } from 'src/shared/utilities/delete';
import { ErrorHandler } from 'src/shared/utilities/errors';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { uomColumns } from './constants';

interface UoMListProps {
    action: string;

    handleRecord: (recordKey: string) => void;
    resetAction: () => void;
}

export const UoMList = React.memo<UoMListProps>(({ action, handleRecord, resetAction }) => {
    let [selectedRowKeys, selectRowKeys] = React.useState([]);
    let rowSelection = {
        selectedRowKeys,
        onChange: handleSelect,
    };

    let mutation = mutationForm('delete', deleteUoM);
    let mutationAction = mutationForm('update', updateManyUoM);
    let query = handleQuery();
    let uoms: UoMData[] = handleData(query.data?.getUoMs);
    if (mutation.loading || mutationAction.loading || query.loading) return <Spin />;

    if (action !== '' && hasSelected()) {
        mutationAction.action({
            refetchQueries: [{ query: UOMS }],
            variables: {
                payload: { id: selectedRowKeys, status: action },
            },
        });
        resetAction();
    } else if (action !== '' && !hasSelected()) {
        Message('Select the data first', 'error');
        resetAction();
    }

    function handleData(uom?: UoM[]) {
        if (!uom || !uom.length) {
            return [];
        }

        return uom.map((uom: UoM) => {
            return {
                key: uom.id!,
                name: uom.name,
                description: uom.description,
                status: uom.status,
            };
        });
    }

    function handleDelete(record: any) {
        Progress(true);

        mutation.action({
            refetchQueries: [{ query: UOMS }],
            variables: {
                payload: { id: record.key },
            },
        });
    }

    function handleQuery() {
        let { data, loading } = getUoMs({
            onError(error: any) {
                ErrorHandler(error);
            },
        });
        return {
            data,
            loading,
        };
    }

    function handleSelect(selectedRowKeys: any) {
        selectRowKeys(selectedRowKeys);
    }

    function handleUpdate(recordKey: string) {
        handleRecord(recordKey);
    }

    function hasSelected() {
        return selectedRowKeys.length > 0;
    }

    return (
        <Table dataSource={uoms} rowSelection={rowSelection}>
            {uomColumns.map((column: any) => (
                <Column dataIndex={column.dataIndex} key={column.key} title={column.title} />
            ))}
            <Column title='Status' key='status' render={(text) => <Status text={text} />} />
            <Column
                title='Action'
                key='action'
                render={(text, record) => (
                    <>
                        <TableAction
                            iconType='edit'
                            record={record}
                            title='Edit'
                            onClick={handleUpdate}
                        />
                        <Delete confirm={handleDelete} recordKey={record} />
                    </>
                )}
            />
        </Table>
    );
});
