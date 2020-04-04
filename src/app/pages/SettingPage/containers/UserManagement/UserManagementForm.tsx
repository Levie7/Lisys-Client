import * as React from 'react';
import { Form } from 'antd';

import { ActionButton } from 'src/app/pages/SettingPage/components/ActionButton';

import { Info } from 'src/shared/components/Info';
import { Spin } from 'src/shared/components/Spin';
import { ErrorHandler } from 'src/shared/utilities/errors';

import { userManagementInfo } from './constants';
import { getTotalActive } from './schema.gql';

interface UserManagementFormProps {
    setSection: ({ action, section }: { action: string; section: string }) => void;
}

export function UserManagementForm({ setSection }: UserManagementFormProps) {
    let [form] = Form.useForm();

    let query = handleQuery();
    if (query.loading) return <Spin />;

    let totalActive = {
        roles: query.data?.getTotalActiveRoles,
        users: query.data?.getTotalActiveUsers,
    };

    function handleQuery() {
        let { data, loading } = getTotalActive({
            onError(error: any) {
                ErrorHandler(error);
            },
        });

        return {
            data,
            loading,
        };
    }

    return (
        <Form form={form}>
            <Info
                description={userManagementInfo.role.description}
                title={userManagementInfo.role.title}
            >
                <div className='fw-bold mb-2'>Active Role ({totalActive.roles})</div>
                <ActionButton
                    action='list'
                    buttonType='default'
                    section='role'
                    title='Add or Modify Role'
                    setSection={setSection}
                />
            </Info>
            <Info
                description={userManagementInfo.permission.description}
                title={userManagementInfo.permission.title}
            >
                <ActionButton
                    action='list'
                    buttonType='default'
                    iconType='lock'
                    section='permission'
                    title='Set Permission'
                    setSection={setSection}
                />
            </Info>
            <Info
                description={userManagementInfo.user.description}
                title={userManagementInfo.user.title}
            >
                <div className='fw-bold mb-2'>Active User ({totalActive.users})</div>
                <ActionButton
                    action='list'
                    buttonType='default'
                    section='user'
                    title='Add or Modify User'
                    setSection={setSection}
                />
            </Info>
        </Form>
    );
}
