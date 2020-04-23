import React from 'react';

import { Action } from 'src/core/api';
import { updateCrud, useCrud } from 'src/core/graphql/crud';

import { MasterContentHeader } from 'src/modules/Master/components/MasterContentHeader';
import { initialize } from 'src/modules/Master/helpers';

import { Card } from 'src/shared/components/Card';
import { Crud } from 'src/shared/components/Crud';

import { MasterCategoryForm } from './MasterCategoryForm';
import { MasterCategoryList } from './MasterCategoryList';

export const MasterCategoryPage = () => {
    let [init, setInit] = React.useState(false);
    let [recordKey, setRecordKey] = React.useState('');
    let crud = useCrud();
    let [fetch, { loading }] = updateCrud();
    if (loading) return null;

    !init && setInit(initialize(init, fetch, 'category'));

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
        return ['list', 'active', 'inactive'].includes(crud.action) ? (
            <MasterCategoryList
                action={crud.action}
                handleRecord={handleRecord}
                handleResetAction={handleResetAction}
            />
        ) : (
            <MasterCategoryForm formType={crud.action} recordKey={recordKey} />
        );
    }

    return (
        <div className='d-flex fj-center m-4'>
            <Card>
                <MasterContentHeader crud={{ ...crud }} title='Category' to='/category' />
                <Crud showAction>{renderCrud()}</Crud>
            </Card>
        </div>
    );
};
