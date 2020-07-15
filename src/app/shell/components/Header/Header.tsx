import { Avatar, Dropdown, Menu } from 'antd';
import * as React from 'react';

import { Icon } from 'src/shared/components/Icon';
import { queryForm } from 'src/shared/graphql';
import { getUserByUsername } from 'src/shared/graphql/User/schema.gql';

require('./Header.sass');

interface HeaderProps {
    auth: string | null;
    logout: () => void;
}

export const Header = React.memo<HeaderProps>(({ auth, logout }) => {
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
                        <strong>Role :</strong> {user.role.name}
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={handleLogout}>
                    <i className='topbar__dropdownMenuIcon icmn-exit' /> Logout
                </div>
            </Menu.Item>
        </Menu>
    );

    function handleLogout() {
        logout();
    }

    return (
        <div className='Header d-flex fj-between px-4'>
            <div>Left Header</div>
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
