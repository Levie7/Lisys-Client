import React from 'react';

import { Page } from 'src/app/shell/Page';

import { Notification } from 'src/shared/utilities/notification';
import { MasterStatistic } from './containers/MasterStatistic';
import { SalesGraph } from './containers/SalesGraph';

export const HomePage = () => {
    let gretting = localStorage.getItem('greeting');
    if (gretting !== 'greet') {
        Notification({
            description: 'You have successfully logged in to Lisys!',
            title: 'Welcome',
            type: 'login',
        });
        localStorage.setItem('greeting', 'greet');
    }

    return (
        <Page>
            <MasterStatistic />
            <SalesGraph />
        </Page>
    );
};
