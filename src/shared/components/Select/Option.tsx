import { Select as AntSelect } from 'antd';
import * as React from 'react';

interface OptionProps {
    children?: React.ReactNode;
    disabled?: boolean;
    value: React.ReactText;
}

export const Option = React.memo<OptionProps>(({ children, disabled, value }) => (
    <AntSelect.Option disabled={disabled} value={value}>
        {children}
    </AntSelect.Option>
));
