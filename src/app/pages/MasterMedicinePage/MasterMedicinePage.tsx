import React from 'react';

import { Page } from 'src/app/shell/Page';

import { createAuthTokenStorage } from 'src/core/graphql/auth';

import { MasterCard } from 'src/shared/components/Master/containers/MasterCard';
import { MasterList } from 'src/shared/components/Master/containers/MasterList';
import { handleMedicineData } from 'src/shared/components/Master/helpers';
import {
    deleteMedicine,
    getMedicineList,
    MEDICINE_LIST,
    updateManyMedicine,
} from 'src/shared/graphql/Medicine/schema.gql';

import { medicineColumns } from './constants';
import { MasterMedicineForm } from './MasterMedicineForm';

export const MasterMedicinePage = () => {
    let storage = createAuthTokenStorage();

    return (
        <Page>
            <MasterCard
                header={{ link: '/medicine', title: 'Medicine' }}
                initSection='medicine'
                module='Master'
                showAction
            >
                {({ action, recordKey, handleRecord, handleResetAction }) =>
                    ['list', 'active', 'inactive'].includes(action) ? (
                        <MasterList
                            action={action}
                            auth={storage.getToken()}
                            columns={medicineColumns}
                            hasStatus
                            mutation={{
                                delete: deleteMedicine,
                                update: updateManyMedicine,
                            }}
                            query={{
                                list: getMedicineList,
                                refetch: MEDICINE_LIST,
                            }}
                            handleData={handleMedicineData}
                            handleRecord={handleRecord}
                            handleResetAction={handleResetAction}
                        />
                    ) : (
                        <MasterMedicineForm
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
