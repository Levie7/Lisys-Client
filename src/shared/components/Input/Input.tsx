import { Input as AntInput } from 'antd';
import * as React from 'react';

interface InputProps {
    placeholder?: string;
}

export const Input = React.memo<InputProps>(({ placeholder, ...props }) => (
    <AntInput {...props} placeholder={placeholder} />
));
