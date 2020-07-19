import React from 'react';

import { Page } from 'src/app/shell/Page';

import { Card } from 'src/shared/components/Card';
import { useUIContext } from 'src/shared/contexts/UIContext';

import { SettingTabs } from './components/SettingTabs';
import { getLanguage } from './helpers';

require('./SettingPage.sass');

export default function SettingPage() {
    let isMobile = useUIContext().isMobile;
    let lang = getLanguage();

    return (
        <Page>
            <div className='d-flex fj-center m-4'>
                <Card className='SettingCard'>
                    <SettingTabs lang={lang} position={isMobile ? 'top' : 'left'} />
                </Card>
            </div>
        </Page>
    );
}
