import * as React from 'react';

import { CompanyForm } from '../containers/CompanyForm';
import { GeneralForm } from '../containers/GeneralForm';
import { UserManagement } from '../containers/UserManagement';
import { SettingContentHeader } from './SettingContentHeader';

interface SettingContentProps {
    category: string;
    isDefault: boolean;
    title: string;
}

export const SettingContent = React.memo<SettingContentProps>(({ category, isDefault, title }) => {
    function renderDefaultForm(category: string) {
        switch (category) {
            case 'company':
                return <CompanyForm />;
            case 'general':
                return <GeneralForm />;
            default:
                return null;
        }
    }

    return (
        <div id='SettingContent'>
            {isDefault ? (
                <>
                    <SettingContentHeader title={title} />
                    {renderDefaultForm(category)}
                </>
            ) : (
                <UserManagement />
            )}
        </div>
    );
});
