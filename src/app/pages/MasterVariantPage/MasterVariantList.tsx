import * as React from 'react';

import { Variant, VariantData } from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm, queryForm } from 'src/shared/graphql';
import {
    deleteVariant,
    getVariants,
    updateManyVariant,
    VARIANTS,
} from 'src/shared/graphql/Variant/schema.gql';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { variantColumns } from './constants';

interface MasterVariantListProps {
    action: string;

    handleRecord: (recordKey: string) => void;
    handleResetAction: () => void;
}

export function MasterVariantList({
    action,
    handleRecord,
    handleResetAction,
}: MasterVariantListProps) {
    let [selectedRowKeys, selectRowKeys] = React.useState([]);
    let rowSelection = {
        selectedRowKeys,
        onChange: handleSelect,
    };

    let mutation = mutationForm(deleteVariant, 'delete');
    let mutationAction = mutationForm(updateManyVariant, 'update');
    let query = queryForm({ query: getVariants });
    let variants = handleData(query.data?.getVariants);
    if (mutation.loading || mutationAction.loading || query.loading) return <Spin />;

    if (action !== 'list' && hasSelected()) {
        mutationAction.action({
            refetchQueries: [{ query: VARIANTS }],
            variables: {
                payload: { id: selectedRowKeys, status: action },
            },
        });
        handleResetAction();
    } else if (action !== 'list' && !hasSelected()) {
        Message('Select the data first', 'error');
        handleResetAction();
    }

    function handleData(variant?: Variant[]): VariantData[] {
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

    function handleSelect(selectedRowKeys: any) {
        selectRowKeys(selectedRowKeys);
    }

    function hasSelected() {
        return selectedRowKeys.length > 0;
    }

    return (
        <CrudListTable
            columns={variantColumns}
            data={variants}
            handleDelete={handleDelete}
            handleRecord={handleRecord}
            hasStatus
            rowSelection={rowSelection}
        />
    );
}
