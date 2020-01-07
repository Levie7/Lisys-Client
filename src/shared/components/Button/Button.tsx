import { Button as AntButton } from 'antd';
import * as React from 'react';

interface ButtonProps {
    className?: string;
    htmlType?: 'button' | 'reset' | 'submit';
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    type?: 'link' | 'default' | 'ghost' | 'primary' | 'dashed' | 'danger';
}

export class Button extends React.Component<ButtonProps> {
    render() {
        let { children, className, htmlType, onClick, type } = this.props;

        return (
            <AntButton className={className} htmlType={htmlType} onClick={onClick} type={type}>
                {children}
            </AntButton>
        );
    }
}
