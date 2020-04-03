import React from 'react';

import { Route, Switch } from 'src/core/route';

import { HomePage } from './pages/HomePage/chunk';
import { MasterCategoryPage } from './pages/MasterCategoryPage/chunk';
import { MasterMedicinePage } from './pages/MasterMedicinePage/chunk';
import { MasterSupplierPage } from './pages/MasterSupplierPage/chunk';
import { MasterUoMPage } from './pages/MasterUoMPage/chunk';
import { MasterVariantPage } from './pages/MasterVariantPage/chunk';
import { SettingPage } from './pages/SettingPage/chunk';

export const Routes: React.FC<{ isAuth: boolean }> = ({ isAuth }) => (
    <Switch>
        <Route component={HomePage} exact={true} path='/' />
        <Route component={SettingPage} exact={true} path='/settings' />

        <Route component={MasterMedicinePage} exact={true} path='/medicine' />
        <Route component={MasterUoMPage} exact={true} path='/uom' />
        <Route component={MasterCategoryPage} exact={true} path='/category' />
        <Route component={MasterVariantPage} exact={true} path='/variant' />
        <Route component={MasterSupplierPage} exact={true} path='/supplier' />
    </Switch>
);
