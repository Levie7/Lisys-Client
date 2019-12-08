import { Layout } from 'antd';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import React from 'react';

import { UIContext } from 'src/shared/contexts/UIContext';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { MainMenu } from './components/MainMenu/MainMenu';

interface MainLayoutState {
    isMobile: boolean;
}

export class MainLayout extends React.Component<{}, MainLayoutState> {
    enquireHandler: any;

    constructor(props: {}) {
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
        let { children } = this.props;
        let UI = { isMobile: !!this.state.isMobile! };

        return (
            <UIContext.Provider value={UI}>
                <Layout>
                    <MainMenu />
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
            </UIContext.Provider>
        );
    }
}
