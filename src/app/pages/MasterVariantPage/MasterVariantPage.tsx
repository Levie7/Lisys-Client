import React from 'react';

import { Variant, VariantData } from 'src/core/api';

import { MasterCard } from 'src/modules/Master/containers/MasterCard';
import { MasterList } from 'src/modules/Master/containers/MasterList';

import {
    deleteVariant,
    getVariants,
    updateManyVariant,
    VARIANTS,
} from 'src/shared/graphql/Variant/schema.gql';

import { variantColumns } from './constants';
import { MasterVariantForm } from './MasterVariantForm';

export const MasterVariantPage = () => {
    function handleData(data?: any): VariantData[] {
        let variant = data?.getVariants;
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

    return (
        <MasterCard header={{ link: '/variant', title: 'Variant' }} initSection='variant'>
            {({ action, recordKey, handleRecord, handleResetAction }) =>
                ['list', 'active', 'inactive'].includes(action) ? (
                    <MasterList
                        action={action}
                        columns={variantColumns}
                        mutation={{
                            delete: deleteVariant,
                            update: updateManyVariant,
                        }}
                        query={{
                            data: getVariants,
                            refetch: VARIANTS,
                        }}
                        handleData={handleData}
                        handleRecord={handleRecord}
                        handleResetAction={handleResetAction}
                    />
                ) : (
                    <MasterVariantForm formType={action} recordKey={recordKey} />
                )
            }
        </MasterCard>
    );
};
