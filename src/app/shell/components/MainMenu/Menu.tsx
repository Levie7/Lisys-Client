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

export class Menu extends React.Component<MenuProps> {
    private generateMenu(menuItems: any) {
        return menuItems
            .filter((menu: MenuAPI) => menu.status === 'Active')
            .map((menu: MenuAPI) =>
                menu.children ? this.renderSubMenu(menu) : this.renderMenuItem(menu)
            );
    }

    renderMenuItem(menu: MenuAPI) {
        return (
            <AntMenu.Item key={menu.key}>
                <Link to={menu.url}>
                    <Icon type={menu.icon} />
                    <span>{menu.name}</span>
                </Link>
            </AntMenu.Item>
        );
    }

    renderSubMenu(menu: MenuAPI) {
        let subMenuTitle = (
            <>
                <Icon type={menu.icon} />
                <span>{menu.name}</span>
            </>
        );

        return (
            <AntMenu.SubMenu key={menu.key} title={subMenuTitle}>
                {this.generateMenu(menu.children)}
            </AntMenu.SubMenu>
        );
    }

    render() {
        let { className, mode, theme } = this.props;

        return (
            <AntMenu className={className} mode={mode} theme={theme}>
                {this.generateMenu(menuData)}
            </AntMenu>
        );
    }
}
