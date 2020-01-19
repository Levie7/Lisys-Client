import { Icon as AntIcon } from 'antd';
import * as React from 'react';

interface IconProps {
    className?: string;
    spin?: boolean;
    type: string;
}

export const Icon = React.memo<IconProps>(({ className, spin, type }) => (
    <AntIcon className={className} spin={spin} type={type} />
));
