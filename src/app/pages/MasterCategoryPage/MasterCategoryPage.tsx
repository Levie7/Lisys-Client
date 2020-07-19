import React from 'react';

import { Page } from 'src/app/shell/Page';

import { Category, CategoryData } from 'src/core/api';
import { createAuthTokenStorage } from 'src/core/graphql/auth';

import { MasterCard } from 'src/shared/components/Master/containers/MasterCard';
import { MasterList } from 'src/shared/components/Master/containers/MasterList';

import {
    CATEGORY_LIST,
    deleteCategory,
    getCategoryById,
    getCategoryList,
    updateManyCategory,
} from 'src/shared/graphql/Category/schema.gql';

import { getLanguage } from '../SettingPage/helpers';
import { categoryColumns, moduleName, title } from './constants';
import { MasterCategoryForm } from './MasterCategoryForm';

export const MasterCategoryPage = () => {
    let storage = createAuthTokenStorage();
    let lang = getLanguage();

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

    function handleReadData(data?: any) {
        return data?.getCategoryById;
    }

    return (
        <Page>
            <MasterCard
                header={{ link: '/category', title }}
                initSection='category'
                isCrud
                module={moduleName}
                showAction
            >
                {({ action, recordKey, handleRecord, handleResetAction, handleShowCreate }) =>
                    ['list', 'active', 'inactive'].includes(action!) ? (
                        <MasterList
                            action={action!}
                            auth={storage.getToken()}
                            columns={categoryColumns}
                            hasStatus
                            lang={lang}
                            module={moduleName}
                            mutation={{
                                delete: deleteCategory,
                                update: updateManyCategory,
                            }}
                            query={{
                                list: getCategoryList,
                                read: getCategoryById,
                                refetch: CATEGORY_LIST,
                            }}
                            title={title}
                            handleData={handleData}
                            handleReadData={handleReadData}
                            handleRecord={handleRecord!}
                            handleResetAction={handleResetAction!}
                            handleShowCreate={handleShowCreate!}
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
