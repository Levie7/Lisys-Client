import { Layout } from 'antd';
import * as React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { Picture } from 'src/shared/components/Picture';

import { logo } from './constants';
import { Menu } from './Menu';

interface MenuLeftProps {
    isMobile: boolean;
}

require('./MenuLeft.sass');

export const MenuLeft = React.memo<MenuLeftProps>(({ isMobile }) => {
    const [onCollapsed, setCollapsed] = React.useState(false);

    function toggleCollapse(type: any) {
        if (type === 'responsive' && onCollapsed) {
            return;
        }

        setCollapsed(!onCollapsed);
    }

    let paramsMobile = {
        collapsed: false,
        collapsible: false,
        onCollapse: toggleCollapse,
        width: 256,
    };
    let paramsDesktop = {
        breakpoint: 'lg',
        collapsed: onCollapsed,
        collapsible: true,
        onCollapse: toggleCollapse,
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
});
