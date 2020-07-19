import * as React from 'react';

import { Popconfirm } from 'src/shared/components/Popconfirm';
import { TableAction } from 'src/shared/components/Table';

interface DeleteProps {
    recordKey: any;
    title: string;

    confirm: (recordKey: string) => void;
}

function DeletePure({ recordKey, title, confirm }: DeleteProps) {
    function handleConfirm(e: any) {
        confirm(recordKey);
    }

    return (
        <Popconfirm
            title='Are you sure delete this data?'
            onConfirm={handleConfirm}
            okText='Yes'
            cancelText='No'
        >
            <TableAction iconType='delete' record={recordKey} title={title} />
        </Popconfirm>
    );
}

export const Delete = React.memo(DeletePure);
