import React from 'react';

import { Action } from 'src/core/api';
import { updateCrud, useCrud } from 'src/core/graphql/crud';

import { MasterContentHeader } from 'src/modules/Master/components/MasterContentHeader';

import { Card } from 'src/shared/components/Card';
import { Crud } from 'src/shared/components/Crud';

import { MasterVariantForm } from './MasterVariantForm';
import { MasterVariantList } from './MasterVariantList';

export const MasterVariantPage = () => {
    let [recordKey, setRecordKey] = React.useState('');
    let crud = useCrud();
    let [fetch, { loading }] = updateCrud();
    if (loading) return null;

    function handleFetch(action: Action) {
        fetch({
            variables: { payload: { ...crud, action } },
        });
    }

    function handleRecord(recordKey: string) {
        handleFetch('update');
        setRecordKey(recordKey);
    }

    function handleResetAction() {
        handleFetch('list');
    }

    function renderCrud() {
        return crud.action === 'list' ? (
            <MasterVariantList
                action={crud.action}
                handleRecord={handleRecord}
                handleResetAction={handleResetAction}
            />
        ) : (
            <MasterVariantForm formType={crud.action} recordKey={recordKey} />
        );
    }

    return (
        <div className='d-flex fj-center m-4'>
            <Card>
                <MasterContentHeader crud={{ ...crud }} title='Variant' to='/variant' />
                <Crud>{renderCrud()}</Crud>
            </Card>
        </div>
    );
};
