import * as React from 'react';

import { Lang } from 'src/core/api';

import { CompanyForm } from '../containers/CompanyForm';
import { GeneralForm } from '../containers/GeneralForm';
import { UserManagement } from '../containers/UserManagement';
import { SettingContentHeader } from './SettingContentHeader';

export interface SettingContentProps extends Lang {
    category: string;
    isDefault: boolean;
    title: string;
}

export const SettingContent = React.memo<SettingContentProps>(
    ({ category, isDefault, title, ...props }) => {
        function renderDefaultForm(category: string) {
            switch (category) {
                case 'company':
                    return <CompanyForm {...props} />;
                case 'general':
                    return <GeneralForm {...props} />;
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
                    <UserManagement {...props} />
                )}
            </div>
        );
    }
);
