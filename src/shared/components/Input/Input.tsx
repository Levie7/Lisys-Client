import { Input as AntInput } from 'antd';
import * as React from 'react';

interface InputProps {
    autoFocus?: boolean;
    className?: string;
    disabled?: boolean;
    id?: string;
    placeholder?: string;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    type?: string;
    value?: string | number | string[];

    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = React.memo<InputProps & { ref?: any }>(
    React.forwardRef(
        (
            {
                autoFocus,
                className,
                disabled,
                id,
                onBlur,
                onChange,
                onPressEnter,
                placeholder,
                prefix,
                suffix,
                type,
                value,
                ...props
            },
            ref?: any
        ) => (
            <AntInput
                {...props}
                autoFocus
                className={className}
                disabled={disabled}
                id={id}
                onBlur={onBlur}
                onChange={onChange}
                onPressEnter={onPressEnter}
                placeholder={placeholder}
                prefix={prefix}
                ref={ref}
                suffix={suffix}
                type={type}
                value={value}
            />
        )
    )
);
