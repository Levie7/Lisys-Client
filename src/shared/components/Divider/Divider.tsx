import { Divider as AntDivider } from 'antd';
import * as React from 'react';

interface DividerProps {
    children?: React.ReactNode;
    orientation?: 'center' | 'left' | 'right';
}

export const Divider = React.memo<DividerProps>(({ children, orientation }) => (
    <AntDivider orientation={orientation}>{children}</AntDivider>
));
