import React from 'react';

import { Page } from 'src/app/shell/Page';

import { Variant, VariantData } from 'src/core/api';
import { createAuthTokenStorage } from 'src/core/graphql/auth';

import { MasterCard } from 'src/shared/components/Master/containers/MasterCard';
import { MasterList } from 'src/shared/components/Master/containers/MasterList';
import {
    deleteVariant,
    getVariantList,
    updateManyVariant,
    VARIANT_LIST,
} from 'src/shared/graphql/Variant/schema.gql';

import { variantColumns } from './constants';
import { MasterVariantForm } from './MasterVariantForm';

export function MasterVariantPage() {
    let storage = createAuthTokenStorage();

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

    return (
        <Page>
            <MasterCard
                header={{ link: '/variant', title: 'Variant' }}
                initSection='variant'
                isCrud
                module='Master'
                showAction
            >
                {({ action, recordKey, handleRecord, handleResetAction }) =>
                    ['list', 'active', 'inactive'].includes(action!) ? (
                        <MasterList
                            action={action!}
                            auth={storage.getToken()}
                            columns={variantColumns}
                            hasStatus
                            mutation={{
                                delete: deleteVariant,
                                update: updateManyVariant,
                            }}
                            query={{
                                list: getVariantList,
                                refetch: VARIANT_LIST,
                            }}
                            handleData={handleData}
                            handleRecord={handleRecord!}
                            handleResetAction={handleResetAction!}
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
