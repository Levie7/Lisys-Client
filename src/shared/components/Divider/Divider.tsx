import { Divider as AntDivider } from 'antd';
import * as React from 'react';

interface DividerProps {
    orientation?: 'center' | 'left' | 'right';
}

export class Divider extends React.PureComponent<DividerProps> {
    render() {
        let { children, orientation } = this.props;

        return <AntDivider orientation={orientation}>{children}</AntDivider>;
    }
}
