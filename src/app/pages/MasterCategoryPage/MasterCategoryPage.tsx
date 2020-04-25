import React from 'react';

import { Category, CategoryData } from 'src/core/api';

import { MasterCard } from 'src/modules/Master/containers/MasterCard';
import { MasterList } from 'src/modules/Master/containers/MasterList';

import {
    CATEGORIES,
    deleteCategory,
    getCategories,
    updateManyCategory,
} from 'src/shared/graphql/Category/schema.gql';

import { categoryColumns } from './constants';
import { MasterCategoryForm } from './MasterCategoryForm';

export const MasterCategoryPage = () => {
    function handleData(data?: any): CategoryData[] {
        let category = data?.getCategories;
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

    return (
        <MasterCard header={{ link: '/category', title: 'Category' }} initSection='category'>
            {({ action, recordKey, handleRecord, handleResetAction }) =>
                ['list', 'active', 'inactive'].includes(action) ? (
                    <MasterList
                        action={action}
                        columns={categoryColumns}
                        mutation={{
                            delete: deleteCategory,
                            update: updateManyCategory,
                        }}
                        query={{
                            data: getCategories,
                            refetch: CATEGORIES,
                        }}
                        handleData={handleData}
                        handleRecord={handleRecord}
                        handleResetAction={handleResetAction}
                    />
                ) : (
                    <MasterCategoryForm formType={action} recordKey={recordKey} />
                )
            }
        </MasterCard>
    );
};
