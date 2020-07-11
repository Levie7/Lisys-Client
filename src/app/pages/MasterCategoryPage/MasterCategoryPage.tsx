import React from 'react';

import { Page } from 'src/app/shell/Page';

import { Category, CategoryData } from 'src/core/api';
import { createAuthTokenStorage } from 'src/core/graphql/auth';

import { MasterCard } from 'src/shared/components/Master/containers/MasterCard';
import { MasterList } from 'src/shared/components/Master/containers/MasterList';

import {
    CATEGORY_LIST,
    deleteCategory,
    getCategoryList,
    updateManyCategory,
} from 'src/shared/graphql/Category/schema.gql';

import { categoryColumns } from './constants';
import { MasterCategoryForm } from './MasterCategoryForm';

export const MasterCategoryPage = () => {
    let storage = createAuthTokenStorage();

    function handleData(data?: any): { list: CategoryData[]; total: number } {
        let category = data?.getCategoryList.data;
        let total = data?.getCategoryList.total;
        if (!category || !category.length) {
            return { list: [], total: 0 };
        }

        return {
            list: category.map((category: Category) => {
                return {
                    key: category.id!,
                    name: category.name,
                    description: category.description,
                    status: category.status,
                };
            }),
            total,
        };
    }

    return (
        <Page>
            <MasterCard
                header={{ link: '/category', title: 'Category' }}
                initSection='category'
                isCrud
                module='Master'
                showAction
            >
                {({ action, recordKey, handleRecord, handleResetAction }) =>
                    ['list', 'active', 'inactive'].includes(action!) ? (
                        <MasterList
                            action={action!}
                            auth={storage.getToken()}
                            columns={categoryColumns}
                            hasStatus
                            module='Category'
                            mutation={{
                                delete: deleteCategory,
                                update: updateManyCategory,
                            }}
                            query={{
                                list: getCategoryList,
                                refetch: CATEGORY_LIST,
                            }}
                            handleData={handleData}
                            handleRecord={handleRecord!}
                            handleResetAction={handleResetAction!}
                        />
                    ) : (
                        <MasterCategoryForm
                            auth={storage.getToken()}
                            formType={action!}
                            recordKey={recordKey}
                        />
                    )
                }
            </MasterCard>
        </Page>
    );
};
