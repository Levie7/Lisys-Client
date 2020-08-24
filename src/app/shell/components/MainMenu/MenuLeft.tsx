import { Layout } from 'antd';
import * as React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { Picture } from 'src/shared/components/Picture';

import { logo } from './constants';
import { Menu, MenuTheme } from './Menu';

interface MenuLeftProps {
    auth: string | null;
    isMobile: boolean;
    theme?: MenuTheme;
}
interface MenuLeftState {
    onCollapsed: boolean;
}

require('./MenuLeft.sass');

export class MenuLeft extends React.PureComponent<MenuLeftProps, MenuLeftState> {
    constructor(props: MenuLeftProps) {
        super(props);

        this.state = { onCollapsed: false };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse(type: any) {
        let { onCollapsed } = this.state;

        if (type === 'responsive' && onCollapsed) {
            return;
        }

        this.setState({ onCollapsed: !onCollapsed });
    }

    render() {
        let { auth, isMobile, theme } = this.props;
        let { onCollapsed } = this.state;

        let paramsMobile = {
            collapsed: false,
            collapsible: false,
            onCollapse: this.toggleCollapse,
            width: 256,
        };
        let paramsDesktop = {
            breakpoint: 'lg',
            collapsed: onCollapsed,
            collapsible: true,
            onCollapse: this.toggleCollapse,
            width: 256,
        };
        let params = isMobile ? paramsMobile : paramsDesktop;
        let pictureTheme: MenuTheme = 'dark';
        let pictureClassName = 'bg-white';

        if (theme === 'dark') {
            pictureTheme = 'light';
            pictureClassName = 'bg-primary';
        }

        return (
            <Layout.Sider {...params} className='MenuLeft'>
                {!onCollapsed && (
                    <div className='MenuLeft_Logo d-flex fa-center fj-center'>
                        <Picture
                            alt={logo[pictureTheme].alt}
                            className={pictureClassName}
                            height='46px'
                            src={logo[pictureTheme].url}
                            title={logo[pictureTheme].title}
                        />
                    </div>
                )}
                <Scrollbars
                    autoHide
                    style={{ height: isMobile ? 'calc(100vh - 64px)' : 'calc(100vh - 112px)' }}
                >
                    <Menu auth={auth} className='MenuLeft_Navigation' mode='inline' theme={theme} />
                </Scrollbars>
            </Layout.Sider>
        );
    }
}
