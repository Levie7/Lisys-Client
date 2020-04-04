import * as React from 'react';

import { ActionButton } from 'src/app/pages/SettingPage/components/ActionButton';

import { Alert } from 'src/shared/components/Alert';
import { Divider } from 'src/shared/components/Divider';

import { CategoryForm } from './CategoryForm';

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
                <ActionButton
                    action='list'
                    buttonType='default'
                    iconType='left'
                    section='user'
                    setSection={setSection}
                    title='Back'
                />
            </div>
            <Divider orientation='left'> Category Form </Divider>
            <Alert
                message='Please fill these required fields below to create or update category data, you can also skip
                the non required fields.'
                type='info'
                showIcon={true}
            />
            <CategoryForm formType={formType} recordKey={recordKey} />
        </>
    )
);
