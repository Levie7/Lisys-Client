import { Button as AntButton } from 'antd';
import * as React from 'react';

interface ButtonProps {
    type?: 'link' | 'default' | 'ghost' | 'primary' | 'dashed' | 'danger';
}

export class Button extends React.Component<ButtonProps> {
    render() {
        let { children, type } = this.props;

        return <AntButton type={type}>{children}</AntButton>;
    }
}
