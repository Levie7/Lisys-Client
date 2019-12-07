import { Layout } from 'antd';
import * as React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { Picture } from 'src/shared/components/Picture';

import { logo } from './constants';
import { Menu } from './Menu';

interface MenuLeftProps {
    isMobile: boolean;
}

interface MenuLeftState {
    onCollapsed: boolean;
}

require('./MenuLeft.sass');
export class MenuLeft extends React.Component<MenuLeftProps, MenuLeftState> {
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
        let { isMobile } = this.props;
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

        return (
            <Layout.Sider {...params} className='MenuLeft'>
                {!onCollapsed && (
                    <div className='MenuLeft_Logo d-flex fa-center fj-center'>
                        <Picture
                            alt={logo.light.alt}
                            className='bg-primary'
                            height='46px'
                            src={logo.light.url}
                            title={logo.light.title}
                        />
                    </div>
                )}
                <Scrollbars
                    autoHide
                    style={{ height: isMobile ? 'calc(100vh - 64px)' : 'calc(100vh - 112px)' }}
                >
                    <Menu className='MenuLeft_Navigation' mode='inline' theme='dark' />
                </Scrollbars>
            </Layout.Sider>
        );
    }
}
