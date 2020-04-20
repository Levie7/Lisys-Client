import * as React from 'react';

import { CrudConnectedProps } from '../Crud';
import { CrudFormAction } from './CrudFormAction';

interface FormSectionProps extends CrudConnectedProps {
    children?: React.ReactNode;
}

export const CrudForm = React.memo<FormSectionProps>(({ children, ...props }) => (
    <>
        <CrudFormAction {...props} />
        {children}
    </>
));
