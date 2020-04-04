import * as React from 'react';

import { ActionButton } from 'src/app/pages/SettingPage/components/ActionButton';

import { Alert } from 'src/shared/components/Alert';
import { Divider } from 'src/shared/components/Divider';

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
                <ActionButton
                    action='list'
                    buttonType='default'
                    iconType='left'
                    section='user'
                    setSection={setSection}
                    title='Back'
                />
            </div>
            <Divider orientation='left'> Supplier Form </Divider>
            <Alert
                message='Please fill these required fields below to create or update supplier data, you can also skip
                the non required fields.'
                type='info'
                showIcon={true}
            />
            <SupplierForm formType={formType} recordKey={recordKey} />
        </>
    )
);
