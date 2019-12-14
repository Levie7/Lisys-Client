import { Button as AntButton } from 'antd';
import * as React from 'react';

interface ButtonProps {
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    type?: 'link' | 'default' | 'ghost' | 'primary' | 'dashed' | 'danger';
}

export class Button extends React.Component<ButtonProps> {
    render() {
        let { children, className, onClick, type } = this.props;

        return (
            <AntButton className={className} onClick={onClick} type={type}>
                {children}
            </AntButton>
        );
    }
}
