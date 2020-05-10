import { Avatar, Dropdown, Menu } from 'antd';
import * as React from 'react';

import { exitSession } from 'src/core/graphql/auth';
import { useHistory } from 'src/core/route';

import { Icon } from 'src/shared/components/Icon';

require('./Header.sass');

export const Header = React.memo(() => {
    let { replace } = useHistory();

    function handleLogout() {
        exitSession();
        replace('/login');
    }

    const menu = (
        <Menu selectable={false}>
            <Menu.Item>
                <div className='rfq__widget__system-status__item'>
                    <strong>Hello, Administrator</strong>
                    <div>
                        <strong>Billing Plan:</strong> Professional
                        <br />
                    </div>

                    <div>
                        <strong>Role:</strong> Administrator
                    </div>
                </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <div className='rfq__widget__system-status__item'>
                    <strong>Email:</strong> email
                    <br />
                    <strong>Phone:</strong> +1-800-MEDIATEC
                </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <a href='/'>
                    <i className='topbar__dropdownMenuIcon icmn-user' /> Edit Profile
                </a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <div onClick={handleLogout}>
                    <i className='topbar__dropdownMenuIcon icmn-exit' /> Logout
                </div>
            </Menu.Item>
        </Menu>
    );

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
