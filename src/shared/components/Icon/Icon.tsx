import { Icon as AntIcon } from 'antd';
import * as React from 'react';

interface IconProps {
    className?: string;
    type: string;
}

export class Icon extends React.PureComponent<IconProps> {
    render() {
        let { className, type } = this.props;

        return <AntIcon className={className} type={type} />;
    }
}
