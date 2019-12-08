import React from 'react';

import { Route, Switch } from 'src/core/route';

import { HomePage } from './pages/HomePage/chunk';
import { SettingPage } from './pages/SettingPage/chunk';

export const Routes: React.FC<{ isAuth: boolean }> = ({ isAuth }) => (
    <Switch>
        <Route component={HomePage} exact={true} path='/' />
        <Route component={SettingPage} exact={true} path='/settings' />
    </Switch>
);
