import React from 'react';

import { Card } from 'src/shared/components/Card';
import { UIContext } from 'src/shared/contexts/UIContext';

import { SettingTabs } from './components/SettingTabs';

export default function SettingPage() {
    return (
        <div className='d-flex fj-center m-4'>
            <Card>
                <UIContext.Consumer>
                    {({ isMobile }) => <SettingTabs position={isMobile ? 'top' : 'left'} />}
                </UIContext.Consumer>
            </Card>
        </div>
    );
}
