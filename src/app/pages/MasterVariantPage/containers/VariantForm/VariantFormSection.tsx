import * as React from 'react';

import { ActionButton } from 'src/app/pages/SettingPage/components/ActionButton';

import { Alert } from 'src/shared/components/Alert';
import { Divider } from 'src/shared/components/Divider';

import { VariantForm } from './VariantForm';

interface VariantFormSectionProps {
    formType: string;
    recordKey?: string;

    setSection: ({ action, section }: { action: string; section: string }) => void;
}

export const VariantFormSection = React.memo(
    ({ formType, recordKey, setSection }: VariantFormSectionProps) => (
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
            <Divider orientation='left'> Variant Form </Divider>
            <Alert
                message='Please fill these required fields below to create or update variant data, you can also skip
                the non required fields.'
                type='info'
                showIcon={true}
            />
            <VariantForm formType={formType} recordKey={recordKey} />
        </>
    )
);
