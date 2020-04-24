import React from 'react';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm, queryForm } from 'src/shared/graphql';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

interface MasterListProps {
    action: string;
    columns: {
        dataIndex: string;
        key: string;
        title: string;
    }[];
    mutation: {
        delete: any;
        update: any;
    };
    query: {
        data: any;
        refetch: any;
    };

    handleData: (data: any) => any[];
    handleRecord: (recordKey: string) => void;
    handleResetAction: () => void;
}

export function MasterList({
    action,
    columns,
    mutation,
    query,
    handleData,
    handleRecord,
    handleResetAction,
}: MasterListProps) {
    let [selectedRowKeys, selectRowKeys] = React.useState([]);
    let rowSelection = {
        selectedRowKeys,
        onChange: handleSelect,
    };

    let mutationDelete = mutationForm(mutation.delete, 'delete');
    let mutationUpdate = mutationForm(mutation.update, 'update');
    let queryData = queryForm({ query: query.data });
    let data = handleData(queryData.data);
    if (mutationDelete.loading || mutationUpdate.loading || queryData.loading) return <Spin />;

    if (action !== 'list' && hasSelected()) {
        mutationUpdate.action({
            refetchQueries: [{ query: query.refetch }],
            variables: {
                payload: { id: selectedRowKeys, status: action },
            },
        });
        handleResetAction();
    } else if (action !== 'list' && !hasSelected()) {
        Message('Select the data first', 'error');
        handleResetAction();
    }

    function handleDelete(record: any) {
        Progress(true);

        mutationDelete.action({
            refetchQueries: [{ query: query.refetch }],
            variables: {
                payload: { id: record.key },
            },
        });
    }

    function handleSelect(selectedRowKeys: any) {
        selectRowKeys(selectedRowKeys);
    }

    function hasSelected() {
        return selectedRowKeys.length > 0;
    }

    return (
        <CrudListTable
            columns={columns}
            data={data}
            handleDelete={handleDelete}
            handleRecord={handleRecord}
            hasStatus
            rowSelection={rowSelection}
        />
    );
}
