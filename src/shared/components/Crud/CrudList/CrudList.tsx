import * as React from 'react';

import { CrudConnectedProps } from '../Crud';
import { CrudListAction } from './CrudListAction';

interface CrudListProps extends CrudConnectedProps {
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
