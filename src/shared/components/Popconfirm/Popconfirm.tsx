import { Popconfirm as AntPopconfirm } from 'antd';
import * as React from 'react';

interface PopconfirmProps {
    cancelText: string;
    children?: React.ReactNode;
    title: string;
    okText: string;

    onConfirm: (e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void;
    onCancel?: (e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void;
}

export const Popconfirm = React.memo<PopconfirmProps>(
    ({ cancelText, children, okText, title, onCancel, onConfirm }) => (
        <AntPopconfirm
            cancelText={cancelText}
            okText={okText}
            onCancel={onCancel}
            onConfirm={onConfirm}
            title={title}
        >
            {children}
        </AntPopconfirm>
    )
);
