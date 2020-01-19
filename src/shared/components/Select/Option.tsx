import { Select as AntSelect } from 'antd';
import * as React from 'react';

export interface OptionProps {
    children?: React.ReactNode;
    disabled?: boolean;
    value?: string | number;
}

export const Option = React.memo<OptionProps>(({ children, disabled, value }) => (
    <AntSelect.Option disabled={disabled} value={value}>
        {children}
    </AntSelect.Option>
));
