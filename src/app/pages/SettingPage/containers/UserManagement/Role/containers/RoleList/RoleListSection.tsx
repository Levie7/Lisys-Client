import * as React from 'react';

import { ActionButton } from 'src/app/pages/SettingPage/components/ActionButton';

import { Divider } from 'src/shared/components/Divider';

import { RoleList } from './RoleList';

interface RoleListSectionProps {
    setRecord: (recordKey: string) => void;
    setSection: ({ action, section }: { action: string; section: string }) => void;
}

export const RoleListSection = React.memo<RoleListSectionProps>(({ setRecord, setSection }) => {
    function handleRecord(recordKey: string) {
        setRecord(recordKey);
    }

    function handleSection({ action, section }: { action: string; section: string }) {
        setSection({ action, section });
    }

    return (
        <>
            <Divider />
            <div className='d-flex fj-between mb-4'>
                <ActionButton
                    action='back'
                    buttonType='default'
                    iconType='back'
                    section='main'
                    setSection={handleSection}
                    title='Back'
                />
                <ActionButton
                    action='create'
                    buttonType='primary'
                    iconType='plus'
                    section='role'
                    setSection={handleSection}
                    title='Create'
                />
            </div>
            <RoleList handleRecord={handleRecord} />
        </>
    );
});
