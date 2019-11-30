import { Menu } from 'antd';
import * as React from 'react';

import { Picture } from 'src/shared/components/Picture';

import { logo } from './constants';

export class MenuTop extends React.Component<{}> {
    render() {
        return (
            <div className='d-flex'>
                <Picture
                    alt={logo.light.alt}
                    className='bg-primary px-4'
                    height='46px'
                    src={logo.light.url}
                    title={logo.light.title}
                />
                <div className='w-100'>
                    <Menu mode='horizontal' theme='dark'>
                        <Menu.Item key='1'>nav 1</Menu.Item>
                        <Menu.Item key='2'>nav 2</Menu.Item>
                        <Menu.Item key='3'>nav 3</Menu.Item>
                    </Menu>
                </div>
            </div>
        );
    }
}
