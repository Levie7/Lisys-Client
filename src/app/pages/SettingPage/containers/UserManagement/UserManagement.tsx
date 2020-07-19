import * as React from 'react';

import { SettingContentHeader } from 'src/app/pages/SettingPage/components/SettingContentHeader';

import { Lang } from 'src/core/api';
import { updateCrud, useCrud } from 'src/core/graphql/crud';

import { Crud } from 'src/shared/components/Crud';
import { handleFetchCrud } from 'src/shared/components/Crud/helpers';

import { initialize } from './helpers';
import { PermissionList } from './Permission';
import { RoleForm, RoleList } from './Role';
import { UserForm, UserList } from './User';
import { UserManagementForm } from './UserManagementForm';
import { userManagementTitle } from './constants';

export interface UserManagementProps extends Lang {}

export function UserManagement({ ...props }: UserManagementProps) {
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
                return <RoleForm {...props} formType={crud.action} recordKey={recordKey} />;
            case 'user':
                return <UserForm {...props} formType={crud.action} recordKey={recordKey} />;
            default:
                return null;
        }
    }

    function renderList() {
        switch (crud.section) {
            case 'role':
                return <RoleList {...props} handleRecord={handleRecord} />;
            case 'user':
                return <UserList {...props} handleRecord={handleRecord} />;
            case 'permission':
                return <PermissionList {...props} />;
            default:
                return null;
        }
    }

    let { lang } = { ...props };

    return (
        <>
            <SettingContentHeader crud={{ ...crud }} title={userManagementTitle[lang]} />
            {crud.section === 'main' ? (
                <UserManagementForm {...props} crud={crud} />
            ) : (
                <Crud showBack showCreate={crud.section !== 'permission'}>
                    {renderCrud()}
                </Crud>
            )}
        </>
    );
}
