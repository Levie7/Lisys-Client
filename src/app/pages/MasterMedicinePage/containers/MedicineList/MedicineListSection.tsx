import * as React from 'react';

import { ActionButton } from 'src/app/pages/SettingPage/components/ActionButton';

import { Divider } from 'src/shared/components/Divider';

import { MedicineList } from './MedicineList';

interface MedicineListSectionProps {
    setRecord: (recordKey: string) => void;
    setSection: ({ action, section }: { action: string; section: string }) => void;
}

export const MedicineListSection = React.memo<MedicineListSectionProps>(
    ({ setRecord, setSection }) => {
        let [action, setAction] = React.useState('');

        function handleAction(action: string) {
            setAction(action);
        }

        function handleRecord(recordKey: string) {
            setRecord(recordKey);
        }

        function handleResetAction() {
            setAction('');
        }

        function handleSection({ action, section }: { action: string; section: string }) {
            setSection({ action, section });
        }

        return (
            <>
                <Divider />
                <div className='d-flex fj-end mb-4'>
                    <ActionButton
                        action='action'
                        buttonType='default'
                        className='mr-2'
                        iconType='action'
                        section='medicine'
                        setAction={handleAction}
                        setSection={handleSection}
                        title='Actions'
                    />
                    <ActionButton
                        action='create'
                        buttonType='primary'
                        iconType='plus'
                        section='medicine'
                        setSection={handleSection}
                        title='Create'
                    />
                </div>
                <MedicineList
                    action={action}
                    handleRecord={handleRecord}
                    resetAction={handleResetAction}
                />
            </>
        );
    }
);
