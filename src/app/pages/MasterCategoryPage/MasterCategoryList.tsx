import * as React from 'react';

import { Category, CategoryData } from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { Spin } from 'src/shared/components/Spin';
import {
    CATEGORIES,
    deleteCategory,
    getCategories,
    updateManyCategory,
} from 'src/shared/graphql/Category/schema.gql';
import { mutationForm, queryForm } from 'src/shared/graphql';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { categoryColumns } from './constants';

interface MasterCategoryListProps {
    action: string;

    handleRecord: (recordKey: string) => void;
    handleResetAction: () => void;
}

export function MasterCategoryList({
    action,
    handleRecord,
    handleResetAction,
}: MasterCategoryListProps) {
    let [selectedRowKeys, selectRowKeys] = React.useState([]);
    let rowSelection = {
        selectedRowKeys,
        onChange: handleSelect,
    };
    let mutation = mutationForm(deleteCategory, 'delete');
    let mutationAction = mutationForm(updateManyCategory, 'update');
    let query = queryForm({ query: getCategories });
    let categories = handleData(query.data?.getCategories);
    if (mutation.loading || mutationAction.loading || query.loading) return <Spin />;

    if (action !== 'list' && hasSelected()) {
        mutationAction.action({
            refetchQueries: [{ query: CATEGORIES }],
            variables: {
                payload: { id: selectedRowKeys, status: action },
            },
        });
        handleResetAction();
    } else if (action !== 'list' && !hasSelected()) {
        Message('Select the data first', 'error');
        handleResetAction();
    }

    function handleData(category?: Category[]): CategoryData[] {
        if (!category || !category.length) {
            return [];
        }

        return category.map((category: Category) => {
            return {
                key: category.id!,
                name: category.name,
                description: category.description,
                status: category.status,
            };
        });
    }

    function handleDelete(record: any) {
        Progress(true);

        mutation.action({
            refetchQueries: [{ query: CATEGORIES }],
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
            columns={categoryColumns}
            data={categories}
            handleDelete={handleDelete}
            handleRecord={handleRecord}
            hasStatus
            rowSelection={rowSelection}
        />
    );
}
