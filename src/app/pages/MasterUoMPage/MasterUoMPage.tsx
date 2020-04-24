import React from 'react';

import { UoM, UoMData } from 'src/core/api';

import { MasterCard } from 'src/modules/Master/containers/MasterCard';
import { MasterList } from 'src/modules/Master/containers/MasterList';

import { deleteUoM, getUoMs, UOMS, updateManyUoM } from 'src/shared/graphql/UoM/schema.gql';

import { uomColumns } from './constants';
import { MasterUoMForm } from './MasterUoMForm';

export const MasterUoMPage = () => {
    function handleData(data?: any): UoMData[] {
        let uom = data?.getUoMs;
        if (!uom || !uom.length) {
            return [];
        }

        return uom.map((uom: UoM) => {
            return {
                key: uom.id!,
                name: uom.name,
                description: uom.description,
                status: uom.status,
            };
        });
    }

    return (
        <MasterCard header={{ link: '/uom', title: 'UoM' }} initSection='uom'>
            {({ action, recordKey, handleRecord, handleResetAction }) =>
                ['list', 'active', 'inactive'].includes(action) ? (
                    <MasterList
                        action={action}
                        columns={uomColumns}
                        mutation={{
                            delete: deleteUoM,
                            update: updateManyUoM,
                        }}
                        query={{
                            data: getUoMs,
                            refetch: UOMS,
                        }}
                        handleData={handleData}
                        handleRecord={handleRecord}
                        handleResetAction={handleResetAction}
                    />
                ) : (
                    <MasterUoMForm formType={action} recordKey={recordKey} />
                )
            }
        </MasterCard>
    );
};
