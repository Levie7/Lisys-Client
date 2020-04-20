import * as React from 'react';

// import { ActionButton } from 'src/app/pages/SettingPage/components/ActionButton';

import { Alert } from 'src/shared/components/Alert';
import { Divider } from 'src/shared/components/Divider';

import { CategoryForm } from './CategoryForm';
import { alertMessage } from './constants';

interface CategoryFormSectionProps {
    formType: string;
    recordKey?: string;

    setSection: ({ action, section }: { action: string; section: string }) => void;
}

export const CategoryFormSection = React.memo(
    ({ formType, recordKey, setSection }: CategoryFormSectionProps) => (
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
            <Divider orientation='left'> Category Form </Divider>
            <Alert message={alertMessage} type='info' showIcon />
            <CategoryForm formType={formType} recordKey={recordKey} />
        </>
    )
);
