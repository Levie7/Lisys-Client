import { Icon as AntIcon } from 'antd';
import * as React from 'react';

interface IconProps {
    type: string;
}

export class Icon extends React.PureComponent<IconProps> {
    render() {
        let { type } = this.props;

        return <AntIcon type={type} />;
    }
}
