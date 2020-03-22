import * as React from 'react';

import { UserFormSection } from './containers/UserForm/UserFormSection';
import { UserListSection } from './containers/UserList/UserListSection';

interface UserProps {
    action: string;
    section: string;

    setSection: ({ action, section }: { action: string; section: string }) => void;
}

export const User = React.memo<UserProps>(({ action, section, setSection }) => {
    const [recordKey, setRecordKey] = React.useState('');

    function handleRecord(recordKey: string) {
        handleSection({ action: 'update', section });
        setRecordKey(recordKey);
    }

    function handleSection({ action, section }: { action: string; section: string }) {
        setSection({ action, section });
    }

    switch (action) {
        case 'list':
            return <UserListSection setRecord={handleRecord} setSection={handleSection} />;
        case 'create':
            return <UserFormSection formType={action} setSection={handleSection} />;
        case 'update':
            return (
                <UserFormSection
                    formType={action}
                    recordKey={recordKey}
                    setSection={handleSection}
                />
            );
        default:
            return null;
    }
});
