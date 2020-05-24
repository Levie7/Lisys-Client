import React from 'react';

import { Page } from 'src/app/shell/Page';

import { UoM, UoMData } from 'src/core/api';
import { createAuthTokenStorage } from 'src/core/graphql/auth';

import { MasterCard } from 'src/shared/components/Master/containers/MasterCard';
import { MasterList } from 'src/shared/components/Master/containers/MasterList';
import { deleteUoM, getUoMList, UOM_LIST, updateManyUoM } from 'src/shared/graphql/UoM/schema.gql';

import { uomColumns } from './constants';
import { MasterUoMForm } from './MasterUoMForm';

export const MasterUoMPage = () => {
    let storage = createAuthTokenStorage();

    function handleData(data?: any): { list: UoMData[]; total: number } {
        let uom = data?.getUoMList.data;
        let total = data?.getUoMList.total;
        if (!uom || !uom.length) {
            return { list: [], total: 0 };
        }

        return {
            list: uom.map((uom: UoM) => {
                return {
                    key: uom.id!,
                    name: uom.name,
                    description: uom.description,
                    status: uom.status,
                };
            }),
            total,
        };
    }

    return (
        <Page>
            <MasterCard
                header={{ link: '/uom', title: 'UoM' }}
                initSection='uom'
                module='Master'
                showAction
            >
                {({ action, recordKey, handleRecord, handleResetAction }) =>
                    ['list', 'active', 'inactive'].includes(action) ? (
                        <MasterList
                            action={action}
                            auth={storage.getToken()}
                            columns={uomColumns}
                            hasStatus
                            mutation={{
                                delete: deleteUoM,
                                update: updateManyUoM,
                            }}
                            query={{
                                list: getUoMList,
                                refetch: UOM_LIST,
                            }}
                            handleData={handleData}
                            handleRecord={handleRecord}
                            handleResetAction={handleResetAction}
                        />
                    ) : (
                        <MasterUoMForm
                            auth={storage.getToken()}
                            formType={action}
                            recordKey={recordKey}
                        />
                    )
                }
            </MasterCard>
        </Page>
    );
};
