import * as React from 'react';

import { Lang } from 'src/core/api';

import { CrudConnectedProps } from '../Crud';
import { CrudFormAction } from './CrudFormAction';

interface FormSectionProps extends CrudConnectedProps, Lang {
    children?: React.ReactNode;
}

export const CrudForm = React.memo<FormSectionProps>(({ children, ...props }) => (
    <>
        <CrudFormAction {...props} />
        {children}
    </>
));
