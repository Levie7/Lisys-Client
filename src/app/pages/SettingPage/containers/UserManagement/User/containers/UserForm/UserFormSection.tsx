import * as React from 'react';

import { ActionButton } from 'src/app/pages/SettingPage/components/ActionButton';

import { Divider } from 'src/shared/components/Divider';

import { UserForm } from './UserForm';

interface UserFormSectionProps {
    formType: string;
    recordKey?: string;

    setSection: ({ action, section }: { action: string; section: string }) => void;
}

export const UserFormSection = React.memo(
    ({ formType, recordKey, setSection }: UserFormSectionProps) => (
        <>
            <Divider />
            <div className='d-flex fj-between mb-4'>
                <ActionButton
                    action='list'
                    buttonType='default'
                    iconType='left'
                    section='user'
                    setSection={setSection}
                    title='Back'
                />
            </div>
            <Divider orientation='left'> User Form </Divider>
            <UserForm formType={formType} recordKey={recordKey} />
        </>
    )
);
