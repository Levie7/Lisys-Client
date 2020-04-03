import { Button as AntButton } from 'antd';
import * as React from 'react';

export type ButtonType = 'link' | 'default' | 'ghost' | 'primary' | 'dashed' | 'danger';

interface ButtonProps {
    children?: React.ReactNode;
    className?: string;
    htmlType?: 'button' | 'reset' | 'submit';
    type?: ButtonType;

    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const Button = React.memo<ButtonProps>(
    React.forwardRef(
        (
            { children, className, htmlType, onClick, type, ...props },
            ref?:
                | string
                | ((instance: AntButton | null) => void)
                | React.RefObject<AntButton>
                | null
        ) => (
            <AntButton
                {...props}
                className={className}
                htmlType={htmlType}
                onClick={onClick}
                ref={ref}
                type={type}
            >
                {children}
            </AntButton>
        )
    )
);
