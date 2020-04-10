import { Select as AntSelect } from 'antd';
import * as React from 'react';

interface SelectProps {
    defaultValue?: string;
    showSearch?: boolean;

    onChange?: (value: string, option: any) => void;
}

export class Select extends React.PureComponent<SelectProps> {
    static Option: import('rc-select/lib/Option').OptionFC;

    constructor(props: SelectProps) {
        super(props);

        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(input: any, option: any) {
        return option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }

    render() {
        let { children, defaultValue, onChange, showSearch, ...props } = this.props;

        return (
            <AntSelect
                {...props}
                defaultValue={defaultValue}
                filterOption={showSearch && this.handleFilter}
                onChange={onChange}
                showSearch={showSearch}
            >
                {children}
            </AntSelect>
        );
    }
}
Select.Option = AntSelect.Option;
