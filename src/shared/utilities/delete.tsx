import * as React from 'react';

import { Popconfirm } from 'src/shared/components/Popconfirm';
import { TableAction } from 'src/shared/components/Table';

interface DeleteProps {
    cancelText: string;
    recordKey: any;
    okText: string;
    popupTitle: string;
    title: string;

    confirm: (recordKey: string) => void;
}

function DeletePure({ cancelText, recordKey, okText, popupTitle, title, confirm }: DeleteProps) {
    function handleConfirm(e: any) {
        confirm(recordKey);
    }

    return (
        <Popconfirm
            title={popupTitle}
            onConfirm={handleConfirm}
            okText={okText}
            cancelText={cancelText}
        >
            <TableAction iconType='delete' record={recordKey} title={title} />
        </Popconfirm>
    );
}

export const Delete = React.memo(DeletePure);
