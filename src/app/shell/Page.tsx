import { Layout } from 'antd';
import React from 'react';

import { createAuthTokenStorage, exitSession } from 'src/core/graphql/auth';
import { useHistory } from 'src/core/route';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { MainMenu } from './components/MainMenu/MainMenu';

interface PageProps {
    children: React.ReactNode;
}

export function Page({ children }: PageProps) {
    let storage = createAuthTokenStorage();
    let { replace } = useHistory();

    function handleLogout() {
        exitSession();
        replace('/login');
    }

    return (
        <Layout>
            <MainMenu auth={storage.getToken()} isMenuTop />
            <Layout>
                <Layout.Header>
                    <Header auth={storage.getToken()} logout={handleLogout} />
                </Layout.Header>
                <Layout.Content>{children}</Layout.Content>
                <Layout.Footer>
                    <Footer />
                </Layout.Footer>
            </Layout>
        </Layout>
    );
}
