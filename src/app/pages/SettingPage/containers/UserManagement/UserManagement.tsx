import * as React from 'react';

import { Breadcrumb } from 'src/shared/components/Breadcrumb';
import { Capitalized } from 'src/shared/utilities/capitalized';

import { Role } from './Role';
import { User } from './User';
import { UserManagementForm } from './UserManagementForm';

export const UserManagement = React.memo(() => {
    let [activeSection, setActiveSection] = React.useState({ action: 'list', section: 'role' });

    function handleSection({ action, section }: { action: string; section: string }) {
        setActiveSection({ action, section });
    }

    function renderContent() {
        switch (activeSection.section) {
            case 'role':
                return (
                    <Role
                        action={activeSection.action}
                        section={activeSection.section}
                        setSection={handleSection}
                    />
                );
            case 'main':
                return <UserManagementForm setSection={handleSection} />;
            case 'user':
                return (
                    <User
                        action={activeSection.action}
                        section={activeSection.section}
                        setSection={handleSection}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href='/settings'>Settings</Breadcrumb.Item>
                <Breadcrumb.Item>User Management</Breadcrumb.Item>
                {activeSection.section !== 'main' && (
                    <Breadcrumb.Item>{Capitalized(activeSection.section)}</Breadcrumb.Item>
                )}
                {activeSection.action !== 'back' && (
                    <Breadcrumb.Item>{Capitalized(activeSection.action)}</Breadcrumb.Item>
                )}
            </Breadcrumb>
            {renderContent()}
        </>
    );
});
