import React from 'react';

import { Page } from 'src/app/shell/Page';

import { Notification } from 'src/shared/utilities/notification';

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
            <div className='HomePage' style={{ margin: '24px 16px 0' }}>
                <header className='HomePage-header'>Home Page</header>
            </div>
        </Page>
    );
};
