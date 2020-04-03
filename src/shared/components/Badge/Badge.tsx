import { Badge as AntBadge } from 'antd';
import * as React from 'react';

interface BadgeProps {
    status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
    text?: React.ReactNode;
}
export const Badge = React.memo<BadgeProps>(({ status, text }) => (
    <AntBadge status={status} text={text} />
));
