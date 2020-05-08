import React from 'react';

import { Card } from 'src/shared/components/Card';
import { useUIContext } from 'src/shared/contexts/UIContext';

import { SettingTabs } from './components/SettingTabs';

export default function SettingPage() {
    let isMobile = useUIContext().isMobile;

    return (
        <div className='d-flex fj-center m-4'>
            <Card>
                <SettingTabs position={isMobile ? 'top' : 'left'} />
            </Card>
        </div>
    );
}
