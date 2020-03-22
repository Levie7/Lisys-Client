import { Button as AntButton } from 'antd';
import * as React from 'react';

interface ButtonProps {
    children?: React.ReactNode;
    className?: string;
    htmlType?: 'button' | 'reset' | 'submit';
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    type?: 'link' | 'default' | 'ghost' | 'primary' | 'dashed' | 'danger';
}

export const Button = React.memo<ButtonProps>(
    ({ children, className, htmlType, onClick, type }) => (
        <AntButton className={className} htmlType={htmlType} onClick={onClick} type={type}>
            {children}
        </AntButton>
    )
);
