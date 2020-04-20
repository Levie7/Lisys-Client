import * as React from 'react';
import { Form } from 'antd';

import { ButtonAction } from 'src/shared/components/Button';
import { CrudConnectedProps } from 'src/shared/components/Crud';
import { Info } from 'src/shared/components/Info';
import { Spin } from 'src/shared/components/Spin';
import { queryForm } from 'src/shared/graphql/queryForm';

import { userManagementForm } from './constants';
import { getTotalActive } from './schema.gql';

type totalActive = 'role' | 'user';

interface UserManagementFormProps extends CrudConnectedProps {}

export function UserManagementForm({ crud }: UserManagementFormProps) {
    let query = queryForm({ query: getTotalActive });
    if (query.loading) return <Spin />;

    let totalActive = {
        role: query.data?.getTotalActiveRoles,
        user: query.data?.getTotalActiveUsers,
    };

    function renderFormItem() {
        return userManagementForm.map((userManagement) => (
            <Info
                description={userManagement.info.description}
                key={userManagement.section}
                title={userManagement.info.title}
            >
                {userManagement.label && (
                    <div className='fw-bold mb-2'>
                        {userManagement.label}{' '}
                        {userManagement.section &&
                            `(${totalActive[userManagement.section as totalActive]})`}
                    </div>
                )}
                <ButtonAction
                    buttonType='default'
                    crud={{ ...crud, action: 'list', section: userManagement.section }}
                    iconType={userManagement.button.icon}
                    title={userManagement.button.title}
                />
            </Info>
        ));
    }

    return <Form>{renderFormItem()}</Form>;
}
