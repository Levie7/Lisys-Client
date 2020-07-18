import { Drawer as AntDrawer } from 'antd';
import * as React from 'react';

import { Spin } from '../Spin';

interface DrawerProps {
    children?: React.ReactNode;
    loading?: boolean;
    title: string;
    visible: boolean;
    width?: string | number;

    onClose?: () => void;
}

export const Drawer = React.memo<DrawerProps>(
    ({ children, loading, onClose, title, visible, width }) => {
        if (loading) return <Spin />;
        return (
            <>
                <AntDrawer
                    closable={false}
                    onClose={onClose}
                    placement='right'
                    title={title}
                    visible={visible}
                    width={width}
                >
                    {children}
                </AntDrawer>
            </>
        );
    }
);
