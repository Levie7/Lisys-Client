import { Avatar, Dropdown, Menu } from 'antd';
import * as React from 'react';

import { Lang } from 'src/core/api';

import { Icon } from 'src/shared/components/Icon';
import { queryForm } from 'src/shared/graphql';
import { getUserByUsername } from 'src/shared/graphql/User/schema.gql';
import { headerAction, headerField } from './constants';
import { Switch } from 'src/shared/components/Switch';

import { MenuTheme } from '../MainMenu/Menu';

require('./Header.sass');

interface HeaderProps extends Lang {
    auth: string | null;
    theme?: MenuTheme;

    handleTheme: (value: boolean) => void;
    logout: () => void;
}

export const Header = React.memo<HeaderProps>(({ auth, handleTheme, lang, logout, theme }) => {
    let queryUser = queryForm({
        query: getUserByUsername,
        variables: { username: auth },
    });
    if (queryUser.loading) {
        return null;
    }

    let user = queryUser.data?.getUserByUsername;

    let menu = (
        <Menu selectable={false}>
            <Menu.Item>
                <div className='rfq__widget__system-status__item'>
                    <strong>Hello, {user.name}</strong>
                    <div>
                        <strong>{headerField.role[lang]} :</strong> {user.role.name}
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item>
                <div className='rfq__widget__system-status__item'>
                    <strong>{headerField.theme[lang]} : </strong>
                    <div>
                        <Switch
                            checkedChildren='Dark'
                            defaultChecked={theme === 'dark'}
                            handleChange={(value) => handleTheme(value)}
                            unCheckedChildren='Light'
                        />
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={handleLogout}>
                    <i className='topbar__dropdownMenuIcon icmn-exit' /> {headerAction.logout[lang]}
                </div>
            </Menu.Item>
        </Menu>
    );

    function handleLogout() {
        logout();
    }

    return (
        <div className='Header d-flex fj-between px-4'>
            <div />
            <div className='Header_Dropdown'>
                <Dropdown overlay={menu} trigger={['click']} placement='bottomRight'>
                    <a className='ant-dropdown-link' href='/'>
                        <Avatar
                            className='Header_Avatar'
                            shape='square'
                            size='large'
                            icon={Icon.user}
                        />
                    </a>
                </Dropdown>
            </div>
        </div>
    );
});
