import * as React from 'react';

import { ActionButton } from 'src/app/pages/SettingPage/components/ActionButton';

import { Divider } from 'src/shared/components/Divider';

import { RoleForm } from './RoleForm';

interface RoleFormSectionProps {
    formType: string;
    recordKey?: string;

    setSection: ({ action, section }: { action: string; section: string }) => void;
}

export const RoleFormSection = React.memo(
    ({ formType, recordKey, setSection }: RoleFormSectionProps) => (
        <>
            <Divider />
            <div className='d-flex fj-between mb-4'>
                <ActionButton
                    action='list'
                    buttonType='default'
                    iconType='back'
                    section='role'
                    setSection={setSection}
                    title='Back'
                />
            </div>
            <Divider orientation='left'> Role Form </Divider>
            <RoleForm formType={formType} recordKey={recordKey} />
        </>
    )
);
