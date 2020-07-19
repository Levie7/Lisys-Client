import React from 'react';

import { Page } from 'src/app/shell/Page';

import { UoM, UoMData } from 'src/core/api';
import { createAuthTokenStorage } from 'src/core/graphql/auth';

import { MasterCard } from 'src/shared/components/Master/containers/MasterCard';
import { MasterList } from 'src/shared/components/Master/containers/MasterList';
import {
    deleteUoM,
    getUoMById,
    getUoMList,
    UOM_LIST,
    updateManyUoM,
} from 'src/shared/graphql/UoM/schema.gql';

import { getLanguage } from '../SettingPage/helpers';
import { moduleName, title, uomColumns } from './constants';
import { MasterUoMForm } from './MasterUoMForm';

export const MasterUoMPage = () => {
    let storage = createAuthTokenStorage();
    let lang = getLanguage();

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

    function handleReadData(data?: any) {
        return data?.getUoMById;
    }

    return (
        <Page>
            <MasterCard
                header={{ link: '/uom', title }}
                initSection='uom'
                isCrud
                module={moduleName}
                showAction
            >
                {({ action, recordKey, handleRecord, handleResetAction, handleShowCreate }) =>
                    ['list', 'active', 'inactive'].includes(action!) ? (
                        <MasterList
                            action={action!}
                            auth={storage.getToken()}
                            columns={uomColumns}
                            lang={lang}
                            hasStatus
                            module={moduleName}
                            mutation={{
                                delete: deleteUoM,
                                update: updateManyUoM,
                            }}
                            query={{
                                list: getUoMList,
                                read: getUoMById,
                                refetch: UOM_LIST,
                            }}
                            title={title}
                            handleData={handleData}
                            handleReadData={handleReadData}
                            handleRecord={handleRecord!}
                            handleResetAction={handleResetAction!}
                            handleShowCreate={handleShowCreate!}
                        />
                    ) : (
                        <MasterUoMForm
                            auth={storage.getToken()}
                            formType={action!}
                            lang={lang}
                            recordKey={recordKey}
                        />
                    )
                }
            </MasterCard>
        </Page>
    );
};
