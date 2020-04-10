import * as React from 'react';

import { Variant, VariantData } from 'src/core/api';

import { Spin } from 'src/shared/components/Spin';
import { Status } from 'src/shared/components/Status';
import { Column, Table, TableAction } from 'src/shared/components/Table';
import { mutationForm } from 'src/shared/graphql/mutationForm';
import {
    deleteVariant,
    getVariants,
    updateManyVariant,
    VARIANTS,
} from 'src/shared/graphql/Variant/schema.gql';
import { Delete } from 'src/shared/utilities/delete';
import { ErrorHandler } from 'src/shared/utilities/errors';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { variantColumns } from './constants';

interface VariantListProps {
    action: string;

    handleRecord: (recordKey: string) => void;
    resetAction: () => void;
}

export const VariantList = React.memo<VariantListProps>(({ action, handleRecord, resetAction }) => {
    let [selectedRowKeys, selectRowKeys] = React.useState([]);
    let rowSelection = {
        selectedRowKeys,
        onChange: handleSelect,
    };

    let mutation = mutationForm('delete', deleteVariant);
    let mutationAction = mutationForm('update', updateManyVariant);
    let query = handleQuery();
    let variants: VariantData[] = handleData(query.data?.getVariants);
    if (mutation.loading || mutationAction.loading || query.loading) return <Spin />;

    if (action !== '' && hasSelected()) {
        mutationAction.action({
            refetchQueries: [{ query: VARIANTS }],
            variables: {
                payload: { id: selectedRowKeys, status: action },
            },
        });
        resetAction();
    } else if (action !== '' && !hasSelected()) {
        Message('Select the data first', 'error');
        resetAction();
    }

    function handleData(variant?: Variant[]) {
        if (!variant || !variant.length) {
            return [];
        }

        return variant.map((variant: Variant) => {
            return {
                key: variant.id!,
                name: variant.name,
                description: variant.description,
                status: variant.status,
            };
        });
    }

    function handleDelete(record: any) {
        Progress(true);

        mutation.action({
            refetchQueries: [{ query: VARIANTS }],
            variables: {
                payload: { id: record.key },
            },
        });
    }

    function handleQuery() {
        let { data, loading } = getVariants({
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
        <Table dataSource={variants} rowSelection={rowSelection}>
            {variantColumns.map((column: any) => (
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
