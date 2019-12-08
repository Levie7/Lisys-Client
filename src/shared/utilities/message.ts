import { message as AntMessage } from 'antd';
import React from 'react';

export function Message(
    content: React.ReactNode | string,
    type: string,
    duration?: number | (() => void)
) {
    switch (type) {
        case 'error':
            return AntMessage.error(content, duration);
        case 'info':
            return AntMessage.info(content, duration);
        case 'loading':
            return AntMessage.loading(content, duration);
        case 'success':
            return AntMessage.success(content, duration);
        case 'warn':
            return AntMessage.warn(content, duration);
        case 'warning':
            return AntMessage.warning(content, duration);
        default:
            return null;
    }
}
