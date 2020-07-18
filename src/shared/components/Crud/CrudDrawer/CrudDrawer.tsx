import * as React from 'react';

import { Drawer } from 'src/shared/components/Drawer';
import { Capitalized } from 'src/shared/utilities/capitalized';

interface CrudDrawerProps {
    customContent?: React.ReactNode;
    data: any;
    loading: boolean;
    module: string;
    visible: boolean;
    title: string;

    handleClose: () => void;
}

function CrudDrawerPure({
    customContent,
    data,
    handleClose,
    loading,
    module,
    title,
    visible,
}: CrudDrawerProps) {
    function renderContent() {
        if (!data) return null;

        let dataKeys = Object.keys(data);

        return dataKeys
            .filter((key) => key !== '__typename')
            .map((key) => (
                <p key={key}>
                    <b>{Capitalized(key.replace('_', ' '))} : </b>
                    {typeof data[key] === 'object' ? data[key].name : data[key]}
                </p>
            ));
    }

    return (
        <Drawer
            loading={loading}
            onClose={handleClose}
            title={title}
            visible={visible}
            width={module !== 'Master' ? 1000 : undefined}
        >
            {module !== 'Master' ? customContent : renderContent()}
        </Drawer>
    );
}

export const CrudDrawer = React.memo(CrudDrawerPure);
