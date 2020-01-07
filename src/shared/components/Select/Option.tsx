import { Select as AntSelect } from 'antd';
import * as React from 'react';

export interface OptionProps {
    disabled?: boolean;
    value?: string | number;
}

export class Option extends React.Component<OptionProps> {
    render() {
        let { children, disabled, value } = this.props;

        return (
            <AntSelect.Option disabled={disabled} value={value}>
                {children}
            </AntSelect.Option>
        );
    }
}
