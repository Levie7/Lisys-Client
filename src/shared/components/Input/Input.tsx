import { Input as AntInput } from 'antd';
import * as React from 'react';

interface InputProps {
    className?: string;
    disabled?: boolean;
    placeholder?: string;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    type?: string;
    value?: string | number | string[];

    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = React.memo<InputProps>(
    React.forwardRef(
        (
            {
                className,
                disabled,
                onBlur,
                onChange,
                placeholder,
                prefix,
                suffix,
                type,
                value,
                ...props
            },
            ref?: string | ((instance: AntInput | null) => void) | React.RefObject<AntInput> | null
        ) => (
            <AntInput
                {...props}
                className={className}
                disabled={disabled}
                onBlur={onBlur}
                onChange={onChange}
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
