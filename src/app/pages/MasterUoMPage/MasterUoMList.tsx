import * as React from 'react';

import { UoM, UoMData } from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm, queryForm } from 'src/shared/graphql';
import { deleteUoM, getUoMs, UOMS, updateManyUoM } from 'src/shared/graphql/UoM/schema.gql';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { uomColumns } from './constants';

interface MasterUoMListProps {
    action: string;

    handleRecord: (recordKey: string) => void;
    handleResetAction: () => void;
}

export function MasterUoMList({ action, handleRecord, handleResetAction }: MasterUoMListProps) {
    let [selectedRowKeys, selectRowKeys] = React.useState([]);
    let rowSelection = {
        selectedRowKeys,
        onChange: handleSelect,
    };
    let mutation = mutationForm(deleteUoM, 'delete');
    let mutationAction = mutationForm(updateManyUoM, 'update');
    let query = queryForm({ query: getUoMs });
    let uoms = handleData(query.data?.getUoMs);
    if (mutation.loading || mutationAction.loading || query.loading) return <Spin />;

    if (action !== 'list' && hasSelected()) {
        mutationAction.action({
            refetchQueries: [{ query: UOMS }],
            variables: {
                payload: { id: selectedRowKeys, status: action },
            },
        });
        handleResetAction();
    } else if (action !== 'list' && !hasSelected()) {
        Message('Select the data first', 'error');
        handleResetAction();
    }

    function handleData(uom?: UoM[]): UoMData[] {
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

    function handleSelect(selectedRowKeys: any) {
        selectRowKeys(selectedRowKeys);
    }

    function hasSelected() {
        return selectedRowKeys.length > 0;
    }

    return (
        <CrudListTable
            columns={uomColumns}
            data={uoms}
            handleDelete={handleDelete}
            handleRecord={handleRecord}
            hasStatus
            rowSelection={rowSelection}
        />
    );
}
