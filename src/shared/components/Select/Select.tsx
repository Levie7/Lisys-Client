import { Select as AntSelect } from 'antd';
import * as React from 'react';

interface SelectProps {
    allowClear?: boolean;
    className?: string;
    defaultValue?: string;
    placeholder?: React.ReactNode;
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
        let {
            allowClear,
            children,
            className,
            defaultValue,
            onChange,
            placeholder,
            showSearch,
            ...props
        } = this.props;

        return (
            <AntSelect
                {...props}
                allowClear={allowClear}
                className={className}
                defaultValue={defaultValue}
                filterOption={showSearch && this.handleFilter}
                onChange={onChange}
                placeholder={placeholder}
                showSearch={showSearch}
            >
                {children}
            </AntSelect>
        );
    }
}
Select.Option = AntSelect.Option;
