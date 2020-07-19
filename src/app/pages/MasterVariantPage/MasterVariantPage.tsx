import React from 'react';

import { Page } from 'src/app/shell/Page';

import { Variant, VariantData } from 'src/core/api';
import { createAuthTokenStorage } from 'src/core/graphql/auth';

import { MasterCard } from 'src/shared/components/Master/containers/MasterCard';
import { MasterList } from 'src/shared/components/Master/containers/MasterList';
import {
    deleteVariant,
    getVariantById,
    getVariantList,
    updateManyVariant,
    VARIANT_LIST,
} from 'src/shared/graphql/Variant/schema.gql';

import { getLanguage } from '../SettingPage/helpers';
import { moduleName, title, variantColumns } from './constants';
import { MasterVariantForm } from './MasterVariantForm';

export function MasterVariantPage() {
    let storage = createAuthTokenStorage();
    let lang = getLanguage();

    function handleData(data?: any): { list: VariantData[]; total: number } {
        let variant = data?.getVariantList.data;
        let total = data?.getVariantList.total;
        if (!variant || !variant.length) {
            return { list: [], total: 0 };
        }

        return {
            list: variant.map((variant: Variant) => {
                return {
                    key: variant.id!,
                    name: variant.name,
                    description: variant.description,
                    status: variant.status,
                };
            }),
            total,
        };
    }

    function handleReadData(data?: any) {
        return data?.getVariantById;
    }

    return (
        <Page>
            <MasterCard
                header={{ link: '/variant', title }}
                initSection='variant'
                isCrud
                module={moduleName}
                showAction
            >
                {({ action, recordKey, handleRecord, handleResetAction, handleShowCreate }) =>
                    ['list', 'active', 'inactive'].includes(action!) ? (
                        <MasterList
                            action={action!}
                            auth={storage.getToken()}
                            columns={variantColumns}
                            hasStatus
                            lang={lang}
                            module={moduleName}
                            mutation={{
                                delete: deleteVariant,
                                update: updateManyVariant,
                            }}
                            query={{
                                list: getVariantList,
                                read: getVariantById,
                                refetch: VARIANT_LIST,
                            }}
                            title={title}
                            handleData={handleData}
                            handleReadData={handleReadData}
                            handleRecord={handleRecord!}
                            handleResetAction={handleResetAction!}
                            handleShowCreate={handleShowCreate!}
                        />
                    ) : (
                        <MasterVariantForm
                            auth={storage.getToken()}
                            formType={action!}
                            recordKey={recordKey}
                        />
                    )
                }
            </MasterCard>
        </Page>
    );
}
