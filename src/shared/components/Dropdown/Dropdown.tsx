import { Dropdown as AntDropdown } from 'antd';
import * as React from 'react';

interface DropdownProps {
    children: React.ReactElement;
    overlay: React.ReactElement;
}

export const Dropdown = React.memo<DropdownProps>(({ children, overlay }) => (
    <AntDropdown overlay={overlay}>{children}</AntDropdown>
));
