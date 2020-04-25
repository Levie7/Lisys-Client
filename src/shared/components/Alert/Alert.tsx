import { Alert as AntAlert } from 'antd';
import * as React from 'react';

interface AlertProps {
    message: React.ReactNode;
    showIcon?: boolean;
    type?: 'success' | 'info' | 'warning' | 'error';
}

export const Alert = React.memo<AlertProps>(({ message, showIcon, type }) => (
    <AntAlert message={message} type={type} showIcon={showIcon} />
));
