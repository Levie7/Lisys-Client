import * as React from 'react';

import { Picture } from 'src/shared/components/Picture';

import { logo } from './constants';
import { Menu } from './Menu';

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
                <Menu className='w-100' mode='horizontal' theme='dark' />
            </div>
        );
    }
}
