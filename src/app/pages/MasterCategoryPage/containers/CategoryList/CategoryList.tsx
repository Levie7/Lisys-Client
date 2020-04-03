import * as React from 'react';

import { Category, CategoryData } from 'src/core/api';

import { Spin } from 'src/shared/components/Spin';
import { Status } from 'src/shared/components/Status';
import { Column, Table, TableAction } from 'src/shared/components/Table';
import { mutationForm } from 'src/shared/graphql/mutationForm';
import { Delete } from 'src/shared/utilities/delete';
import { ErrorHandler } from 'src/shared/utilities/errors';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { categoryColumns } from './constants';
import { CATEGORIES, deleteCategory, getCategories, updateManyCategory } from '../schema.gql';

interface CategoryListProps {
    action: string;

    handleRecord: (recordKey: string) => void;
    resetAction: () => void;
}

export const CategoryList = React.memo<CategoryListProps>(
    ({ action, handleRecord, resetAction }) => {
        let [selectedRowKeys, selectRowKeys] = React.useState([]);
        let rowSelection = {
            selectedRowKeys,
            onChange: handleSelect,
        };

        let mutation = mutationForm('delete', deleteCategory);
        let mutationAction = mutationForm('update', updateManyCategory);
        let query = handleQuery();
        let categories: CategoryData[] = handleData(query.data?.getCategories);
        if (mutation.loading || mutationAction.loading || query.loading) return <Spin />;

        if (action !== '' && hasSelected()) {
            mutationAction.action({
                refetchQueries: [{ query: CATEGORIES }],
                variables: {
                    payload: { id: selectedRowKeys, status: action },
                },
            });
            resetAction();
        } else if (action !== '' && !hasSelected()) {
            Message('Select the data first', 'error');
            resetAction();
        }

        function handleData(category?: Category[]) {
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

        function handleQuery() {
            let { data, loading } = getCategories({
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
            <Table dataSource={categories} rowSelection={rowSelection}>
                {categoryColumns.map((column: any) => (
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
    }
);
