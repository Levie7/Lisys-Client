import { Menu as AntMenu } from 'antd';
import * as React from 'react';

import { Menu as MenuAPI, Permission } from 'src/core/api';

import { Icon } from 'src/shared/components/Icon';
import { Link } from 'src/shared/components/Link';
import { queryForm } from 'src/shared/graphql';
import { getMenus } from 'src/shared/graphql/Menu/schema.gql';
import { getAccessPermissionByRoleId } from 'src/shared/graphql/Permission/schema.gql';
import { getUserByUsername } from 'src/shared/graphql/User/schema.gql';

export type MenuTheme = 'dark' | 'light';

interface MenuProps {
    auth: string | null;
    className?: string;
    mode?: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';
    theme?: MenuTheme;
}

function MenuPure({ auth, className, mode, theme }: MenuProps) {
    let queryMenu = queryForm({ query: getMenus });
    let queryUser = queryForm({
        query: getUserByUsername,
        variables: { username: auth },
    });
    let queryPermission = queryForm({
        skip: !queryUser.data,
        query: getAccessPermissionByRoleId,
        variables: { role_id: queryUser.data?.getUserByUsername.role.id },
    });

    if (queryMenu.loading || queryUser.loading || queryPermission.loading) {
        return null;
    }

    let accessPermission = queryPermission.data?.getAccessPermissionByRoleId;

    function generateMenu(menuItems: any) {
        return menuItems
            .filter((menu: MenuAPI) =>
                accessPermission.find(
                    (permission: Permission) =>
                        permission.menu?.name === menu.name && permission.status === 'active'
                )
            )
            .map((menu: MenuAPI) =>
                menu.children?.length ? renderSubMenu(menu) : renderMenuItem(menu)
            );
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
            {generateMenu(queryMenu.data.getMenus)}
        </AntMenu>
    );
}

export const Menu = React.memo(MenuPure);
