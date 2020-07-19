import React from 'react';

import { Page } from 'src/app/shell/Page';

import { createAuthTokenStorage } from 'src/core/graphql/auth';

import { MasterCard } from 'src/shared/components/Master/containers/MasterCard';
import { MasterList } from 'src/shared/components/Master/containers/MasterList';
import { handleMedicineData } from 'src/shared/components/Master/helpers';
import {
    deleteMedicine,
    getMedicineByQuery,
    getMedicineList,
    MEDICINE_LIST,
    updateManyMedicine,
} from 'src/shared/graphql/Medicine/schema.gql';

import { getLanguage } from '../SettingPage/helpers';
import { medicineColumns, moduleName, title } from './constants';
import { MasterMedicineForm } from './MasterMedicineForm';

export const MasterMedicinePage = () => {
    let storage = createAuthTokenStorage();
    let lang = getLanguage();

    function handleReadData(data?: any) {
        return data?.getMedicineByQuery;
    }

    return (
        <Page>
            <MasterCard
                header={{ link: '/medicine', title }}
                initSection='medicine'
                isCrud
                module={moduleName}
                showAction
            >
                {({ action, recordKey, handleRecord, handleResetAction, handleShowCreate }) =>
                    ['list', 'active', 'inactive'].includes(action!) ? (
                        <MasterList
                            action={action!}
                            auth={storage.getToken()}
                            columns={medicineColumns}
                            hasStatus
                            lang={lang}
                            module={moduleName}
                            mutation={{
                                delete: deleteMedicine,
                                update: updateManyMedicine,
                            }}
                            query={{
                                list: getMedicineList,
                                read: getMedicineByQuery,
                                refetch: MEDICINE_LIST,
                            }}
                            title={title}
                            handleData={handleMedicineData}
                            handleReadData={handleReadData}
                            handleRecord={handleRecord!}
                            handleResetAction={handleResetAction!}
                            handleShowCreate={handleShowCreate!}
                        />
                    ) : (
                        <MasterMedicineForm
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
