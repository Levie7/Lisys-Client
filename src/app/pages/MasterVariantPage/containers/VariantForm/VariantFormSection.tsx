import * as React from 'react';

import { ActionButton } from 'src/app/pages/SettingPage/components/ActionButton';

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
            <VariantForm formType={formType} recordKey={recordKey} />
        </>
    )
);
