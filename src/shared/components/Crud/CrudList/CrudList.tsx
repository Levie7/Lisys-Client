import * as React from 'react';

import { Lang } from 'src/core/api';

import { CrudConnectedProps } from '../Crud';
import { CrudListAction } from './CrudListAction';

interface CrudListProps extends CrudConnectedProps, Lang {
    children?: React.ReactNode;
}

export const CrudList = React.memo<CrudListProps>(({ children, ...props }) => {
    return (
        <>
            <CrudListAction {...props} />
            {children}
        </>
    );
});
