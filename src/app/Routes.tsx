import React from 'react';

import { Route, Router } from 'src/core/route';

import { BuyPriceHistoryPage } from './pages/BuyPriceHistoryPage/chunk';
import { HomePage } from './pages/HomePage/chunk';
import { MasterCategoryPage } from './pages/MasterCategoryPage/chunk';
import { MasterMedicinePage } from './pages/MasterMedicinePage/chunk';
import { MasterSupplierPage } from './pages/MasterSupplierPage/chunk';
import { MasterUoMPage } from './pages/MasterUoMPage/chunk';
import { MasterVariantPage } from './pages/MasterVariantPage/chunk';
import { PurchaseListPage } from './pages/PurchaseListPage/chunk';
import { PurchasePaymentPage } from './pages/PurchasePaymentPage/chunk';
import { PurchaseReturnPage } from './pages/PurchaseReturnPage/chunk';
import { SalesPage } from './pages/SalesPage/chunk';
import { SettingPage } from './pages/SettingPage/chunk';
import { StockOpnamePage } from './pages/StockOpnamePage/chunk';
import { LoginPage } from './pages/LoginPage/chunk';

export const Routes: React.FC<{ isAuth: boolean }> = ({ isAuth }) => (
    <Router authPath='/login' isAuth={isAuth}>
        <Route authenticate component={HomePage} exact={true} path='/' />

        <Route authenticate component={SettingPage} exact={true} path='/settings' />

        <Route authenticate component={MasterMedicinePage} exact={true} path='/medicine' />
        <Route authenticate component={MasterUoMPage} exact={true} path='/uom' />
        <Route authenticate component={MasterCategoryPage} exact={true} path='/category' />
        <Route authenticate component={MasterVariantPage} exact={true} path='/variant' />
        <Route authenticate component={MasterSupplierPage} exact={true} path='/supplier' />

        <Route authenticate component={StockOpnamePage} exact={true} path='/stock_opname' />

        <Route authenticate component={PurchaseListPage} exact={true} path='/purchase_list' />
        <Route
            authenticate
            component={BuyPriceHistoryPage}
            exact={true}
            path='/buy_price_history'
        />
        <Route authenticate component={PurchasePaymentPage} exact={true} path='/purchase_payment' />
        <Route authenticate component={PurchaseReturnPage} exact={true} path='/purchase_return' />

        <Route authenticate component={SalesPage} exact={true} path='/sales' />

        <Route component={LoginPage} exact={true} path='/login' />
    </Router>
);
