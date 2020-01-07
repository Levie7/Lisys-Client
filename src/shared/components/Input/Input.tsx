import { Input as AntInput } from 'antd';
import * as React from 'react';

interface InputProps {
    placeholder?: string;
}

export class Input extends React.Component<InputProps> {
    render() {
        let { placeholder, ...props } = this.props;

        return <AntInput {...props} placeholder={placeholder} />;
    }
}
