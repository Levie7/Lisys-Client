import { Layout } from 'antd';
import React from 'react';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { MainMenu } from './components/MainMenu/MainMenu';

interface PageProps {
    children: React.ReactNode;
}

export function Page({ children }: PageProps) {
    return (
        <Layout>
            <MainMenu isMenuTop />
            <Layout>
                <Layout.Header>
                    <Header />
                </Layout.Header>
                <Layout.Content>{children}</Layout.Content>
                <Layout.Footer>
                    <Footer />
                </Layout.Footer>
            </Layout>
        </Layout>
    );
}
