import { Input as AntInput } from 'antd';
import * as React from 'react';

interface InputProps {
    id: string;
    placeholder?: string;
}

export class Input extends React.Component<InputProps> {
    render() {
        let { id, placeholder } = this.props;

        return <AntInput id={id} placeholder={placeholder} />;
    }
}
