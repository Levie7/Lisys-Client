import React from 'react';

import { Router, Route } from 'src/core/route';

import { HomePage } from './pages/HomePage/chunk';

export const Routes: React.FC<{ isAuth: boolean }> = ({ isAuth }) => (
    <Router authPath='/login' isAuth={isAuth}>
        <Route path='/' component={HomePage} exact={true} />
    </Router>
);
