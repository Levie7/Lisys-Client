import * as React from 'react';

// import { ActionButton } from 'src/app/pages/SettingPage/components/ActionButton';

import { Alert } from 'src/shared/components/Alert';
import { Divider } from 'src/shared/components/Divider';

import { alertMessage } from './constant';
import { UoMForm } from './UoMForm';

interface UoMFormSectionProps {
    formType: string;
    recordKey?: string;

    setSection: ({ action, section }: { action: string; section: string }) => void;
}

export const UoMFormSection = React.memo(
    ({ formType, recordKey, setSection }: UoMFormSectionProps) => (
        <>
            <Divider />
            <div className='d-flex fj-between mb-4'>
                {/* <ActionButton
                    action='list'
                    buttonType='default'
                    iconType='left'
                    section='user'
                    setSection={setSection}
                    title='Back'
                /> */}
            </div>
            <Divider orientation='left'> UoM Form </Divider>
            <Alert message={alertMessage} type='info' showIcon />
            <UoMForm formType={formType} recordKey={recordKey} />
        </>
    )
);
