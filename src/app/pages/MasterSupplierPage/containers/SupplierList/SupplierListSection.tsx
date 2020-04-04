import * as React from 'react';

import { ActionButton } from 'src/app/pages/SettingPage/components/ActionButton';

import { Divider } from 'src/shared/components/Divider';

import { SupplierList } from './SupplierList';

interface SupplierListSectionProps {
    setRecord: (recordKey: string) => void;
    setSection: ({ action, section }: { action: string; section: string }) => void;
}

export const SupplierListSection = React.memo<SupplierListSectionProps>(
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
                        section='supplier'
                        setAction={handleAction}
                        setSection={handleSection}
                        title='Actions'
                    />
                    <ActionButton
                        action='create'
                        buttonType='primary'
                        iconType='plus'
                        section='supplier'
                        setSection={handleSection}
                        title='Create'
                    />
                </div>
                <SupplierList
                    action={action}
                    handleRecord={handleRecord}
                    resetAction={handleResetAction}
                />
            </>
        );
    }
);
