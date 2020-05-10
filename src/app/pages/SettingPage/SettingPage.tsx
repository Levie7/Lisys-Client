import React from 'react';

import { Page } from 'src/app/shell/Page';

import { Card } from 'src/shared/components/Card';
import { useUIContext } from 'src/shared/contexts/UIContext';

import { SettingTabs } from './components/SettingTabs';

export default function SettingPage() {
    let isMobile = useUIContext().isMobile;

    return (
        <Page>
            <div className='d-flex fj-center m-4'>
                <Card>
                    <SettingTabs position={isMobile ? 'top' : 'left'} />
                </Card>
            </div>
        </Page>
    );
}
