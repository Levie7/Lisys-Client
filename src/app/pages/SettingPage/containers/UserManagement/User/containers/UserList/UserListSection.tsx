import * as React from 'react';

import { ActionButton } from 'src/app/pages/SettingPage/components/ActionButton';

import { Divider } from 'src/shared/components/Divider';

import { UserList } from './UserList';

interface UserListSectionProps {
    setRecord: (recordKey: string) => void;
    setSection: ({ action, section }: { action: string; section: string }) => void;
}

export const UserListSection = React.memo<UserListSectionProps>(({ setRecord, setSection }) => {
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
                    iconType='left'
                    section='main'
                    setSection={handleSection}
                    title='Back'
                />
                <ActionButton
                    action='create'
                    buttonType='primary'
                    iconType='plus'
                    section='user'
                    setSection={handleSection}
                    title='Create'
                />
            </div>
            <UserList handleRecord={handleRecord} />
        </>
    );
});
