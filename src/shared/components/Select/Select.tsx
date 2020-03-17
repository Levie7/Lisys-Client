import { Select as AntSelect } from 'antd';
import * as React from 'react';

interface SelectProps {
    defaultValue?: string;
    onChange?: (value: string, option: any) => void;
}

export class Select extends React.PureComponent<SelectProps> {
    static Option: import('rc-select/lib/Option').OptionFC;

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
