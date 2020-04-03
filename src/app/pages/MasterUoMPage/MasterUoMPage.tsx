import React from 'react';

import { Breadcrumb } from 'src/shared/components/Breadcrumb';
import { Card } from 'src/shared/components/Card';
import { Capitalized } from 'src/shared/utilities/capitalized';

import { UoMFormSection } from './containers/UoMForm/UoMFormSection';
import { UoMListSection } from './containers/UoMList/UoMListSection';

export const MasterUoMPage = () => {
    let [recordKey, setRecordKey] = React.useState('');
    let [activeSection, setActiveSection] = React.useState({ action: 'list', section: 'user' });

    function handleRecord(recordKey: string) {
        handleSection({ action: 'update', section: activeSection.section });
        setRecordKey(recordKey);
    }

    function handleSection({ action, section }: { action: string; section: string }) {
        setActiveSection({ action, section });
    }

    function renderSection() {
        switch (activeSection.action) {
            case 'list':
                return <UoMListSection setRecord={handleRecord} setSection={handleSection} />;
            case 'create':
                return (
                    <UoMFormSection formType={activeSection.action} setSection={handleSection} />
                );
            case 'update':
                return (
                    <UoMFormSection
                        formType={activeSection.action}
                        recordKey={recordKey}
                        setSection={handleSection}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <div className='d-flex fj-center m-4'>
            <Card>
                <Breadcrumb>
                    <Breadcrumb.Item>Master</Breadcrumb.Item>
                    <Breadcrumb.Item href='/uom'>UoM</Breadcrumb.Item>
                    {activeSection.action !== 'back' && (
                        <Breadcrumb.Item>{Capitalized(activeSection.action)}</Breadcrumb.Item>
                    )}
                </Breadcrumb>
                {renderSection()}
            </Card>
        </div>
    );
};
