import { Spin as AntSpin } from 'antd';
import * as React from 'react';

import { Icon } from 'src/shared/components/Icon';

require('./Spin.sass');

export interface SpinProps {
    spinning?: boolean;
}

export class Spin extends React.PureComponent<SpinProps> {
    render() {
        let { children, spinning } = this.props;

        let antIcon = <Icon className='spin_icon' spin type='loading' />;

        return (
            <AntSpin className='spin' indicator={antIcon} spinning={spinning} tip='Loading...'>
                {children}
            </AntSpin>
        );
    }
}
