import { Layout } from 'antd';
import React from 'react';

import { createAuthTokenStorage, exitSession } from 'src/core/graphql/auth';
import { useHistory } from 'src/core/route';

import { getLanguage } from '../pages/SettingPage/helpers';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { MainMenu } from './components/MainMenu/MainMenu';
import { MenuTheme } from './components/MainMenu/Menu';

interface PageProps {
    children: React.ReactNode;
}

export function Page({ children }: PageProps) {
    let storage = createAuthTokenStorage();
    let [theme, setTheme] = React.useState<MenuTheme>(localStorage.getItem('theme') as MenuTheme);

    let lang = getLanguage();
    let { replace } = useHistory();

    function handleLogout() {
        exitSession();
        replace('/login');
    }

    function handleTheme(value: boolean) {
        setTheme(value ? 'dark' : 'light');
        localStorage.setItem('theme', value ? 'dark' : 'light');
    }

    return (
        <Layout>
            <MainMenu auth={storage.getToken()} isMenuTop theme={theme} />
            <Layout>
                <Layout.Header>
                    <Header
                        auth={storage.getToken()}
                        handleTheme={handleTheme}
                        lang={lang}
                        logout={handleLogout}
                        theme={theme}
                    />
                </Layout.Header>
                <Layout.Content>{children}</Layout.Content>
                <Layout.Footer>
                    <Footer />
                </Layout.Footer>
            </Layout>
        </Layout>
    );
}
