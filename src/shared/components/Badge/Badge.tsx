import { Badge as AntBadge } from 'antd';
import * as React from 'react';

export type Status = 'success' | 'processing' | 'default' | 'error' | 'warning';

interface BadgeProps {
    status?: Status;
    text?: React.ReactNode;
}

export const Badge = React.memo<BadgeProps>(({ status, text }) => (
    <AntBadge status={status} text={text} />
));
