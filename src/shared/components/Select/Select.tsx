import { Select as AntSelect } from 'antd';
import * as React from 'react';

import { OptionProps } from './Option';

interface SelectProps {
    defaultValue?: string;
    onChange?: (value: string, option: React.ReactElement<any> | React.ReactElement<any>[]) => void;
}

export class Select extends React.Component<SelectProps> {
    static Option: React.ClassicComponentClass<OptionProps>;

    render() {
        let { children, defaultValue, onChange, ...props } = this.props;

        return (
            <AntSelect {...props} defaultValue={defaultValue} onChange={onChange}>
                {children}
            </AntSelect>
        );
    }
}
Select.Option = AntSelect.Option;
