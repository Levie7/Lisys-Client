import * as React from 'react';

import { Icon } from 'src/shared/components/Icon';
import { Tooltip } from 'src/shared/components/Tooltip';

interface TableActionProps {
    iconType: string;
    record: any;
    title: string;

    onClick?: (recordKey: string) => void;
}

require('./TableAction.sass');

export const TableAction = React.memo<TableActionProps>(({ iconType, record, title, onClick }) => {
    function handleClick() {
        onClick!(record.key);
    }

    return (
        <Tooltip placement='bottom' title={title}>
            <span className='TableAction mr-2' onClick={handleClick}>
                {Icon[iconType]}
            </span>
        </Tooltip>
    );
});
