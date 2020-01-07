import { Icon as AntIcon } from 'antd';
import * as React from 'react';

interface IconProps {
    className?: string;
    spin?: boolean;
    type: string;
}

export class Icon extends React.PureComponent<IconProps> {
    render() {
        let { className, spin, type } = this.props;

        return <AntIcon className={className} spin={spin} type={type} />;
    }
}
