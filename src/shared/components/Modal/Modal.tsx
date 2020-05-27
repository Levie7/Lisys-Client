import { Modal as AntModal } from 'antd';
import * as React from 'react';

interface ModalProps {
    children?: React.ReactNode;
    className?: string;
    footer?: React.ReactNode;
    style?: React.CSSProperties;
    title?: React.ReactNode;
    visible: boolean;
    width?: string | number;

    onCancel?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onOk?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const Modal = ({
    children,
    className,
    onCancel,
    onOk,
    footer,
    style = { top: 20 },
    title,
    visible,
    width,
}: ModalProps) => {
    return (
        <AntModal
            className={className}
            onCancel={onCancel}
            onOk={onOk}
            footer={footer}
            style={style}
            title={title}
            visible={visible}
            width={width}
        >
            {children}
        </AntModal>
    );
};
