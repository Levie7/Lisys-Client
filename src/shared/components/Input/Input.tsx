import { Input as AntInput } from 'antd';
import * as React from 'react';

interface InputProps extends React.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
    placeholder?: string;
    type?: string;

    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = React.memo<InputProps>(
    React.forwardRef(
        (
            { className, disabled, onBlur, onChange, placeholder, type, ...props },
            ref?: string | ((instance: AntInput | null) => void) | React.RefObject<AntInput> | null
        ) => (
            <AntInput
                {...props}
                className={className}
                disabled={disabled}
                onBlur={onBlur}
                onChange={onChange}
                placeholder={placeholder}
                ref={ref}
                type={type}
            />
        )
    )
);
