import React from 'react';
import { ConfigProvider } from 'antd';
import enGB from 'antd/lib/locale-provider/en_GB';

import { createClient, GraphqlProvider } from 'src/core/graphql';
import {
    createAuthModule,
    createAuthTokenStorage,
    useIsAuthenticated,
} from 'src/core/graphql/auth';
import { createCrudModule } from 'src/core/graphql/crud';
import { createLogger } from 'src/core/log';

import { queryForm } from 'src/shared/graphql';
import { getSettings } from 'src/shared/graphql/Setting/schema.gql';

import { createConfig } from './config';
import { Routes } from './Routes';
import { ErrorBoundary } from './shell/ErrorBoundary';
import { MainLayout } from './shell/MainLayout';

const config = createConfig();
const authTokenStorage = createAuthTokenStorage();
export const graphqlClient = createClient({
    serverUri: config.graphqlServerUri,
    modules: [createAuthModule({ storage: authTokenStorage }), createCrudModule()],
});
const logger = createLogger({ environment: config.environment, dsn: config.loggerDsn });
const MainErrorOverlay = () => <h1>Something went wrong.</h1>;

export const App = () => {
    return (
        <ErrorBoundary onError={logger.error} renderOnError={MainErrorOverlay}>
            <GraphqlProvider client={graphqlClient}>
                <ConfigProvider locale={enGB}>
                    <MainLayout>
                        <AppRoutes />
                    </MainLayout>
                </ConfigProvider>
            </GraphqlProvider>
        </ErrorBoundary>
    );
};

const AppRoutes = () => {
    const isAuthenticated = useIsAuthenticated();
    let query = queryForm({ query: getSettings, variables: { category: 'general' } });

    if (query.loading) return null;

    let setting = query.data?.getSettingsByCategory.find(
        (setting: any) => setting.type === 'language'
    );
    localStorage.setItem('language', setting.value);

    return <Routes isAuth={isAuthenticated} />;
};
