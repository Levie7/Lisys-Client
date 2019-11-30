import { Icon, Menu, Layout } from 'antd';
import * as React from 'react';

import { Picture } from 'src/shared/components/Picture';

import { logo } from './constants';

export class MenuLeft extends React.Component<{}> {
    render() {
        return (
            <Layout.Sider>
                <Picture
                    alt={logo.light.alt}
                    className='bg-primary d-flex fj-center'
                    height='46px'
                    src={logo.light.url}
                    title={logo.light.title}
                />
                <Menu mode='inline' theme='dark'>
                    <Menu.Item key='1'>
                        <Icon type='pie-chart' />
                        <span>Option 1</span>
                    </Menu.Item>
                    <Menu.Item key='2'>
                        <Icon type='desktop' />
                        <span>Option 2</span>
                    </Menu.Item>
                    <Menu.SubMenu
                        key='sub1'
                        title={
                            <span>
                                <Icon type='user' />
                                <span>User</span>
                            </span>
                        }
                    >
                        <Menu.Item key='3'>Tom</Menu.Item>
                        <Menu.Item key='4'>Bill</Menu.Item>
                        <Menu.Item key='5'>Alex</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu
                        key='sub2'
                        title={
                            <span>
                                <Icon type='team' />
                                <span>Team</span>
                            </span>
                        }
                    >
                        <Menu.Item key='6'>Team 1</Menu.Item>
                        <Menu.Item key='8'>Team 2</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item key='9'>
                        <Icon type='file' />
                        <span>File</span>
                    </Menu.Item>
                </Menu>
            </Layout.Sider>
        );
    }
}
