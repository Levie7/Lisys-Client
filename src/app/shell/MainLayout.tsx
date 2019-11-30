import { Layout } from 'antd';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import React from 'react';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { MainMenu } from './components/MainMenu/MainMenu';
import { UIContext } from 'src/shared/contexts/UIContext';

export interface MainLayoutProps {}

export interface MainLayoutState {
    isMobile: boolean;
}

export class MainLayout extends React.Component<MainLayoutProps, MainLayoutState> {
    enquireHandler: any;

    constructor(props: MainLayoutProps) {
        super(props);
        this.state = { isMobile: false };
    }

    componentDidMount() {
        this.enquireHandler = enquireScreen((mobile: any) => {
            this.setState({ isMobile: mobile });
        });
    }

    componentWillUnmount() {
        unenquireScreen(this.enquireHandler);
    }

    render() {
        let UI = { isMobile: !!this.state.isMobile! };

        return (
            <UIContext.Provider value={UI}>
                <Layout>
                    <MainMenu />
                    <Layout>
                        <Layout.Header>
                            <Header />
                        </Layout.Header>
                        <Layout.Content>{this.props.children}</Layout.Content>
                        <Layout.Footer>
                            <Footer />
                        </Layout.Footer>
                    </Layout>
                </Layout>
            </UIContext.Provider>
        );
    }
}
