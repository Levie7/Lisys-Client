import * as React from 'react';

import { RoleFormSection } from './containers/RoleForm/RoleFormSection';
import { RoleListSection } from './containers/RoleList/RoleListSection';

interface RoleProps {
    action: string;
    section: string;

    setSection: ({ action, section }: { action: string; section: string }) => void;
}

export const Role = React.memo<RoleProps>(({ action, section, setSection }) => {
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
            return <RoleListSection setRecord={handleRecord} setSection={handleSection} />;
        case 'create':
            return <RoleFormSection formType={action} setSection={handleSection} />;
        case 'update':
            return (
                <RoleFormSection
                    formType={action}
                    recordKey={recordKey}
                    setSection={handleSection}
                />
            );
        default:
            return null;
    }
});
