import * as React from 'react';

import { SettingContentHeader } from 'src/app/pages/SettingPage/components/SettingContentHeader';

import { updateCrud, useCrud } from 'src/core/graphql/crud';

import { Crud } from 'src/shared/components/Crud';
import { handleFetchCrud } from 'src/shared/components/Crud/helpers';

import { initialize } from './helpers';
import { RoleForm, RoleList } from './Role';
import { UserForm, UserList } from './User';
import { UserManagementForm } from './UserManagementForm';

export function UserManagement() {
    let [init, setInit] = React.useState(false);
    let [recordKey, setRecordKey] = React.useState('');
    let crud = useCrud();
    let [fetch] = updateCrud();

    !init && setInit(initialize(init, fetch, 'main'));

    function handleRecord(recordKey: string) {
        handleFetchCrud({ ...crud, action: 'update', fetch });
        setRecordKey(recordKey);
    }

    function renderCrud() {
        return crud.action === 'list' ? renderList() : renderForm();
    }

    function renderForm() {
        switch (crud.section) {
            case 'role':
                return <RoleForm formType={crud.action} recordKey={recordKey} />;
            case 'user':
                return <UserForm formType={crud.action} recordKey={recordKey} />;
            default:
                return null;
        }
    }

    function renderList() {
        switch (crud.section) {
            case 'role':
                return <RoleList handleRecord={handleRecord} />;
            case 'user':
                return <UserList handleRecord={handleRecord} />;
            default:
                return null;
        }
    }

    return (
        <>
            <SettingContentHeader crud={{ ...crud }} title='User Management' />
            {crud.section === 'main' ? (
                <UserManagementForm crud={crud} />
            ) : (
                <Crud showBack>{renderCrud()}</Crud>
            )}
        </>
    );
}
