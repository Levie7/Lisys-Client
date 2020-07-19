import React from 'react';

import { Page } from 'src/app/shell/Page';

import { Notification } from 'src/shared/utilities/notification';

import { getLanguage } from '../SettingPage/helpers';
import { MasterStatistic } from './containers/MasterStatistic';
import { PurchasingGraph, SalesGraph } from './containers/DashboardGraph';
import { notification } from './constants';

export const HomePage = () => {
    let lang = getLanguage();
    let gretting = localStorage.getItem('greeting');
    if (gretting !== 'greet') {
        Notification({
            description: notification.description[lang],
            title: notification.title[lang],
            type: 'login',
        });
        localStorage.setItem('greeting', 'greet');
    }

    return (
        <Page>
            <MasterStatistic lang={lang} />
            <SalesGraph lang={lang} />
            <PurchasingGraph lang={lang} />
        </Page>
    );
};
