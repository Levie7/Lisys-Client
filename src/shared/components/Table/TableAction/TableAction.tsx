import * as React from 'react';

import { Icon } from 'src/shared/components/Icon';
import { Tooltip } from 'src/shared/components/Tooltip';

interface TableActionProps {
    iconType: string;
    record: any;
    title: string;

    onClick?: (recordKey: string, record?: any) => void;
}

require('./TableAction.sass');

function TableActionPure({ iconType, record, title, onClick }: TableActionProps) {
    function handleClick() {
        onClick!(record.key, record);
    }

    return (
        <Tooltip placement='bottom' title={title}>
            <span
                id={'TableAction-' + iconType + '-' + record.key}
                className='TableAction mr-2'
                onClick={handleClick}
            >
                {Icon[iconType]}
            </span>
        </Tooltip>
    );
}

export const TableAction = React.memo(TableActionPure);
