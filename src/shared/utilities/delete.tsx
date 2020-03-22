import * as React from 'react';

import { Popconfirm } from 'src/shared/components/Popconfirm';
import { TableAction } from 'src/shared/components/Table';

interface DeleteProps {
    recordKey: any;

    confirm: (recordKey: string) => void;
}

export const Delete = React.memo<DeleteProps>(({ recordKey, confirm }) => {
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
            <TableAction iconType='delete' record={recordKey} title='Delete' />
        </Popconfirm>
    );
});
