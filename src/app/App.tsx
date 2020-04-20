import React from 'react';
import { ConfigProvider } from 'antd';
import enGB from 'antd/lib/locale-provider/en_GB';
import { createBrowserHistory } from 'history';

import { createClient, GraphqlProvider } from 'src/core/graphql';
import {
    createAuthModule,
    createAuthTokenStorage,
    useIsAuthenticated,
} from 'src/core/graphql/auth';
import { createLogger } from 'src/core/log';
import { Router } from 'src/core/route';

import { ErrorBoundary } from './shell/ErrorBoundary';
import { MainLayout } from './shell/MainLayout';
import { createConfig } from './config';
import { Routes } from './Routes';
import { createCrudModule } from 'src/core/graphql/crud';

const config = createConfig();
const authTokenStorage = createAuthTokenStorage();
const graphqlClient = createClient({
    serverUri: config.graphqlServerUri,
    modules: [createAuthModule({ storage: authTokenStorage }), createCrudModule()],
});
const logger = createLogger({ environment: config.environment, dsn: config.loggerDsn });
const MainErrorOverlay = () => <h1>Something went wrong.</h1>;

export const App = () => {
    const history = createBrowserHistory();

    return (
        <ErrorBoundary onError={logger.error} renderOnError={MainErrorOverlay}>
            <GraphqlProvider client={graphqlClient}>
                <ConfigProvider locale={enGB}>
                    <Router history={history}>
                        <MainLayout>
                            <AppRoutes />
                        </MainLayout>
                    </Router>
                </ConfigProvider>
            </GraphqlProvider>
        </ErrorBoundary>
    );
};

const AppRoutes = () => {
    const isAuthenticated = useIsAuthenticated();
    return <Routes isAuth={isAuthenticated} />;
};
