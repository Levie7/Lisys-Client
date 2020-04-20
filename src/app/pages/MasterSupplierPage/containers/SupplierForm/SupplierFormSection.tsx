import * as React from 'react';

// import { ActionButton } from 'src/app/pages/SettingPage/components/ActionButton';

import { Alert } from 'src/shared/components/Alert';
import { Divider } from 'src/shared/components/Divider';

import { alertMessage } from './constants';
import { SupplierForm } from './SupplierForm';

interface SupplierFormSectionProps {
    formType: string;
    recordKey?: string;

    setSection: ({ action, section }: { action: string; section: string }) => void;
}

export const SupplierFormSection = React.memo(
    ({ formType, recordKey, setSection }: SupplierFormSectionProps) => (
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
            <Divider orientation='left'> Supplier Form </Divider>
            <Alert message={alertMessage} type='info' showIcon />
            <SupplierForm formType={formType} recordKey={recordKey} />
        </>
    )
);
