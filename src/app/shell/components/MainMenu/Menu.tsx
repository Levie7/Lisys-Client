import { Menu as AntMenu } from 'antd';
import * as React from 'react';

import { Menu as MenuAPI } from 'src/core/api';

import { Icon } from 'src/shared/components/Icon';
import { Link } from 'src/shared/components/Link';

import { menuData } from './constants';

interface MenuProps {
    className?: string;
    mode?: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';
    theme?: 'light' | 'dark';
}

export const Menu = React.memo<MenuProps>(({ className, mode, theme }) => {
    function generateMenu(menuItems: any) {
        return menuItems
            .filter((menu: MenuAPI) => menu.status === 'Active')
            .map((menu: MenuAPI) => (menu.children ? renderSubMenu(menu) : renderMenuItem(menu)));
    }

    function renderMenuItem(menu: MenuAPI) {
        return (
            <AntMenu.Item key={menu.key}>
                <Link to={menu.url}>
                    {Icon[menu.icon]}
                    <span>{menu.name}</span>
                </Link>
            </AntMenu.Item>
        );
    }

    function renderSubMenu(menu: MenuAPI) {
        let subMenuTitle = (
            <>
                {Icon[menu.icon]}
                <span>{menu.name}</span>
            </>
        );

        return (
            <AntMenu.SubMenu key={menu.key} title={subMenuTitle}>
                {generateMenu(menu.children)}
            </AntMenu.SubMenu>
        );
    }

    return (
        <AntMenu className={className} mode={mode} theme={theme}>
            {generateMenu(menuData)}
        </AntMenu>
    );
});
