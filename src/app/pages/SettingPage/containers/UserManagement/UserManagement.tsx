import * as React from 'react';

import { SettingContentHeader } from 'src/app/pages/SettingPage/components/SettingContentHeader';

import { updateCrud, useCrud } from 'src/core/graphql/crud';

import { Crud } from 'src/shared/components/Crud';

import { RoleForm, RoleList } from './Role';
import { UserForm, UserList } from './User';
import { UserManagementForm } from './UserManagementForm';

export function UserManagement() {
    let [recordKey, setRecordKey] = React.useState('');
    let crud = useCrud();
    let [fetch, { loading }] = updateCrud();
    if (loading) return null;

    function handleRecord(recordKey: string) {
        fetch({
            variables: { payload: { ...crud, action: 'update' } },
        });
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
                <Crud>{renderCrud()}</Crud>
            )}
        </>
    );
}
