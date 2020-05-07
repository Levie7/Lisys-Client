import { Input as AntInput } from 'antd';
import * as React from 'react';

interface SearchProps extends React.HTMLAttributes<any> {
    placeholder?: string;

    onSearch?: (value: any) => void;
}

export const Search = React.memo<SearchProps>(
    React.forwardRef(({ className, id, placeholder, onSearch, ...props }, ref?: any) => (
        <AntInput.Search
            {...props}
            className={className}
            id={id}
            placeholder={placeholder}
            onSearch={onSearch}
            ref={ref}
        />
    ))
);
