import { Tooltip as AntTooltip } from 'antd';
import * as React from 'react';

interface TooltipProps {
    children?: React.ReactNode;
    placement?:
        | 'top'
        | 'left'
        | 'right'
        | 'bottom'
        | 'topLeft'
        | 'topRight'
        | 'bottomLeft'
        | 'bottomRight'
        | 'leftTop'
        | 'leftBottom'
        | 'rightTop'
        | 'rightBottom';
    title: string;
}

export const Tooltip = React.memo<TooltipProps>(
    React.forwardRef(({ children, placement, title }, ref: any) => (
        <AntTooltip placement={placement} ref={ref} title={title}>
            {children}
        </AntTooltip>
    ))
);
