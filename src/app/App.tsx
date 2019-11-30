import React from 'react';
import { ConfigProvider } from 'antd';
import enGB from 'antd/lib/locale-provider/en_GB';

import { createClient, GraphqlProvider } from 'src/core/graphql';
import { createAuthLink, createAuthTokenStorage, useAuth } from 'src/core/graphql/auth';
import { createLogger } from 'src/core/log';

import { ErrorBoundary } from './shell/ErrorBoundary';
import { MainLayout } from './shell/MainLayout';
import { createConfig } from './config';
import { Routes } from './Routes';

const config = createConfig();
const authTokenStorage = createAuthTokenStorage();
const authLink = createAuthLink({ storage: authTokenStorage });
const graphqlClient = createClient({ serverUri: config.graphqlServerUri, links: [authLink] });
const logger = createLogger({ environment: config.environment, dsn: config.loggerDsn });

const MainErrorOverlay = () => <h1>Something went wrong.</h1>;

export const App = () => {
    const { isAuth } = useAuth();

    return (
        <ErrorBoundary onError={logger.error} renderOnError={MainErrorOverlay}>
            <GraphqlProvider client={graphqlClient}>
                <ConfigProvider locale={enGB}>
                    <MainLayout>
                        <Routes isAuth={isAuth} />
                    </MainLayout>
                </ConfigProvider>
            </GraphqlProvider>
        </ErrorBoundary>
    );
};
